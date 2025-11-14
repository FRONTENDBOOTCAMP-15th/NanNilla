class HeaderComponent extends HTMLElement {
  // 웹 컴포넌트가 DOM 연결될 때 호출되는 메서드
  // 컴포넌트 렌더링과 이벤트 초기화 수행
  connectedCallback(){
    this.render();
    this.initFilterButtons();
  }
  // UI 렌더링
  render() {
    this.innerHTML =`
    <header class="flex w-full h-15 gap-24.5 justify-center items-center bg-nike-white">
      <button class="box-border px-2.5 py-5"><a href="/index.html"> <img src="/assets/logo.svg" alt="나이키 홈"></a>
      </button>
      <div class="flex">
        <button><a href=""></a><img src="/assets/icon36px/icon-search.svg" alt=""></button>
        <button><a href=""></a><img src="/assets/icon36px/icon-profile.svg" alt=""></button>
        <button><a href=""></a><img src="/assets/icon36px/icon-cart-in.svg" alt=""></button>
        <input type="checkbox" id="menu" class="peer hidden"><label for="menu" class="w-9 h-9 bg-[url(/assets/icon36px/icon-menu.svg)] cursor-pointer"></label>
      </div>
    </header>
    <section class="sidebar block w-77.5 h-full p-2 bg-nike-white top-0 right-[-86.11%] peer-checked:right-0 z-20 fixed transition-all duration-350 [header:has(#menu:checked)+&]:right-0">
      <div class="flex flex-col gap-9.5">
        <input type="checkbox" id="menu" class="peer hidden"><label for="menu" class="w-9 h-9 absolute right-2 p-1 z-30 box-border bg-[url(/assets/icon36px/icon-close.svg)] cursor-pointer"></label>
      <div class="flex gap-5 pl-8.5 pt-19">
        <button class="w-22.5 h-10 rounded-full bg-nike-black text-nike-white text-base"><a href="../../src/pages/signup.html">가입하기</a></button>
        <button class="w-19.5 h-10 rounded-full bg-nike-white text-nike-black border border-nike-gray-light text-base"><a href="../../src/pages/signin.html">로그인</a></button>
      </div>
      <div class="flex flex-col pl-8.5 gap-6">
        <button class="flex items-center justify-between text-2xl leading-7 font-medium" data-new-only="true"><span>New & Featured</span><img src="/assets/icon36px/icon-next.svg"></button>
        <button class="flex items-center justify-between text-2xl leading-7 font-medium"><span>Men</span><img src="/assets/icon36px/icon-next.svg"></button>
        <button class="flex items-center justify-between text-2xl leading-7 font-medium"><span>Women</span><img src="/assets/icon36px/icon-next.svg"></button>
        <button class="flex items-center justify-between text-2xl leading-7 font-medium"><span>Kids</span><img src="/assets/icon36px/icon-next.svg"></button>
        <button class="flex items-center justify-between text-2xl leading-7 font-medium"><span>Sale</span><img src="/assets/icon36px/icon-next.svg"></button>
      </div>
      <div class="flex flex-col w-32.6 pl-8.5">
        <button class="flex items-center gap-3 text-base font-medium py-2"><img src="/assets/icon24px/icon-cs.svg" alt=""><span>고객센터</span></button>
        <button class="flex items-center gap-3 text-base font-medium py-2"><img src="/assets/icon24px/icon-cart.svg" alt=""><a href="./cart.html">장바구니</a></button>
        <button class="flex items-center gap-3 text-base font-medium py-2"><img src="/assets/icon24px/icon-order.svg" alt=""><span>주문</span></button>
        <button class="flex items-center gap-3 text-base font-medium py-2"><img src="/assets/icon24px/icon-store.svg" alt=""><span>매장 찾기</span></button>
      </div>
    </section>
    <label for="menu" class="fixed inset-0 bg-nike-black-35 opacity-0 pointer-events-none z-10 transition-opacity duration-300 [header:has(#menu:checked)~&]:opacity-100 [header:has(#menu:checked)~&]:pointer-events-auto" aria-label="배경 오버레이"></label>
    `;
  }

      // 필터 관련 버튼(카테고리, 신상품 등)을 초기화
  private initFilterButtons() {
    // data-new-only 또는 data-category-code 속성이 있는 모든 버튼을 찾음
    const buttons = this.querySelectorAll<HTMLButtonElement>('[data-new-only], [data-category-code]');

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const params = new URLSearchParams();

        // (옵션) 나중에 카테고리로도 쓸 수 있게 예약
        const categoryCode = button.dataset.categoryCode;
        // 신상품 버튼인지 확인
        const newOnly = button.dataset.newOnly === 'true';

        if (categoryCode) {
          params.set('categoryCode', categoryCode);
        }
        if (newOnly) {
          params.set('newOnly', 'true');
        }

        // 쿼리스트링 만들기
        const queryString = params.toString();
        const url = queryString
          ? `/item-list.html?${queryString}`
          : '/item-list.html';

        // 실제 페이지 이동
        window.location.href = url;
      });
    });
  }

}

// HeaderComponent 를 <nike-header> 태그로 정의
customElements.define('nike-header', HeaderComponent);