class HeaderComponent extends HTMLElement {
  // 웹 컴포넌트가 DOM 연결될 때 호출되는 메서드
  // 컴포넌트 렌더링과 이벤트 초기화 수행
  connectedCallback() {
    this.render();
    this.initAuthUI();
    this.initSubMenu();
  }
  // 헤더/사이드 바 UI 렌더링
  render() {
    this.innerHTML = `
    <div class="relative">
      <input type="checkbox" id="menu-toggle" class="peer hidden">
      <!-- 헤더 -->
      <header class="hidden nikeDesktop:flex w-full h-10 px-6 justify-end items-center bg-nike-gray-lightest">
        <div class="flex gap-3">
        <button class="text-xs font-medium">매장찾기</button>
        <p class="text-xs font-medium">|</p>
        <button class="text-xs font-medium">고객센터</button>
        <p class="text-xs font-medium">|</p>
        <button id="signup-btn" class="text-xs font-medium cursor-pointer">가입하기</button>
        <p id="divide" class="text-xs font-medium">|</p>
        <button id="login-btn" class="text-xs font-medium cursor-pointer">로그인</button>
        <button id="logout-btn" class="text-xs font-medium cursor-pointer">로그아웃</button>
        </div>
      </header>
      <header class="flex w-full h-15 px-6 justify-between items-center bg-nike-white">
        <!-- 나이키 홈 -->
        <button><a href="/index.html"><img src="/assets/logo.svg"></a></button>
        <!-- 카테고리 (데스크탑) -->
        <div class="flex flex-row">
          <button class="px-3 hidden nikeDesktop:block"><a href="/src/pages/itemlist?extra.isNew=true">New & Featured</a></button>
          <button id="menu-men"class="px-3 hidden nikeDesktop:block"><a href="/src/pages/itemlist?extra.category.1=PC0102">Men</a></button>
          <button id="menu-women" class="px-3 hidden nikeDesktop:block"><a href="/src/pages/itemlist?extra.category.1=PC0201">Women</a></button>
          <button id="menu-kids" class="px-3 hidden nikeDesktop:block"><a href="/src/pages/itemlist?extra.category.1=PC0301">Kids</a></button>
          <button class="px-3 hidden nikeDesktop:block"><a href="/src/pages/itemlist?extra.sale=true">Sale</a></button>
        </div>
        <!-- 메뉴 -->
        <div class="flex nikeDesktop:gap-2">
          <button class="nikeDesktop:hidden"><img src="/assets/icon36px/icon-search.svg"></button>
          <div class="hidden nikeDesktop:flex w-42 h-9 items-center gap-2 bg-nike-gray-lightest rounded-full px-3">
            <img src="/assets/icon36px/icon-search.svg" alt="검색" class="w-8 h-8" />
            <input type="text" placeholder="검색" class="bg-transparent outline-none text-sm w-full" />
          </div>
          <button class="nikeDesktop:hidden"><img src="/assets/icon36px/icon-profile.svg"></button>
          <button class="hidden nikeDesktop:block"><img src="/assets/icon36px/icon-favorite.svg"></button>
          <button><a href="/src/pages/cart"><img src="/assets/icon36px/icon-cart.svg"></a></button>
          <label for="menu-toggle" class="w-9 h-9 bg-[url(/assets/icon36px/icon-menu.svg)] cursor-pointer nikeDesktop:hidden"></label>
        </div>
      </header>

      <!-- 서브 메뉴 (Men) -->
      <div id="sub-menu-men" class="fixed left-0 top-25 w-screen h-[450px] bg-white shadow-lg border-t border-gray-300 opacity-0 invisible translate-y-2 transition-all duration-300 z-30">
        <div class="flex p-12 gap-65 justify-center">
          <!-- 신발 -->
          <div class="flex flex-col gap-3">
            <a href="/src/pages/itemlist?extra.category.1=PC0102" class="font-medium text-sm mb-2">신발</a>
            <a href="/src/pages/itemlist?extra.category.2=PC010201" class="font-medium text-nike-gray-dark hover:underline text-xs">라이프스타일</a>
            <a href="/src/pages/itemlist?extra.category.2=PC010202" class="font-medium text-nike-gray-dark hover:underline text-xs">조던</a>
            <a href="/src/pages/itemlist?extra.category.2=PC010203" class="font-medium text-nike-gray-dark hover:underline text-xs">러닝</a>
            <a href="/src/pages/itemlist?extra.category.2=PC010204" class="font-medium text-nike-gray-dark hover:underline text-xs">농구</a>
            <a href="/src/pages/itemlist?extra.category.2=PC010205" class="font-medium text-nike-gray-dark hover:underline text-xs">미식축구</a>
            <a href="/src/pages/itemlist?extra.category.2=PC010206" class="font-medium text-nike-gray-dark hover:underline text-xs">축구</a>
            <a href="/src/pages/itemlist?extra.category.2=PC010207" class="font-medium text-nike-gray-dark hover:underline text-xs">트레이닝 & 짐</a>
            <a href="/src/pages/itemlist?extra.category.2=PC010208" class="font-medium text-nike-gray-dark hover:underline text-xs">스케이트보딩</a>
            <a href="/src/pages/itemlist?extra.category.2=PC010209" class="font-medium text-nike-gray-dark hover:underline text-xs">골프</a>
            <a href="/src/pages/itemlist?extra.category.2=PC0102010" class="font-medium text-nike-gray-dark hover:underline text-xs">테니스</a>
            <a href="/src/pages/itemlist?extra.category.2=PC0102011" class="font-medium text-nike-gray-dark hover:underline text-xs">샌들 & 슬리퍼</a>
          </div>

          <!-- 의류 -->
          <div class="flex flex-col gap-3">
            <a href="/src/pages/itemlist?extra.category.1=PC0103" class="font-medium text-sm mb-2">의류</a>
            <a href="/src/pages/itemlist?extra.category.2=PC010301" class="font-medium text-nike-gray-dark hover:underline text-xs">탑 & 티셔츠</a>
            <a href="/src/pages/itemlist?extra.category.2=PC010302" class="font-medium text-nike-gray-dark hover:underline text-xs">후디 & 크루</a>
            <a href="/src/pages/itemlist?extra.category.2=PC010303" class="font-medium text-nike-gray-dark hover:underline text-xs">재킷 & 베스트</a>
            <a href="/src/pages/itemlist?extra.category.2=PC010304" class="font-medium text-nike-gray-dark hover:underline text-xs">팬츠 & 타이츠</a>
            <a href="/src/pages/itemlist?extra.category.2=PC010305" class="font-medium text-nike-gray-dark hover:underline text-xs">트랙수트</a>
            <a href="/src/pages/itemlist?extra.category.2=PC010306" class="font-medium text-nike-gray-dark hover:underline text-xs">쇼츠</a>
            <a href="/src/pages/itemlist?extra.category.2=PC010307" class="font-medium text-nike-gray-dark hover:underline text-xs">점프수트 & 롬퍼스</a>
            <a href="/src/pages/itemlist?extra.category.2=PC010308" class="font-medium text-nike-gray-dark hover:underline text-xs">서핑 & 수영복</a>
            <a href="/src/pages/itemlist?extra.category.2=PC010309" class="font-medium text-nike-gray-dark hover:underline text-xs">양말</a>
          </div>

          <!-- 용품 -->
          <div class="flex flex-col gap-3">
            <a href="/src/pages/itemlist?extra.category.1=PC0101" class="font-medium text-sm mb-2">용품</a>
            <a href="/src/pages/itemlist?extra.category.2=PC010101" class="font-medium text-nike-gray-dark hover:underline text-xs">가방</a>
            <a href="/src/pages/itemlist?extra.category.2=PC010102" class="font-medium text-nike-gray-dark hover:underline text-xs">모자 & 헤드밴드</a>
            <a href="/src/pages/itemlist?extra.category.2=PC010103" class="font-medium text-nike-gray-dark hover:underline text-xs">장갑</a>
            <a href="/src/pages/itemlist?extra.category.2=PC010104" class="font-medium text-nike-gray-dark hover:underline text-xs">슬리브 & 암 밴드</a>
            <a href="/src/pages/itemlist?extra.category.2=PC010105" class="font-medium text-nike-gray-dark hover:underline text-xs">공</a>
            <a href="/src/pages/itemlist?extra.category.2=PC010106" class="font-medium text-nike-gray-dark hover:underline text-xs">보호대</a>
          </div>
        </div>
      </div>
      <!-- 서브 메뉴 (Women) -->
      <div id="sub-menu-women" class="fixed left-0 top-25 w-screen h-[450px] bg-white shadow-lg border-t border-gray-300 opacity-0 invisible translate-y-2 transition-all duration-300 z-30">
        <div class="flex p-12 gap-65 justify-center">
          <!-- 신발 -->
          <div class="flex flex-col gap-3">
            <a href="/src/pages/itemlist?extra.category.1=PC0201" class="font-medium text-sm mb-2">신발</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020101" class="font-medium text-nike-gray-dark hover:underline text-xs">라이프스타일</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020102" class="font-medium text-nike-gray-dark hover:underline text-xs">러닝</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020103" class="font-medium text-nike-gray-dark hover:underline text-xs">농구</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020104" class="font-medium text-nike-gray-dark hover:underline text-xs">축구</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020105" class="font-medium text-nike-gray-dark hover:underline text-xs">트레이닝 & 짐</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020106" class="font-medium text-nike-gray-dark hover:underline text-xs">조던</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020107" class="font-medium text-nike-gray-dark hover:underline text-xs">스케이트보딩</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020108" class="font-medium text-nike-gray-dark hover:underline text-xs">골프</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020109" class="font-medium text-nike-gray-dark hover:underline text-xs">테니스</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020110" class="font-medium text-nike-gray-dark hover:underline text-xs">샌들 & 슬리퍼</a>
          </div>

          <!-- 의류 -->
          <div class="flex flex-col gap-3">
            <a href="/src/pages/itemlist?extra.category.1=PC0202" class="font-medium text-sm mb-2">의류</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020201" class="font-medium text-nike-gray-dark hover:underline text-xs">탑 & 티셔츠</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020202" class="font-medium text-nike-gray-dark hover:underline text-xs">스포츠 브라</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020203" class="font-medium text-nike-gray-dark hover:underline text-xs">후디 & 크루</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020204" class="font-medium text-nike-gray-dark hover:underline text-xs">쇼츠</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020205" class="font-medium text-nike-gray-dark hover:underline text-xs">팬츠 & 타이츠</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020206" class="font-medium text-nike-gray-dark hover:underline text-xs">재킷 & 베스트</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020207" class="font-medium text-nike-gray-dark hover:underline text-xs">트랙수트</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020208" class="font-medium text-nike-gray-dark hover:underline text-xs">점프수트 & 롬퍼스</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020209" class="font-medium text-nike-gray-dark hover:underline text-xs">스커트 & 드레스</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020210" class="font-medium text-nike-gray-dark hover:underline text-xs">서핑 & 수영복</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020211" class="font-medium text-nike-gray-dark hover:underline text-xs">양말</a>
          </div>

          <!-- 용품 -->
          <div class="flex flex-col gap-3">
            <a href="/src/pages/itemlist?extra.category.1=PC0203" class="font-medium text-sm mb-2">용품</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020301" class="font-medium text-nike-gray-dark hover:underline text-xs">가방</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020302" class="font-medium text-nike-gray-dark hover:underline text-xs">모자 & 헤드밴드</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020303" class="font-medium text-nike-gray-dark hover:underline text-xs">장갑</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020304" class="font-medium text-nike-gray-dark hover:underline text-xs">슬리브 & 암 밴드</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020305" class="font-medium text-nike-gray-dark hover:underline text-xs">공</a>
            <a href="/src/pages/itemlist?extra.category.2=PC020306" class="font-medium text-nike-gray-dark hover:underline text-xs">보호대</a>
          </div>
        </div>
      </div>
      <!-- 서브 메뉴 (Kids) -->
      <div id="sub-menu-kids" class="fixed left-0 top-25 w-screen h-[450px] bg-white shadow-lg border-t border-gray-300 opacity-0 invisible translate-y-2 transition-all duration-300 z-30">
        <div class="flex p-12 gap-65 justify-center">
          <!-- 신발 -->
          <div class="flex flex-col gap-3">
            <a href="/src/pages/itemlist?extra.category.1=PC0301" class="font-medium text-sm mb-2">신발</a>
            <a href="/src/pages/itemlist?extra.category.2=PC030101" class="font-medium text-nike-gray-dark hover:underline text-xs">라이프스타일</a>
            <a href="/src/pages/itemlist?extra.category.2=PC030102" class="font-medium text-nike-gray-dark hover:underline text-xs">조던</a>
            <a href="/src/pages/itemlist?extra.category.2=PC030103" class="font-medium text-nike-gray-dark hover:underline text-xs">러닝</a>
            <a href="/src/pages/itemlist?extra.category.2=PC030104" class="font-medium text-nike-gray-dark hover:underline text-xs">농구</a>
            <a href="/src/pages/itemlist?extra.category.2=PC030105" class="font-medium text-nike-gray-dark hover:underline text-xs">축구</a>
            <a href="/src/pages/itemlist?extra.category.2=PC030106" class="font-medium text-nike-gray-dark hover:underline text-xs">스케이트보딩</a>
            <a href="/src/pages/itemlist?extra.category.2=PC030107" class="font-medium text-nike-gray-dark hover:underline text-xs">샌들 & 슬리퍼</a>
            <a href="/src/pages/itemlist?extra.category.2=PC030108" class="font-medium text-nike-gray-dark hover:underline text-xs">테니스</a>
          </div>

          <!-- 의류 -->
          <div class="flex flex-col gap-3">
            <a href="/src/pages/itemlist?extra.category.1=PC0302" class="font-medium text-sm mb-2">의류</a>
            <a href="/src/pages/itemlist?extra.category.2=PC030201" class="font-medium text-nike-gray-dark hover:underline text-xs">탑 & 티셔츠</a>
            <a href="/src/pages/itemlist?extra.category.2=PC030202" class="font-medium text-nike-gray-dark hover:underline text-xs">쇼츠</a>
            <a href="/src/pages/itemlist?extra.category.2=PC030203" class="font-medium text-nike-gray-dark hover:underline text-xs">상하의 세트</a>
            <a href="/src/pages/itemlist?extra.category.2=PC030204" class="font-medium text-nike-gray-dark hover:underline text-xs">점프수트 & 롬퍼스</a>
            <a href="/src/pages/itemlist?extra.category.2=PC030205" class="font-medium text-nike-gray-dark hover:underline text-xs">팬츠 & 타이츠</a>
            <a href="/src/pages/itemlist?extra.category.2=PC030206" class="font-medium text-nike-gray-dark hover:underline text-xs">스커트 & 드레스</a>
            <a href="/src/pages/itemlist?extra.category.2=PC030207" class="font-medium text-nike-gray-dark hover:underline text-xs">양말</a>
            <a href="/src/pages/itemlist?extra.category.2=PC030208" class="font-medium text-nike-gray-dark hover:underline text-xs">스포츠 브라</a>
            <a href="/src/pages/itemlist?extra.category.2=PC030209" class="font-medium text-nike-gray-dark hover:underline text-xs">재킷 & 베스트</a>
            <a href="/src/pages/itemlist?extra.category.2=PC030210" class="font-medium text-nike-gray-dark hover:underline text-xs">후디 & 크루</a>
          </div>

          <!-- 용품 -->
          <div class="flex flex-col gap-3">
            <a href="/src/pages/itemlist?extra.category.1=PC0303" class="font-medium text-sm mb-2">용품</a>
            <a href="/src/pages/itemlist?extra.category.2=PC030301" class="font-medium text-nike-gray-dark hover:underline text-xs">가방</a>
            <a href="/src/pages/itemlist?extra.category.2=PC030302" class="font-medium text-nike-gray-dark hover:underline text-xs">모자 & 헤드밴드</a>
            <a href="/src/pages/itemlist?extra.category.2=PC030303" class="font-medium text-nike-gray-dark hover:underline text-xs">양말</a>
            <a href="/src/pages/itemlist?extra.category.2=PC030304" class="font-medium text-nike-gray-dark hover:underline text-xs">장갑</a>
            <a href="/src/pages/itemlist?extra.category.2=PC030305" class="font-medium text-nike-gray-dark hover:underline text-xs">공</a>
            <a href="/src/pages/itemlist?extra.category.2=PC030306" class="font-medium text-nike-gray-dark hover:underline text-xs">보호대</a>
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
            <button class="flex items-center justify-between text-2xl leading-7 font-medium"><span><a href="/src/pages/itemlist?extra.category.1=PC0102">Men</a></span><img src="/assets/icon36px/icon-next.svg"></button>
            <button class="flex items-center justify-between text-2xl leading-7 font-medium"><span><a href="/src/pages/itemlist?extra.category.1=PC0201">Women</a></span><img src="/assets/icon36px/icon-next.svg"></button>
            <button class="flex items-center justify-between text-2xl leading-7 font-medium"><span><a href="/src/pages/itemlist?extra.category.1=PC0301">Kids</a></span><img src="/assets/icon36px/icon-next.svg"></button>
            <button class="flex items-center justify-between text-2xl leading-7 font-medium"><span><a href="/src/pages/itemlist?extra.isNew=true">Sale</a></span><img src="/assets/icon36px/icon-next.svg"></button>
          </div>
          <div class="flex flex-col w-32.6 pl-8.5">
            <button class="flex items-center gap-3 text-base font-medium py-2"><img src="/assets/icon24px/icon-cs.svg" alt=""><span>고객센터</span></button>
            <button class="flex items-center gap-3 text-base font-medium py-2"><img src="/assets/icon24px/icon-cart.svg" alt=""><a href="/src/pages/cart">장바구니</a></button>
            <button class="flex items-center gap-3 text-base font-medium py-2"><img src="/assets/icon24px/icon-order.svg" alt=""><span>주문</span></button>
            <button class="flex items-center gap-3 text-base font-medium py-2"><img src="/assets/icon24px/icon-store.svg" alt=""><span>매장 찾기</span></button>
          </div>
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
  // 로그인/로그아웃 상태별 UI
  private initAuthUI() {
    // 토큰 존재하면 로그인 상태
    const accessToken = localStorage.getItem('accessToken');
    const isLoggedIn = !!accessToken;

    const signupBtn = this.querySelector('#signup-btn') as HTMLButtonElement;
    const loginBtn = this.querySelector('#login-btn') as HTMLButtonElement;
    const logoutBtn = this.querySelector('#logout-btn') as HTMLButtonElement;
    const divideLine = this.querySelector('#divide') as HTMLElement;

    if (!signupBtn || !loginBtn || !logoutBtn) return;

    if (isLoggedIn) {
      // 로그인 상태: 로그아웃 버튼만 보임
      signupBtn.classList.add('hidden');
      loginBtn.classList.add('hidden');
      logoutBtn.classList.remove('hidden');
      divideLine.classList.add('hidden');
    } else {
      // 비로그인 상태: 가입/로그인 버튼만 보임
      signupBtn.classList.remove('hidden');
      loginBtn.classList.remove('hidden');
      logoutBtn.classList.add('hidden');
      divideLine.classList.remove('hidden');
    }

    // 로그아웃 클릭 시
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/index.html';
    });
  }
  // 서브 메뉴 UI
  private initSubMenu() {
    const menBtn = this.querySelector('#menu-men') as HTMLElement;
    const subMenuMen = this.querySelector('#sub-menu-men') as HTMLElement;
    const womenBtn = this.querySelector('#menu-women') as HTMLElement;
    const subMenuWomen = this.querySelector('#sub-menu-women') as HTMLElement;
    const kidsBtn = this.querySelector('#menu-kids') as HTMLElement;
    const subMenuKids = this.querySelector('#sub-menu-kids') as HTMLElement;
    // --------------------------
    // Men                      
    // --------------------------
    if (!menBtn || !subMenuMen) return;
    // 버튼 hover → 메뉴 열기
    menBtn.addEventListener('mouseenter', () => {
      subMenuMen.classList.remove('opacity-0', 'invisible', 'translate-y-2');
    });
    // 버튼에서 나갔는데 메뉴에 안 들어가면 닫기
    menBtn.addEventListener('mouseleave', () => {
      setTimeout(() => {
        if (!subMenuMen.matches(':hover')) {
          subMenuMen.classList.add('opacity-0', 'invisible', 'translate-y-2');
        }
      }, 80);
    });
    // 메뉴에서 마우스 떠나면 닫기
    subMenuMen.addEventListener('mouseleave', () => {
      subMenuMen.classList.add('opacity-0', 'invisible', 'translate-y-2');
    });

    // --------------------------
    // Women                      
    // --------------------------
    if (!womenBtn || !subMenuWomen) return;
    // 버튼 hover → 메뉴 열기
    womenBtn.addEventListener('mouseenter', () => {
      subMenuWomen.classList.remove('opacity-0', 'invisible', 'translate-y-2');
    });
    // 버튼에서 나갔는데 메뉴에 안 들어가면 닫기
    womenBtn.addEventListener('mouseleave', () => {
      setTimeout(() => {
        if (!subMenuWomen.matches(':hover')) {
          subMenuWomen.classList.add('opacity-0', 'invisible', 'translate-y-2');
        }
      }, 80);
    });
    // 메뉴에서 마우스 떠나면 닫기
    subMenuWomen.addEventListener('mouseleave', () => {
      subMenuWomen.classList.add('opacity-0', 'invisible', 'translate-y-2');
    });

    // --------------------------
    // Kids                      
    // --------------------------
    if (!kidsBtn || !subMenuKids) return;
    // 버튼 hover → 메뉴 열기
    kidsBtn.addEventListener('mouseenter', () => {
      subMenuKids.classList.remove('opacity-0', 'invisible', 'translate-y-2');
    });
    // 버튼에서 나갔는데 메뉴에 안 들어가면 닫기
    kidsBtn.addEventListener('mouseleave', () => {
      setTimeout(() => {
        if (!subMenuKids.matches(':hover')) {
          subMenuKids.classList.add('opacity-0', 'invisible', 'translate-y-2');
        }
      }, 80);
    });
    // 메뉴에서 마우스 떠나면 닫기
    subMenuKids.addEventListener('mouseleave', () => {
      subMenuKids.classList.add('opacity-0', 'invisible', 'translate-y-2');
    });
  }
}

// HeaderComponent 를 <nike-header> 태그로 정의
customElements.define('nike-header', HeaderComponent);