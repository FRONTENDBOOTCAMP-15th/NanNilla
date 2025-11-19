class HeaderComponent extends HTMLElement {
  // 웹 컴포넌트가 DOM 연결될 때 호출되는 메서드
  // 컴포넌트 렌더링과 이벤트 초기화 수행
  connectedCallback() {
    this.render();
    this.initAuthUI();
    this.initMegaMenu();
  }
  // UI 렌더링
  render() {
    this.innerHTML = `
    <div class="relative">
      <input type="checkbox" id="menu-toggle" class="peer hidden">

      <!-- 헤더 -->
      <header class="flex w-full h-15 px-6 justify-between items-center bg-nike-white">
        <button><a href="/index.html"><img src="/assets/logo.svg"></a></button>
        <div class="flex flex-row">
          <button class="px-3 hidden nikeDesktop:block"><a href="/src/pages/itemlist?extra.isNew=true">New & Featured</a></button>
          <button id="menu-men"
            class="px-3 hidden nikeDesktop:block">
            <span>Men</span>
          </button>
          <button class="px-3 hidden nikeDesktop:block"><a href="/src/pages/itemlist?extra.gender=women">Women</a></button>
          <button class="px-3 hidden nikeDesktop:block"><a href="/src/pages/itemlist?extra.gender=kids">Kids</a></button>
          <button class="px-3 hidden nikeDesktop:block"><a href="/src/pages/itemlist?extra.isNew=true">Sale</a></button>
        </div>
        <div class="flex">
          <button><img src="/assets/icon36px/icon-search.svg"></button>
          <button><img src="/assets/icon36px/icon-profile.svg"></button>
          <button><a href="/src/pages/cart"><img src="/assets/icon36px/icon-cart-in.svg"></a></button>

          <label for="menu-toggle" class="w-9 h-9 bg-[url(/assets/icon36px/icon-menu.svg)] cursor-pointer"></label>
        </div>
      </header>

      <!-- 서브 메뉴 -->
      <div id="mega-menu-men" class="fixed left-0 top-15 w-screen h-[500px] bg-white shadow-lg border-t border-gray-300 opacity-0 invisible translate-y-2 transition-all duration-300 z-30">
        <div class="flex p-15 gap-65">
              <!-- 2) 신발 -->
              <div class="flex flex-col gap-3">
                <a href="/src/pages/itemlist?extra.category.1=PC0102" class="font-semibold text-base mb-2">신발</a>
                <a href="/src/pages/itemlist?extra.category.2=PC010201" class="hover:underline text-sm">라이프스타일</a>
                <a href="/src/pages/itemlist?extra.category.2=PC010202" class="hover:underline text-sm">조던</a>
                <a href="/src/pages/itemlist?extra.category.2=PC010203" class="hover:underline text-sm">러닝</a>
                <a href="/src/pages/itemlist?extra.category.2=PC010204" class="hover:underline text-sm">농구</a>
                <a href="/src/pages/itemlist?extra.category.2=PC010205" class="hover:underline text-sm">미식축구</a>
                <a href="/src/pages/itemlist?extra.category.2=PC010206" class="hover:underline text-sm">축구</a>
                <a href="/src/pages/itemlist?extra.category.2=PC010207" class="hover:underline text-sm">트레이닝 & 짐</a>
                <a href="/src/pages/itemlist?extra.category.2=PC010208" class="hover:underline text-sm">스케이트보딩</a>
                <a href="/src/pages/itemlist?extra.category.2=PC010209" class="hover:underline text-sm">골프</a>
                <a href="/src/pages/itemlist?extra.category.2=PC0102010" class="hover:underline text-sm">테니스</a>
                <a href="/src/pages/itemlist?extra.category.2=PC0102011" class="hover:underline text-sm">샌들 & 슬리퍼</a>
              </div>

              <!-- 3) 의류 -->
              <div class="flex flex-col gap-3">
                <a href="/src/pages/itemlist?extra.category.1=PC0103" class="font-semibold text-base mb-2">의류</a>
                <a href="/src/pages/itemlist?extra.category.2=PC010301" class="hover:underline text-sm">탑 & 티셔츠</a>
                <a href="/src/pages/itemlist?extra.category.2=PC010302" class="hover:underline text-sm">후디 & 크루</a>
                <a href="/src/pages/itemlist?extra.category.2=PC010303" class="hover:underline text-sm">재킷 & 베스트</a>
                <a href="/src/pages/itemlist?extra.category.2=PC010304" class="hover:underline text-sm">팬츠 & 타이츠</a>
                <a href="/src/pages/itemlist?extra.category.2=PC010305" class="hover:underline text-sm">트랙수트</a>
                <a href="/src/pages/itemlist?extra.category.2=PC010306" class="hover:underline text-sm">쇼츠</a>
                <a href="/src/pages/itemlist?extra.category.2=PC010307" class="hover:underline text-sm">점프수트 & 롬퍼스</a>
                <a href="/src/pages/itemlist?extra.category.2=PC010308" class="hover:underline text-sm">서핑 & 수영복</a>
                <a href="/src/pages/itemlist?extra.category.2=PC010309" class="hover:underline text-sm">양말</a>
              </div>

              <!-- 4) 용품 -->
              <div class="flex flex-col gap-3">
                <a href="/src/pages/itemlist?extra.category.1=PC0101" class="font-semibold text-base mb-2">용품</a>
                <a href="/src/pages/itemlist?extra.category.2=PC010101" class="hover:underline text-sm">가방</a>
                <a href="/src/pages/itemlist?extra.category.2=PC010102" class="hover:underline text-sm">모자 & 헤드밴드</a>
                <a href="/src/pages/itemlist?extra.category.2=PC010103" class="hover:underline text-sm">장갑</a>
                <a href="/src/pages/itemlist?extra.category.2=PC010104" class="hover:underline text-sm">슬리브 & 암 밴드</a>
                <a href="/src/pages/itemlist?extra.category.2=PC010105" class="hover:underline text-sm">공</a>
                <a href="/src/pages/itemlist?extra.category.2=PC010106" class="hover:underline text-sm">보호대</a>
              </div>
        </div>
              
      </div>

      <!-- 사이드바 -->
      <section class="sidebar fixed top-0 right-[-86%] w-77.5 h-full bg-nike-white transition-all duration-300 z-20 peer-checked:right-0 ">
          <div class="flex flex-col gap-9.5">
            <input type="checkbox" id="menu" class="peer hidden"><label for="menu-toggle" class="w-9 h-9 absolute right-2 top-2  p-1 z-30 box-border bg-[url(/assets/icon36px/icon-close.svg)] cursor-pointer"></label>
          <div class="flex gap-5 pl-8.5 pt-19">
            <button id="signup-btn" class="w-22.5 h-10 rounded-full bg-nike-black text-nike-white text-base"><a href="src/pages/signin.html">가입하기</a></button>
            <button id="login-btn" class="w-19.5 h-10 rounded-full bg-nike-white text-nike-black border border-nike-gray-light text-base"><a href="src/pages/signin.html">로그인</a></button>
            <button id="logout-btn" class="w-22.5 h-10 rounded-full bg-nike-black text-nike-white text-base hidden">로그아웃</button>
          </div>
          <div class="flex flex-col pl-8.5 gap-6">
            <button class="flex items-center justify-between text-2xl leading-7 font-medium" data-new-only="true"><span><a href="/src/pages/itemlist?extra.isNew=true">New & Featured</a></span><img src="/assets/icon36px/icon-next.svg"></button>
            <button class="flex items-center justify-between text-2xl leading-7 font-medium"><span><a href="/src/pages/itemlist?extra.gender=men">Men</a></span><img src="/assets/icon36px/icon-next.svg"></button>
            <button class="flex items-center justify-between text-2xl leading-7 font-medium"><span><a href="/src/pages/itemlist?extra.gender=women">Women</a></span><img src="/assets/icon36px/icon-next.svg"></button>
            <button class="flex items-center justify-between text-2xl leading-7 font-medium"><span><a href="/src/pages/itemlist?extra.gender=kids">Kids</a></span><img src="/assets/icon36px/icon-next.svg"></button>
            <button class="flex items-center justify-between text-2xl leading-7 font-medium"><span><a href="/src/pages/itemlist?extra.isNew=true">Sale</a></span><img src="/assets/icon36px/icon-next.svg"></button>
          </div>
          <div class="flex flex-col w-32.6 pl-8.5">
            <button class="flex items-center gap-3 text-base font-medium py-2"><img src="/assets/icon24px/icon-cs.svg" alt=""><span>고객센터</span></button>
            <button class="flex items-center gap-3 text-base font-medium py-2"><img src="/assets/icon24px/icon-cart.svg" alt=""><a href="/src/pages/cart">장바구니</a></button>
            <button class="flex items-center gap-3 text-base font-medium py-2"><img src="/assets/icon24px/icon-order.svg" alt=""><span>주문</span></button>
            <button class="flex items-center gap-3 text-base font-medium py-2"><img src="/assets/icon24px/icon-store.svg" alt=""><span>매장 찾기</span></button>
          </div>
      </section>

      <!-- 사이드바 백드랍 -->
      <label for="menu-toggle"
        class="fixed inset-0 bg-nike-black-35 opacity-0 pointer-events-none transition-opacity duration-300
              peer-checked:opacity-100 peer-checked:pointer-events-auto">
      </label>
    </div>
    `;
  }
  private initAuthUI() {
    // 토큰 존재하면 로그인 상태
    const accessToken = localStorage.getItem('accessToken');
    const isLoggedIn = !!accessToken;

    const signupBtn = this.querySelector('#signup-btn') as HTMLButtonElement;
    const loginBtn = this.querySelector('#login-btn') as HTMLButtonElement;
    const logoutBtn = this.querySelector('#logout-btn') as HTMLButtonElement;

    if (!signupBtn || !loginBtn || !logoutBtn) return;

    if (isLoggedIn) {
      // 로그인 상태: 로그아웃 버튼만 보임
      signupBtn.classList.add('hidden');
      loginBtn.classList.add('hidden');
      logoutBtn.classList.remove('hidden');
    } else {
      // 비로그인 상태: 가입/로그인 버튼만 보임
      signupBtn.classList.remove('hidden');
      loginBtn.classList.remove('hidden');
      logoutBtn.classList.add('hidden');
    }

    // 로그아웃 클릭 시
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/index.html';
    });
  }

  private initMegaMenu() {
    const menBtn = this.querySelector('#menu-men') as HTMLElement;
    const megaMenu = this.querySelector('#mega-menu-men') as HTMLElement;

    if (!menBtn || !megaMenu) return;

    // 버튼 hover → 메뉴 열기
    menBtn.addEventListener('mouseenter', () => {
      megaMenu.classList.remove('opacity-0', 'invisible', 'translate-y-2');
    });

    // 버튼에서 나갔는데 메뉴에 안 들어가면 닫기
    menBtn.addEventListener('mouseleave', () => {
      setTimeout(() => {
        if (!megaMenu.matches(':hover')) {
          megaMenu.classList.add('opacity-0', 'invisible', 'translate-y-2');
        }
      }, 80);
    });

    // 메뉴에서 마우스 떠나면 닫기
    megaMenu.addEventListener('mouseleave', () => {
      megaMenu.classList.add('opacity-0', 'invisible', 'translate-y-2');
    });
  }
}

// HeaderComponent 를 <nike-header> 태그로 정의
customElements.define('nike-header', HeaderComponent);
