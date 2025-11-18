class HeaderComponent extends HTMLElement {
  // 웹 컴포넌트가 DOM 연결될 때 호출되는 메서드
  // 컴포넌트 렌더링과 이벤트 초기화 수행
  connectedCallback() {
    this.render();
    this.initAuthUI();
  }
  // UI 렌더링
  render() {
    this.innerHTML = `
    <header class="flex w-full h-15 px-6 justify-between items-center bg-nike-white">
      <button class="box-border"><a href="/index.html"> <img src="/assets/logo.svg" alt="나이키 홈"></a>
      </button>
      <div class="flex flex-row">
        <button class="px-3 items-center justify-between text-2xl leading-7 font-medium hidden nikeDesktop:block"><span><a href="/src/pages/itemlist?extra.isNew=true">New & Featured</a></span></button>
        <button class="px-3 items-center justify-between text-2xl leading-7 font-medium hidden nikeDesktop:block"><span><a href="/src/pages/itemlist?extra.gender=men">Men</a></span></button>
        <button class="px-3 items-center justify-between text-2xl leading-7 font-medium hidden nikeDesktop:block"><span><a href="/src/pages/itemlist?extra.gender=women">Women</a></span></button>
        <button class="px-3 items-center justify-between text-2xl leading-7 font-medium hidden nikeDesktop:block"><span><a href="/src/pages/itemlist?extra.gender=kids">Kids</a></span></button>
        <button class="px-3 items-center justify-between text-2xl leading-7 font-medium hidden nikeDesktop:block"><span><a href="/src/pages/itemlist?extra.isNew=true">Sale</a></span></button>
      </div>
      <div class="flex">
        <button><a href=""></a><img src="/assets/icon36px/icon-search.svg" alt=""></button>
        <button><a href=""></a><img src="/assets/icon36px/icon-profile.svg" alt=""></button>
        <button><a href="/src/pages/cart"><img src="/assets/icon36px/icon-cart-in.svg" alt=""></a></button>
        <input type="checkbox" id="menu" class="peer hidden"><label for="menu" class="w-9 h-9 bg-[url(/assets/icon36px/icon-menu.svg)] cursor-pointer"></label>
      </div>
    </header>
    <section class="sidebar block w-77.5 h-full p-2 bg-nike-white top-0 right-[-86.11%] peer-checked:right-0 z-20 fixed transition-all duration-350 [header:has(#menu:checked)+&]:right-0">
      <div class="flex flex-col gap-9.5">
        <input type="checkbox" id="menu" class="peer hidden"><label for="menu" class="w-9 h-9 absolute right-2 p-1 z-30 box-border bg-[url(/assets/icon36px/icon-close.svg)] cursor-pointer"></label>
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
    <label for="menu" class="fixed inset-0 bg-nike-black-35 opacity-0 pointer-events-none z-10 transition-opacity duration-300 [header:has(#menu:checked)~&]:opacity-100 [header:has(#menu:checked)~&]:pointer-events-auto" aria-label="배경 오버레이"></label>
    `;
  }
  private initAuthUI() {
    // 토큰 존재하면 로그인 상태
    const accessToken = localStorage.getItem("accessToken");
    const isLoggedIn = !!accessToken;

    const signupBtn = this.querySelector("#signup-btn") as HTMLButtonElement;
    const loginBtn  = this.querySelector("#login-btn") as HTMLButtonElement;
    const logoutBtn = this.querySelector("#logout-btn") as HTMLButtonElement;

    if (!signupBtn || !loginBtn || !logoutBtn) return;

    if (isLoggedIn) {
      // 로그인 상태: 로그아웃 버튼만 보임
      signupBtn.classList.add("hidden");
      loginBtn.classList.add("hidden");
      logoutBtn.classList.remove("hidden");
    } else {
      // 비로그인 상태: 가입/로그인 버튼만 보임
      signupBtn.classList.remove("hidden");
      loginBtn.classList.remove("hidden");
      logoutBtn.classList.add("hidden");
    }

    // 로그아웃 클릭 시
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href ='/index.html';
    });
  }
}

// HeaderComponent 를 <nike-header> 태그로 정의
customElements.define('nike-header', HeaderComponent);
