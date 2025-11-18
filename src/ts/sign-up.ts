import { getAxios } from '../utils/axios';

const ruleLengthIcon = document.getElementById("rule-length-icon") as HTMLImageElement;
const ruleLengthText = document.getElementById("rule-length-text") as HTMLElement;
const ruleComboIcon = document.getElementById("rule-combo-icon") as HTMLImageElement;
const ruleComboText = document.getElementById("rule-combo-text") as HTMLElement;
const toggleAgree = document.getElementById('check') as HTMLImageElement;
const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;
const togglePw = document.getElementById('toggle-pw') as HTMLImageElement;
const pages = document.getElementById("pages") as HTMLElement;
const allCheck = document.getElementById("all-check") as HTMLImageElement;
const terms = Array.from(document.querySelectorAll(".term")) as HTMLImageElement[];
const continueBtn = document.getElementById("continue-btn") as HTMLButtonElement;
const cancelBtn = document.getElementById("cancel-btn") as HTMLButtonElement;
// const userTypeInput = document.querySelector(".userTypeInput") as HTMLInputElement;
const userEmailInput = localStorage.getItem("signupEmail") as string;
const userPasswordInput = document.querySelector(".userPasswordInput") as HTMLInputElement;
const firstNameInput = document.querySelector(".firstName") as HTMLInputElement;
const lastNameInput = document.querySelector(".lastName") as HTMLInputElement;
const signUpButton = document.querySelector(".signUpButton") as HTMLInputElement;
const ICON_YES = "../../assets/icon-etc/icon-yes.svg";
const ICON_NO = "../../assets/icon-etc/icon-no.svg";
const CHECKBOX_ON = "../../assets/icon-etc/checkbox-on.svg";
const CHECKBOX_OFF= "../../assets/icon-etc/checkbox-off.svg";

passwordInput.addEventListener("input", () => {
  const value = passwordInput.value;

  // 1) 길이 8자 이상
  const isLengthValid = value.length >= 8;

  ruleLengthIcon.src = isLengthValid ? '../../assets/icon-etc/icon-yes.svg' : '../../assets/icon-etc/icon-no.svg';
  ruleLengthText.classList.toggle("text-nike-green", isLengthValid);
  ruleLengthText.classList.toggle("text-nike-gray-dark", !isLengthValid);

  // 2) 대문자 + 소문자 + 숫자 포함
  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const isComboValid = hasUpper && hasLower && hasNumber;

  ruleComboIcon.src = isComboValid ? ICON_YES : ICON_NO;
  ruleComboText.classList.toggle("text-nike-green", isComboValid);
  ruleComboText.classList.toggle("text-nike-gray-dark", !isComboValid);

});

// 입력한 비밀번호 보이기/숨기기
togglePw.addEventListener('click', () => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    togglePw.src = '../../assets/icon-etc/icon-on.svg';
  } else {
    passwordInput.type = 'password';
    togglePw.src = '../../assets/icon-etc/icon-off.svg';
  }
});
// 체크 박스
toggleAgree.addEventListener('click', () => {
  const check = toggleAgree.src.includes("checkbox-on.svg");

  toggleAgree.src = check ? CHECKBOX_OFF : CHECKBOX_ON;
})
// 약관 동의 페이지로 이동
continueBtn.addEventListener("click", () => {
  // 회원정보 로직 완료 후 이동
  pages.style.transform = "translateX(-50%)";
});

// 정보 입력 페이지로 이동 
cancelBtn.addEventListener("click", () => {
  pages.style.transform = "translateX(0)";
});

// 약관 동의 전체 항목 체크박스, 체크 완료 시 개별 동의 체크 박스 전체 자동으로 체크
allCheck.addEventListener('click', () => {
  const check = allCheck.src.includes("checkbox-on.svg");
  allCheck.src = check ? CHECKBOX_OFF : CHECKBOX_ON;
  terms.forEach(term => {
    term.src = term.src = check ? CHECKBOX_OFF : CHECKBOX_ON;
  });
})
// 약관 동의 개별 항목 체크박스, 전체 체크 완료 시 전체 동의 체크박스 자동으로 체크
terms.forEach(term => {
  term.addEventListener("click", () => {
    const check = term.src.includes("checkbox-on");
    term.src = check ? CHECKBOX_OFF : CHECKBOX_ON;
    const fullCheck = terms.every(term => term.src.includes("checkbox-on"))
    allCheck.src = fullCheck ? CHECKBOX_ON : CHECKBOX_OFF;
  });
})


const axiosInstance = getAxios();
signUpButton?.addEventListener("click", () => signUp());
// 회원가입
async function signUp() {
  try {
    const type = "user";
    const email = userEmailInput;
    const password = userPasswordInput.value.trim();
    const name = `${lastNameInput.value}${firstNameInput.value}`;

    const data = await axiosInstance.post("/users/", { type, email, password, name },
      {
        headers: {
        "client-id": import.meta.env.VITE_CLIENT_ID
      }
    }
  );

    console.log(data);
    localStorage.removeItem("signupEmail");
    window.location.href = "/index.html";
  } catch (err) {
    console.log(err);
  }
}