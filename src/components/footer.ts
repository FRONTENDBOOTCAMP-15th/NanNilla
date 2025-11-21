class FooterComponent extends HTMLElement {
  // 웹 컴포넌트가 DOM 연결될 때 호출되는 메서드
  // 컴포넌트 렌더링과 이벤트 초기화 수행
  connectedCallback(){
    this.render();
    this.initFooterMenu();
  }
  // UI 렌더링
  render() {
    this.innerHTML =`
    <footer class="p-6 main-footer text-sm">
          <div class="footer-content flex flex-col w-full">
            <div class="footer-links pb-3 flex flex-col w-full nikeDesktop:flex-row">
              <div class="footer-col font-medium w-full">
                <hr class="border border-nike-gray-lightest">
                <button class="footer-toggle flex justify-between items-center w-full cursor-pointer">
                  <h4 class="footer-title text-nike-black h-16 py-5">안내</h4>
                  <img src="../../assets/icon24px/icon-up.svg" class="pb-1 toggle-icon nikeDesktop:hidden"/>
                </button>
                <ul class="text-nike-gray-dark pb-3">
                  <li class="py-2"><a href="#">멤버가입</a></li>
                  <li class="py-2"><a href="#">매장찾기</a></li>
                  <li class="py-2"><a href="#">나이키 저널</a></li>
                </ul>
              </div>
              <div class="footer-col font-medium w-full">
                <hr class="border border-nike-gray-lightest">
                <button class="footer-toggle flex justify-between items-center w-full cursor-pointer">
                  <h4 class="footer-title text-nike-black h-16 py-5">고객센터</h4>
                  <img src="../../assets/icon24px/icon-up.svg" class="pb-1 toggle-icon nikeDesktop:hidden"/>
                </button>
                <ul class="text-nike-gray-dark pb-3">
                  <li class="py-2"><a href="#">주문배송조회</a></li>
                  <li class="py-2"><a href="#">반품 정책</a></li>
                  <li class="py-2"><a href="#">결제 방법</a></li>
                  <li class="py-2"><a href="#">공지사항</a></li>
                  <li class="py-2"><a href="#">문의하기</a></li>
                </ul>
              </div>
              <div class="footer-col font-medium w-full">
                <hr class="border border-nike-gray-lightest">
                <button class="footer-toggle flex justify-between items-center w-full cursor-pointer">
                  <h4 class="footer-title text-nike-black h-16 py-5">회사소개</h4>
                  <img src="../../assets/icon24px/icon-up.svg" class="pb-1 toggle-icon nikeDesktop:hidden"/>
                </button>
                <ul class="text-nike-gray-dark">
                  <li class="py-2"><a href="#">About Nike</a></li>
                  <li class="py-2"><a href="#">소식</a></li>
                  <li class="py-2"><a href="#">채용</a></li>
                  <li class="py-2"><a href="#">투자자</a></li>
                  <li class="py-2"><a href="#">지속가능성</a></li>
                </ul>
              </div>
            </div>
            <div class="policies font-medium">
              <hr class="border border-nike-gray-lightest">
              <ul class="text-nike-gray-dark py-14 flex flex-col nikeDesktop:flex-row nikeDesktop:gap-5">
                <li class="py-2">&copy; 2025 Nike, Inc. All Rights Reserved</li>
                <li class="py-2"><a href="#">이용약관 </a></li>
                <li class="py-2"><a href="#">개인정보처리방침 </a></li>
                <li class="py-2"><a href="#">위치정보이용약관 </a></li>
                <li class="py-2"><a href="#">영상정보처리기기 운영 방침 </a></li>
              </ul>
            </div>
            <div>
              <div class="footer-bottom text-nike-gray-dark">
                <hr class="border border-nike-gray-lightest">
                <div class="pt-9 leading-6">
                  <p>(유)나이키코리아 대표 Kimberlee Lynn Chang Mendes, 킴벌리 린 창 멘데스 | 서울 강남구 테헤란로 152 강남파이낸스센터 30층 | 통신판매업신고번호 2011-서울강남-03461 | 등록번호 220-88-09068</p>
                  <p><a href="#" class="underline">사업자 정보 확인</a></p>
                  <p>고객센터 전화 문의 <a href="#" class="underline">080-022-0182</a> FAX 02-6744-5880 | 이메일 <a href="#" class="underline">service@nike.co.kr</a> |</p>
                  <p>호스팅서비스사업자 (유)나이키코리아</p>
                </div>
              </div>
            </div>
          </div>
    </footer>
    `;
  }

  // 푸터 메뉴 열고 닫기
  initFooterMenu() {
    const toggles = this.querySelectorAll(".footer-toggle");

    toggles.forEach(toggle => {
      const menu = toggle.nextElementSibling as HTMLElement;
      const icon = toggle.querySelector(".toggle-icon") as HTMLImageElement;

      // 처음에는 모바일에서 접힌 상태로 설정
      menu.style.maxHeight = "0";
      menu.style.overflow = "hidden";
      menu.style.transition = "max-height 0.3s ease";

      toggle.addEventListener("click", () => {
        const isOpen = menu.style.maxHeight && menu.style.maxHeight !== "0px";

        if (isOpen) {
          // 닫기
          menu.style.maxHeight = "0";
          icon.src = "../../assets/icon24px/icon-down.svg";
        } else {
          // 열기
          menu.style.maxHeight = menu.scrollHeight + "px";
          icon.src = "../../assets/icon24px/icon-up.svg";
        }
      });
    });
  }
}

// FooterComponent 를 <nike-footer> 태그로 정의
customElements.define('nike-footer', FooterComponent);