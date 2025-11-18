import type { Products } from '../types/products';
import { getAxios } from '../utils/axios';
import type { ItemListRes } from '../types/response';

// URL 파라미터
const params = new URLSearchParams(window.location.search);
// http://localhost:5173/src/pages/itemlist?extra.isNew=true
const newQuery = params.get('extra.isNew');
const genderQuery = params.get('extra.gender');
console.log('newQuery 파라미터:', newQuery);
console.log('genderQuery 파라미터:', genderQuery);
console.log('현재 URL:', window.location.href);

let url = '/products';
if (newQuery) {
  const urlParams = encodeURIComponent(`{"extra.isNew": ${newQuery}}`);
  url += `?custom=${urlParams}`;
} else if (genderQuery) {
  const urlParams = encodeURIComponent(`{"extra.gender": "${genderQuery}"}`);
  url += `?custom=${urlParams}`;
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
  const result = prds.map((prd) => {
    return `
      <figure class="prod1 w-[calc((100%-6px)/2)] nikeDesktop:w-[calc((100%-24px)/3)] nikeDesktop:px-2">
        <a href="/src/pages/itemdetail?_id=${prd._id}">
          <img src="${prd.mainImages[0].path}" alt="${prd.name} 신발 이미지" />
        </a>
        <figcaption>
          <a href="/src/pages/itemdetail?_id=${prd._id}">
            ${prd.extra.isNew ? `<p class="text-sm text-nike-red px-3 nikeDesktop:px-0">신제품</p>` : ''}
            <p class="text-sm px-3 nikeDesktop:px-0">${prd.name}</p>
            ${prd.extra.gender === 'men' ? `<p class="text-sm text-nike-gray-dark font-normal px-3 nikeDesktop:px-0">남성 신발</p>` : ``}
            ${prd.extra.gender === 'women' ? `<p class="text-sm text-nike-gray-dark font-normal px-3 nikeDesktop:px-0">여성 신발</p>` : ``}
            ${prd.extra.gender === 'kids' ? `<p class="text-sm text-nike-gray-dark font-normal px-3 nikeDesktop:px-0">키즈 신발</p>` : ``}
            <p class="text-sm text-nike-gray-dark font-normal px-3 nikeDesktop:px-0">${prd.extra.color ? prd.extra.color.split('/').length : 1}개 색상</p>
            <p class="text-base px-3 nikeDesktop:px-0">${prd.price.toLocaleString()} 원</p>
          </a>
        </figcaption>
      </figure>
    `;
  });

  const itemList = document.querySelector('.item-list-wrapper');
  if (itemList) {
    itemList.innerHTML = result.join('');
  }
}

function renderTitle(prds: Products[]) {
  let result = '';

  if (genderQuery) {
    result = `
    <h1 class="nike-title-mobile text-[1.25rem] px-5 pt-[13px] pb-[13px] mb-[15px] nikeDesktop:hidden">${prds[0].extra.gender}</h1>
    <h1 class="nike-title-desktop text-[1.25rem] px-12 pt-[17px] pb-[30px] hidden nikeDesktop:block nikeDesktop:whitespace-nowrap">${prds[0].extra.gender} (${prds.length})</h1>
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

  pEl.textContent = genderQuery ? `${prds[0].extra.gender} (${prds.length})` : `신제품 (${prds.length})`;

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
