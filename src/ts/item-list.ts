import type { Products } from '../types/products';
import { getAxios } from '../utils/axios';
import type { ItemListRes } from '../types/response';

//신제품
const newPrd = ['신발', '탑 & 티셔츠', '후디 & 크루', '재킷 & 베스트', '팬츠 & 타이츠', '쇼츠', '스포츠 브라', '트랙수트', '점프수트 & 롬퍼스', '스커트 & 드레스', '양말', '용품'];

// 남성
const PC0101 = ['가방', '모자 & 헤드밴드', '장갑', '슬리브 & 암 밴드', '공', '보호대'];
const PC0102 = ['라이프스타일', '조던', '러닝', '농구', '미식축구', '축구', '트레이닝 및 짐', '스케이트보딩', '골프', '테니스', '샌들 & 슬리퍼'];
const PC0103 = ['탑 & 티셔츠', '후디 & 크루', '재킷 & 베스트', '팬츠 & 타이즈', '트랙수트', '쇼츠', '점프수트 & 롬퍼스', '서핑 & 수영복', '양말'];

// 여성
const PC0201 = ['라이프스타일', '러닝', '농구', '축구', '드레이닝 & 짐', '조던', '스케이트보딩', '골프', '테니스', '샌들 & 슬리퍼'];
const PC0202 = ['탑 & 티셔츠', '스포츠 브라', '후디 & 크루', '쇼츠', '팬츠 & 타이츠', '재킷 & 베스트', '트랙수트', '점프수트 & 롬퍼스', '스커트 & 드레스', '서핑 & 수영복', '양말'];
const PC0203 = ['가방', '모자 & 헤드밴드', '장갑', '슬리브 & 암 밴드', '공', '보호대'];

// 키즈
const PC0301 = ['라이프스타일', '조던', '러닝', '농구', '축구', '스케이트보딩', '샌들 & 슬리퍼', '테니스'];
const PC0302 = ['탑 & 티셔츠', '쇼츠', '상하의 세트', '점프수트 & 롬퍼스', '팬츠 & 타이츠', '스커트 & 드레스', '양말', '스포츠 브라', '재킷 & 베스트', '후디 & 크루'];
const PC0303 = ['가방', '모자 & 헤드밴드', '양말', '장갑', '공', '보호대'];

// URL 파라미터
const params = new URLSearchParams(window.location.search);
// http://localhost:5173/src/pages/itemlist?extra.isNew=true
const newQuery = params.get('extra.isNew');
const firstItemQuery = params.get('extra.category.0'); // 대분류
const secondItemQuery = params.get('extra.category.1'); // 중분류
const thirdItemQuery = params.get('extra.category.2'); // 소분류

let currentQuery: string = '';
let currentNewQeury: string | null = null;

console.log('newQuery 파라미터:', newQuery);
console.log('mainItemQuery 파라미터:', firstItemQuery);
console.log('subItemQuery 파라미터:', secondItemQuery);
console.log('mainItemQuery 파라미터:', thirdItemQuery);
console.log('현재 URL:', window.location.href);

let url = '/products';
if (newQuery) {
  const urlParams = encodeURIComponent(`{"extra.isNew": ${newQuery}}`);
  url += `?custom=${urlParams}`;
  currentNewQeury = newQuery;
} else if (firstItemQuery) {
  const urlParams = encodeURIComponent(`{"extra.category.0": "${firstItemQuery}"}`);
  url += `?custom=${urlParams}`;
  currentQuery = firstItemQuery;
} else if (secondItemQuery) {
  const urlParams = encodeURIComponent(`{"extra.category.1": "${secondItemQuery}"}`);
  url += `?custom=${urlParams}`;
  currentQuery = secondItemQuery;
} else if (thirdItemQuery) {
  const urlParams = encodeURIComponent(`{"extra.category.2": "${thirdItemQuery}"}`);
  url += `?custom=${urlParams}`;
  currentQuery = thirdItemQuery;
}

// 데이터 가져오기
async function getData(currentUrl: string) {
  const axios = getAxios();
  try {
    console.log('요청 URL:', url);
    const { data } = await axios.get<ItemListRes>(currentUrl);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

// 랜더 함수
function renderItemList(prds: Products[]) {
  let result;

  if (prds.length === 0) {
    result = `
    <figure class="prod1 invisible w-[calc((100%-6px)/2)] bg-nike-white nikeDesktop:w-[calc((100%-24px)/3)] nikeDesktop:px-2">
        <p class="trash-data" href="/"><img src="/api/dbinit/team-nike/uploadFiles/AIR_MAX_C_01.png" alt="" /> </p>
        <figcaption>
          <p href="/">
            <p class="text-sm text-nike-red px-3">신제품</p>
          </p>
        </figcaption>
      </figure>
      `;
  } else {
    let gender = '';
    let category = '';

    if (secondItemQuery) {
      gender = secondItemQuery.substring(2, 4) === '01' ? '남성' : secondItemQuery.substring(2, 4) === '02' ? '여성' : '키즈';
      if (gender === '남성') {
        category = secondItemQuery.substring(4) === '01' ? '용품' : secondItemQuery.substring(4) === '02' ? '신발' : '의류';
      } else {
        category = secondItemQuery.substring(4) === '01' ? '신발' : secondItemQuery.substring(4) === '02' ? '의류' : '용품';
      }
    }

    if (thirdItemQuery) {
      gender = thirdItemQuery.substring(2, 4) === '01' ? '남성' : thirdItemQuery.substring(2, 4) === '02' ? '여성' : '키즈';
      if (gender === '남성') {
        category = thirdItemQuery.substring(4, 6) === '01' ? '용품' : thirdItemQuery.substring(4, 6) === '02' ? '신발' : '의류';
      } else {
        category = thirdItemQuery.substring(4, 6) === '01' ? '신발' : thirdItemQuery.substring(4, 6) === '02' ? '의류' : '용품';
      }
    } // pc010101

    result = prds
      .map((prd) => {
        return `
      <figure class="prod1 w-[calc((100%-6px)/2)] nikeDesktop:w-[calc((100%-24px)/3)] nikeDesktop:px-2">
        <a href="/src/pages/itemdetail?_id=${prd._id}">
          <img class="aspect-[1/1.25]" src="${prd.mainImages[0].path}" alt="${prd.name} ${category} 이미지" />
        </a>
        <figcaption>
          <a href="/src/pages/itemdetail?_id=${prd._id}">
            ${prd.extra.isNew ? `<p class="text-sm text-nike-red px-3 nikeDesktop:px-0">신제품</p>` : ''}
            <p class="text-sm px-3 nikeDesktop:px-0">${prd.name}</p>
            ${gender === '남성' ? `<p class="text-sm text-nike-gray-dark font-normal px-3 nikeDesktop:px-0">남성 ${category}</p>` : ``}
            ${gender === '여성' ? `<p class="text-sm text-nike-gray-dark font-normal px-3 nikeDesktop:px-0">여성 ${category}</p>` : ``}
            ${gender === '키즈' ? `<p class="text-sm text-nike-gray-dark font-normal px-3 nikeDesktop:px-0">키즈 ${category}</p>` : ``}
            <p class="text-sm text-nike-gray-dark font-normal px-3 nikeDesktop:px-0">${prd.extra.color ? prd.extra.color.split('/').length : 1}개 색상</p>
            <p class="text-base px-3 nikeDesktop:px-0">${prd.price.toLocaleString()} 원</p>
          </a>
        </figcaption>
      </figure>
    `;
      })
      .join('');
  }

  const itemList = document.querySelector('.item-list-wrapper');
  if (itemList) {
    itemList.innerHTML = result;
  }
}

// 서브 카테고리 필터 랜더 함수
function renderFiliterList(currentQuery: string, currentNewQeury: string | null) {
  const result = `
      <div
            class="category-wrapper flex border-b border-nike-gray-light pt-2 px-1 w-full h-[50px] overflow-x-scroll whitespace-nowrap no-scrollbar nikeDesktop:flex-col nikeDesktop:h-screen nikeDesktop:w-[260px] nikeDesktop:items-start nikeDesktop:pt-0 nikeDesktop:px-0 nikeDesktop:mr-10 nikeDesktop:overflow-y-scroll nikeDesktop:border-b-0 nikeDesktop:overflow-x-hidden nikeDesktop:pb-26"
          >
            ${currentNewQeury ? newPrd.map((item) => `<button class="text-nike-black text-[1rem] font-medium px-4 pb-3.5 nikeDesktop:ml-8 nikeDesktop:pb-[10.79px]">${item}</button>`).join('') : ``}
            ${currentQuery.includes('PC0101') ? PC0101.map((item, index) => `<button class="text-nike-black text-[1rem] font-medium px-4 pb-3.5 nikeDesktop:ml-8 nikeDesktop:pb-[10.79px]"><a href="/src/pages/itemlist?extra.category.2=PC0101${index + 1 >= 10 ? index + 1 : '0' + (index + 1)}">${item}</a></button>`).join('') : ``}
            ${currentQuery.includes('PC0102') ? PC0102.map((item, index) => `<button class="text-nike-black text-[1rem] font-medium px-4 pb-3.5 nikeDesktop:ml-8 nikeDesktop:pb-[10.79px]"><a href="/src/pages/itemlist?extra.category.2=PC0102${index + 1 >= 10 ? index + 1 : '0' + (index + 1)}">${item}</a></button>`).join('') : ``}
            ${currentQuery.includes('PC0103') ? PC0103.map((item, index) => `<button class="text-nike-black text-[1rem] font-medium px-4 pb-3.5 nikeDesktop:ml-8 nikeDesktop:pb-[10.79px]"><a href="/src/pages/itemlist?extra.category.2=PC0103${index + 1 >= 10 ? index + 1 : '0' + (index + 1)}">${item}</a></button>`).join('') : ``}
            ${currentQuery.includes('PC0201') ? PC0201.map((item, index) => `<button class="text-nike-black text-[1rem] font-medium px-4 pb-3.5 nikeDesktop:ml-8 nikeDesktop:pb-[10.79px]"><a href="/src/pages/itemlist?extra.category.2=PC0201${index + 1 >= 10 ? index + 1 : '0' + (index + 1)}">${item}</a></button>`).join('') : ``}
            ${currentQuery.includes('PC0202') ? PC0202.map((item, index) => `<button class="text-nike-black text-[1rem] font-medium px-4 pb-3.5 nikeDesktop:ml-8 nikeDesktop:pb-[10.79px]"><a href="/src/pages/itemlist?extra.category.2=PC0202${index + 1 >= 10 ? index + 1 : '0' + (index + 1)}">${item}</a></button>`).join('') : ``}
            ${currentQuery.includes('PC0203') ? PC0203.map((item, index) => `<button class="text-nike-black text-[1rem] font-medium px-4 pb-3.5 nikeDesktop:ml-8 nikeDesktop:pb-[10.79px]"><a href="/src/pages/itemlist?extra.category.2=PC0203${index + 1 >= 10 ? index + 1 : '0' + (index + 1)}">${item}</a></button>`).join('') : ``}
            ${currentQuery.includes('PC0301') ? PC0301.map((item, index) => `<button class="text-nike-black text-[1rem] font-medium px-4 pb-3.5 nikeDesktop:ml-8 nikeDesktop:pb-[10.79px]"><a href="/src/pages/itemlist?extra.category.2=PC0301${index + 1 >= 10 ? index + 1 : '0' + (index + 1)}">${item}</a></button>`).join('') : ``}
            ${currentQuery.includes('PC0302') ? PC0302.map((item, index) => `<button class="text-nike-black text-[1rem] font-medium px-4 pb-3.5 nikeDesktop:ml-8 nikeDesktop:pb-[10.79px]"><a href="/src/pages/itemlist?extra.category.2=PC0302${index + 1 >= 10 ? index + 1 : '0' + (index + 1)}">${item}</a></button>`).join('') : ``}
            ${currentQuery.includes('PC0303') ? PC0303.map((item, index) => `<button class="text-nike-black text-[1rem] font-medium px-4 pb-3.5 nikeDesktop:ml-8 nikeDesktop:pb-[10.79px]"><a href="/src/pages/itemlist?extra.category.2=PC0303${index + 1 >= 10 ? index + 1 : '0' + (index + 1)}">${item}</a></button>`).join('') : ``}
            <hr class="border-nike-gray-light ml-12 mt-6 w-53" />
            <!-- 추가 목록 -->
            <div class="additional-category w-full hidden nikeDesktop:block">
              <div class="flex flex-col ml-12 mt-1 gap-1">
                <p class="gender my-3 flex">성별<img src="/assets/icon24px/icon-up.svg" alt="" class="ml-auto mr-2.5" /></p>
                <div>
                  <input type="checkbox" id="desktop-male" />
                  <label for="desktop-desktop-male">남성</label>
                </div>
                <div>
                  <input type="checkbox" id="desktop-female" />
                  <label for="desktop-female">여성</label>
                </div>
                <div>
                  <input type="checkbox" id="desktop-unisex" />
                  <label for="desktop-unisex">유니섹스</label>
                </div>
              </div>
              <hr class="border-nike-gray-light ml-12 mt-6" />
              <div class="flex flex-col ml-12 mt-1 gap-1">
                <p class="is-kid my-3 flex">키즈<img src="/assets/icon24px/icon-up.svg" alt="" class="ml-auto mr-2.5" /></p>
                <div>
                  <input type="checkbox" id="desktop-boy" />
                  <label for="desktop-boy">남아</label>
                </div>
                <div>
                  <input type="checkbox" id="desktop-girl" />
                  <label for="desktop-girl">여아</label>
                </div>
              </div>
              <hr class="border-nike-gray-light ml-12 mt-6" />
              <div class="flex flex-col ml-12 mt-1 gap-1">
                <p class="kid-age my-3 flex">키즈 연령<img src="/assets/icon24px/icon-up.svg" alt="" class="ml-auto mr-2.5" /></p>
                <div>
                  <input type="checkbox" id="desktop-baby" />
                  <label for="desktop-baby">베이비(0-3세)</label>
                </div>
                <div>
                  <input type="checkbox" id="desktop-little" />
                  <label for="desktop-little">리틀키즈(3-7세)</label>
                </div>
                <div>
                  <input type="checkbox" id="desktop-junior" />
                  <label for="desktop-junior">주니어(7-15세)</label>
                </div>
              </div>
              <hr class="border-nike-gray-light ml-12 mt-6" />
              <div class="flex flex-col ml-12 mt-1 gap-1">
                <p class="price-range my-3 flex">가격대<img src="/assets/icon24px/icon-up.svg" alt="" class="ml-auto mr-2.5" /></p>
                <div>
                  <input type="checkbox" id="desktop-price-0-50" />
                  <label for="desktop-price-0-50">0 - 50,000원</label>
                </div>

                <div>
                  <input type="checkbox" id="desktop-price-50-100" />
                  <label for="desktop-price-50-100">50,000 - 100,000원</label>
                </div>

                <div>
                  <input type="checkbox" id="desktop-price-100-150" />
                  <label for="desktop-price-100-150">100,000 - 150,000원</label>
                </div>

                <div>
                  <input type="checkbox" id="desktop-price-150-200" />
                  <label for="desktop-price-150-200">150,000 - 200,000원</label>
                </div>
              </div>
            </div>
          </div>
    `;

  const categoryMainWrapper = document.querySelector('.category-main-wrapper');
  if (categoryMainWrapper) {
    categoryMainWrapper.innerHTML = result;
  }
}

function renderTitle(prds: Products[]) {
  let result = '';
  let gender = '';
  let category = '';
  let detailed: string[] = [];
  //PC0101
  if (secondItemQuery) {
    gender = secondItemQuery.substring(2, 4) === '01' ? '남성' : secondItemQuery.substring(2, 4) === '02' ? '여성' : '키즈';
    if (gender === '남성') {
      category = secondItemQuery.substring(4) === '01' ? '용품' : secondItemQuery.substring(4) === '02' ? '신발' : '의류';
    } else {
      category = secondItemQuery.substring(4) === '01' ? '신발' : secondItemQuery.substring(4) === '02' ? '의류' : '용품';
    }
  }

  // ex) PC010103
  if (thirdItemQuery) {
    gender = thirdItemQuery.substring(2, 4) === '01' ? '남성' : thirdItemQuery.substring(2, 4) === '02' ? '여성' : '키즈';
    if (gender === '남성') {
      category = thirdItemQuery.substring(4, 6) === '01' ? '용품' : thirdItemQuery.substring(4, 6) === '02' ? '신발' : '의류';
    } else {
      category = thirdItemQuery.substring(4, 6) === '01' ? '신발' : thirdItemQuery.substring(4, 6) === '02' ? '의류' : '용품';
    }
    const index = Number(thirdItemQuery.substring(6));

    if (thirdItemQuery.substring(0, 6) === 'PC0101') {
      detailed = PC0101.filter((_item, idx) => index === idx + 1);
    }
    if (thirdItemQuery.substring(0, 6) === 'PC0102') {
      detailed = PC0102.filter((_item, idx) => index === idx + 1);
    }
    if (thirdItemQuery.substring(0, 6) === 'PC0103') {
      detailed = PC0103.filter((_item, idx) => index === idx + 1);
    }
    if (thirdItemQuery.substring(0, 6) === 'PC0201') {
      detailed = PC0201.filter((_item, idx) => index === idx + 1);
    }
    if (thirdItemQuery.substring(0, 6) === 'PC0202') {
      detailed = PC0202.filter((_item, idx) => index === idx + 1);
    }
    if (thirdItemQuery.substring(0, 6) === 'PC0203') {
      detailed = PC0203.filter((_item, idx) => index === idx + 1);
    }
    if (thirdItemQuery.substring(0, 6) === 'PC0301') {
      detailed = PC0301.filter((_item, idx) => index === idx + 1);
    }
    if (thirdItemQuery.substring(0, 6) === 'PC0302') {
      detailed = PC0302.filter((_item, idx) => index === idx + 1);
    }
    if (thirdItemQuery.substring(0, 6) === 'PC0303') {
      detailed = PC0303.filter((_item, idx) => index === idx + 1);
    }
  }

  if (firstItemQuery) {
    result = `
    <h1 class="nike-title-mobile text-[1.25rem] px-5 pt-[13px] pb-[13px] mb-[15px] nikeDesktop:hidden">${gender}</h1>
    <h1 class="nike-title-desktop text-[1.25rem] px-12 pt-[17px] pb-[30px] hidden nikeDesktop:block nikeDesktop:whitespace-nowrap">${gender} (${prds.length})</h1>
    `;
  } else if (secondItemQuery) {
    result = `
    <h1 class="nike-title-mobile text-[1.25rem] px-5 pt-[13px] pb-[13px] mb-[15px] nikeDesktop:hidden">${gender} ${category}</h1>
    <h1 class="nike-title-desktop text-[1.25rem] px-12 pt-[17px] pb-[30px] hidden nikeDesktop:block nikeDesktop:whitespace-nowrap">${gender} ${category}(${prds.length})</h1>
    `;
  } else if (thirdItemQuery) {
    result = `
    <h1 class="nike-title-mobile text-[1.25rem] px-5 pt-[13px] pb-[13px] mb-[15px] nikeDesktop:hidden">${gender} ${detailed[0]} ${category === '신발' ? ` ${category}` : ''}</h1>
    <h1 class="nike-title-desktop text-[1.25rem] px-12 pt-[17px] pb-[30px] hidden nikeDesktop:block nikeDesktop:whitespace-nowrap">${gender} ${detailed[0]}${category === '신발' ? ` ${category}` : ''}(${prds.length})</h1>
    `;
  } else if (newQuery) {
    result = `
    <h1 class="nike-title-mobile text-[1.25rem] px-5 pt-[13px] pb-[13px] mb-[15px] nikeDesktop:hidden">신제품</h1>
    <h1 class="nike-title-desktop text-[1.25rem] px-12 pt-[17px] pb-[30px] hidden nikeDesktop:block nikeDesktop:whitespace-nowrap">신제품 (${prds.length})</h1>
    `;
  }

  const nikeTitle = document.querySelector('.nike-title');
  if (nikeTitle) {
    nikeTitle.innerHTML = result;
  }
}

function renderTotalItem(prds: Products[]) {
  const result = `${prds.length}개의 결과`;

  const totalItem = document.querySelector('.total-item');
  if (totalItem) {
    totalItem.textContent = result;
  }
}

function renderHiddenTitle(prds: Products[]) {
  const divEl = document.createElement('div');
  const pEl = document.createElement('p');
  if (prds.length === 0) {
    pEl.textContent = `상품없음 (0)`;
  } else {
    pEl.textContent = firstItemQuery ? `${prds[0].extra.gender} (${prds.length})` : secondItemQuery ? `${prds[0].extra.gender} (${prds.length})` : thirdItemQuery ? `${prds[0].extra.gender} (${prds.length})` : `신제품 (${prds.length})`;
  }
  divEl.appendChild(pEl);
  divEl.classList.add('hidden', 'nikeDesktop:block');
  pEl.classList.add('hidden-desktop-title', 'hidden', 'text-[1.25rem]', 'px-12', 'pb-[13px]', 'mb-[15px]', 'pt-[0px]');

  const itemList = document.querySelector('.filter-bar');
  const desktopBtn = document.querySelector('.desktop-button');

  if (itemList) {
    itemList.insertBefore(divEl, desktopBtn);
  }
}

// 초기 데이터 랜더
const data = await getData(url);
if (data?.ok) {
  console.log(data.item);
  renderItemList(data.item);
  renderTitle(data.item);
  renderHiddenTitle(data.item);
  renderTotalItem(data.item);
  renderFiliterList(currentQuery, currentNewQeury);
}

// 필터 숨기기
const hiddenBtn = document.querySelector('.item-filter-hidden');
hiddenBtn?.addEventListener('click', () => {
  const categoryWrapper = document.querySelector('.category-wrapper');
  const nikeTitle = document.querySelector('.nike-title');
  const hiddenTitle = document.querySelector('.hidden-desktop-title');

  const isHidden = hiddenBtn.textContent === '필터 숨기기';
  hiddenBtn.innerHTML = isHidden ? `필터 표시<img src="/assets/icon24px/icon-filter.svg" alt="필터이미지" />` : `필터 숨기기<img src="/assets/icon24px/icon-filter.svg" alt="필터이미지" />`;

  categoryWrapper?.classList.toggle('nikeDesktop:hidden');
  nikeTitle?.classList.toggle('nikeDesktop:hidden');
  hiddenTitle?.classList.toggle('hidden');
});

// 정렬 버튼
const sortBtn = document.querySelector('.item-filter-sort') as HTMLElement;
const recommendBtn = document.querySelector('.recommend-sort');
const recentBtn = document.querySelector('.recent-sort');
const priceHighBtn = document.querySelector('.price-high-sort');
const priceLowBtn = document.querySelector('.price-low-sort');
const sortBtnImage = document.querySelector('.sort-btn-image');
const sortText = document.querySelector('.sort-text') as HTMLElement;

// 정렬 메뉴 토글
sortBtn?.addEventListener('click', () => {
  [recommendBtn, recentBtn, priceHighBtn, priceLowBtn].forEach((btn) => btn?.classList.toggle('hidden'));
  sortBtnImage?.setAttribute('src', sortBtnImage?.getAttribute('src') === '/assets/icon24px/icon-down.svg' ? '/assets/icon24px/icon-up.svg' : '/assets/icon24px/icon-down.svg');
});

// 공통 정렬 함수
async function handleSort(sortUrl: string, label: string) {
  const data = await getData(sortUrl);

  if (data?.ok) {
    renderItemList(data.item);
    renderTitle(data.item);
    renderHiddenTitle(data.item);
    renderTotalItem(data.item);
    renderFiliterList(currentQuery, currentNewQeury);
  }

  [recommendBtn, recentBtn, priceHighBtn, priceLowBtn].forEach((btn) => btn?.classList.add('hidden'));

  sortText.textContent = `정렬기준:${label}`;
  sortBtnImage?.setAttribute('src', '/assets/icon24px/icon-down.svg');
}

// 각 정렬 버튼에 대한 이벤트
priceHighBtn?.addEventListener('click', () => handleSort(url + `&sort={"price":-1}`, '높은 가격순'));
priceLowBtn?.addEventListener('click', () => handleSort(url + `&sort={"price":1}`, '낮은 가격순'));
recentBtn?.addEventListener('click', () => handleSort(url + `&sort={"createdAt":-1}`, '최신순'));
recommendBtn?.addEventListener('click', () => handleSort(url + `&sort={"extra.isNew":-1,"extra.isBest":-1}`, '추천순'));

// 모바일 필터 버튼
const mobileFilterBtn = document.querySelector('.item-filter');
const mobileFilterModal = document.querySelector('.mobile-filter-wrapper');
const mobileFilterExit = document.querySelector('.mobile-filter-exit');
const mobileFilterApply = document.querySelector('.mobile-filter-apply');

// 모바일 필터에서 필터 버튼누르면 모달이 나오게함
mobileFilterBtn?.addEventListener('click', function () {
  mobileFilterModal?.classList.toggle('hidden');
  document.body.style.overflow = 'hidden';
});

// 모바일 필터에서 닫기 버튼이나 적용 누르면 모달 끔
mobileFilterExit?.addEventListener('click', function () {
  mobileFilterModal?.classList.toggle('hidden');
  document.body.style.overflow = ''; // 모달이 열렸을때 body 스크롤 해제
});

mobileFilterApply?.addEventListener('click', function () {
  // 선택된 정렬 옵션 가져오기
  const selectedSort = document.querySelector('input[name="mobile-sort"]:checked') as HTMLInputElement;

  if (selectedSort) {
    let sortUrl = '';
    let sortLabel = '';

    const sortId = selectedSort.id;

    if (sortId === 'mobile-recommend-sort') {
      sortUrl = url + `&sort={"extra.isNew":-1,"extra.isBest":-1}`;
      sortLabel = '추천순';
    } else if (sortId === 'mobile-recent-sort') {
      sortUrl = url + `&sort={"createdAt":-1}`;
      sortLabel = '최신순';
    } else if (sortId === 'mobile-price-high-sort') {
      sortUrl = url + `&sort={"price":-1}`;
      sortLabel = '높은 가격순';
    } else if (sortId === 'mobile-price-low-sort') {
      sortUrl = url + `&sort={"price":1}`;
      sortLabel = '낮은 가격순';
    }

    // 정렬 적용
    if (sortUrl) {
      handleSort(sortUrl, sortLabel);
    }
  }

  mobileFilterModal?.classList.toggle('hidden');
  document.body.style.overflow = ''; // 모달이 닫히면 body 스크롤 해제
});
