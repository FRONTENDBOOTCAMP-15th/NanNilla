import type { AxiosError } from 'axios';
import { getAxios } from '../utils/axios';

const pages = document.getElementById('pages') as HTMLElement;
const continueBtn = document.getElementById('continue-btn') as HTMLButtonElement;
const backBtn = document.getElementById('back-btn') as HTMLButtonElement;
const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
const userEmail = document.getElementById('user-email') as HTMLElement;
const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;
const togglePw = document.getElementById('toggle-pw') as HTMLImageElement;
const loginBtn = document.getElementById('login-btn') as HTMLButtonElement;

// 이메일 입력 후 계속 버튼 클릭 시
continueBtn.addEventListener('click', async () => {
  if (!emailInput.checkValidity()) {
    emailInput.reportValidity();
    return;
  }

  const email = emailInput.value.trim();

  // axios instance 가져오기
  const axiosInstance = getAxios();

  try {
    // 이메일 존재 여부 확인 API 요청
    const res = await axiosInstance.get('/users/email', {
      params: { email },
      headers: {
        'client-id': import.meta.env.VITE_CLIENT_ID
      },
      validateStatus: (status) => status === 200 || status === 409
    });
    // 로그인
    if (res.status === 409) {
      userEmail.textContent = email;
      pages.style.transform = "translateX(-50%)";
      return;
    }
    // 회원가입
    if (res.status === 200) {
      localStorage.setItem("signupEmail", emailInput.value.trim());
      window.location.href = "/src/pages/signup.html";
      return;
    }

  } catch (err) {
    console.log(err);
    alert("이메일 확인 중 오류가 발생했습니다.");
  }
});

// 이메일 입력 페이지로 이동
backBtn.addEventListener('click', () => {
  pages.style.transform = 'translateX(0)';
});

// 비밀번호 보이기/숨기기
togglePw.addEventListener('click', () => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    togglePw.src = '../../assets/icon-etc/icon-on.svg';
  } else {
    passwordInput.type = 'password';
    togglePw.src = '../../assets/icon-etc/icon-off.svg';
  }
});

// 로그인
loginBtn.addEventListener ('click', async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const axios = getAxios();
  try {
    const login = await axios.post('/users/login', {
      email,
      password,
    },
    {
    headers: {
      'client-id': import.meta.env.VITE_CLIENT_ID
    }
  }
);
    const data = login.data;
    console.log('로그인 성공: ', data);
    localStorage.setItem('accessToken', data.item.token.accessToken);
    localStorage.setItem('refreshToken', data.item.token.refreshToken);
    window.location.href = '/index.html';
  } catch (err) {
    const axiosError = err as AxiosError<{ message?: string }>;
    if (axiosError.response) {
      alert(axiosError.response.data.message || '로그인 실패');
    } else {
      alert('서버와 연결할 수 없습니다.');
    }
  }
});