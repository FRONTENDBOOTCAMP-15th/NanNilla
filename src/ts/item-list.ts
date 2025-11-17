import type { Products } from '../types/products';
import { getAxios } from '../utils/axios';
import type { ItemListRes } from '../types/response';

const params = new URLSearchParams(window.location.search);
console.log(params);

// http://localhost:5173/src/pages/itemlist?extra.isNew=true
const newQuery = params.get('extra.isNew');
const genderQuery = params.get('extra.gender');
console.log('newQuery 파라미터:', newQuery);
console.log('genderQuery 파라미터:', genderQuery);
console.log('현재 URL:', window.location.href);

let url = '/products';
let urlParams = '';
if (newQuery) {
  urlParams = encodeURIComponent(`{"extra.isNew": ${newQuery}}`);
  url += `?custom=${urlParams}`;
} else if (genderQuery) {
  urlParams = encodeURIComponent(`{"extra.gender": "${genderQuery}"}`);
  url += `?custom=${urlParams}`;
}

async function getData(currentUrl: string) {
  const axios = getAxios();
  try {
    console.log('요청 URL:', url);
    const { data } = await axios.get<ItemListRes>(currentUrl);
    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
  }
}

function renderItemList(prds: Products[]) {
  const result = prds.map((prd) => {
    let itemInfo = '';
    itemInfo += `
      <figure class="prod1 w-[calc((100%-6px)/2)] nikeDesktop:w-[calc((100%-24px)/3)] nikeDesktop:px-2">
            <a href="/src/pages/itemdetail?_id=${prd._id}"><img src="${prd.mainImages[0].path}" alt="${prd.name} 신발 이미지" /> </a>
            <figcaption>
              <a href="/src/pages/itemdetail?_id=${prd._id}">`;
    if (prd.extra.isNew) {
      itemInfo += `<p class="text-sm text-nike-red px-3 nikeDesktop:px-0">신제품</p>`;
    }
    // 제품에 대한 부가 정보를 넣어야하는데 DB에 정보가 없어서 이름으로만 넣음
    itemInfo += `<p class="text-sm px-3 nikeDesktop:px-0">${prd.name}</p>
                <p class="text-sm text-nike-gray-dark font-normal px-3 nikeDesktop:px-0">${prd.name}</p>
                <p class="text-sm text-nike-gray-dark font-normal px-3 nikeDesktop:px-0">${prd.name}</p>
                <p class="text-base px-3 nikeDesktop:px-0">${prd.price.toLocaleString()} 원</p>
              </a>
            </figcaption>
          </figure>`;
    return itemInfo;
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

function renderHiddenTitle(prds: Products[]) {
  // <div class="hidden nikeDesktop:block"><p class="hidden">신제품 ${prds.length}</p></div>

  const divEl = document.createElement('div');
  const pEl = document.createElement('p');
  let textNode: Text | null = null;

  if (genderQuery) {
    textNode = document.createTextNode(`${prds[0].extra.gender} (${prds.length})`);
  } else if (newQuery) {
    textNode = document.createTextNode(`신제품 (${prds.length})`);
  }

  if (textNode) {
    pEl.appendChild(textNode);
  }
  divEl.appendChild(pEl);
  divEl.classList.add('hidden');
  divEl.classList.add('nikeDesktop:block');
  pEl.classList.add('hidden-desktop-title');
  pEl.classList.add('hidden');
  pEl.classList.add('text-[1.25rem]');
  pEl.classList.add('px-12');
  pEl.classList.add('pb-[13px]');
  pEl.classList.add('mb-[15px]');
  pEl.classList.add('pt-[0px]');

  const itemList = document.querySelector('.filter-bar');
  const desktopBTn = document.querySelector('.desktop-button');
  if (itemList) {
    itemList.insertBefore(divEl, desktopBTn);
  }
}

const data = await getData(url);
if (data?.ok) {
  console.log(data.item);

  renderItemList(data.item);
  renderTitle(data.item);
  renderHiddenTitle(data.item);
}

// 필터숨기기 누르면 필터영역 사라짐
const hiddenBtn = document.querySelector('.item-filter-hidden');

hiddenBtn?.addEventListener('click', function () {
  const categoryWrapper = document.querySelector('.category-wrapper');
  const nikeTitle = document.querySelector('.nike-title');
  const hiddenTitle = document.querySelector('.hidden-desktop-title');

  if (hiddenBtn.textContent === '필터 숨기기') {
    hiddenBtn.innerHTML = `필터 표시<img src="/assets/icon24px/icon-filter.svg" alt="필터이미지" />`;
  } else if (hiddenBtn.textContent === '필터 표시') {
    hiddenBtn.innerHTML = `필터 숨기기<img src="/assets/icon24px/icon-filter.svg" alt="필터이미지" />`;
  }

  categoryWrapper?.classList.toggle('nikeDesktop:hidden');
  nikeTitle?.classList.toggle('nikeDesktop:hidden');
  hiddenTitle?.classList.toggle('hidden');
});

// 정렬 버튼 토글 기능
const sortBtn = document.querySelector('.item-filter-sort') as HTMLElement;
const recommendBtn = document.querySelector('.recommend-sort');
const recentBtn = document.querySelector('.recent-sort');
const priceHighBtn = document.querySelector('.price-high-sort');
const priceLowBtn = document.querySelector('.price-low-sort');
const sortBtnImage = document.querySelector('.sort-btn-image');
const sortText = document.querySelector('.sort-text') as HTMLElement;

sortBtn?.addEventListener('click', function () {
  recommendBtn?.classList.toggle('hidden');
  recentBtn?.classList.toggle('hidden');
  priceHighBtn?.classList.toggle('hidden');
  priceLowBtn?.classList.toggle('hidden');

  if (sortBtnImage?.getAttribute('src') === '/assets/icon24px/icon-down.svg') {
    sortBtnImage?.setAttribute('src', '/assets/icon24px/icon-up.svg');
  } else if (sortBtnImage?.getAttribute('src') === '/assets/icon24px/icon-up.svg') {
    sortBtnImage?.setAttribute('src', '/assets/icon24px/icon-down.svg');
  }
});

// 높은 가격순 정렬
priceHighBtn?.addEventListener('click', async function () {
  const priceHighUrl = url + `&sort={"price": -1}`;

  const data = await getData(priceHighUrl);

  if (data?.ok) {
    console.log(data.item);

    renderItemList(data.item);
    renderTitle(data.item);
    renderHiddenTitle(data.item);
  }
  recommendBtn?.classList.toggle('hidden');
  recentBtn?.classList.toggle('hidden');
  priceHighBtn?.classList.toggle('hidden');
  priceLowBtn?.classList.toggle('hidden');
  sortText.textContent = '정렬기준:높은 가격순';
  sortBtnImage?.setAttribute('src', '/assets/icon24px/icon-down.svg');
});

// 낮은 가격순 정렬
priceLowBtn?.addEventListener('click', async function () {
  const priceLowUrl = url + `&sort={"price": 1}`;

  const data = await getData(priceLowUrl);

  if (data?.ok) {
    console.log(data.item);

    renderItemList(data.item);
    renderTitle(data.item);
    renderHiddenTitle(data.item);
  }
  recommendBtn?.classList.toggle('hidden');
  recentBtn?.classList.toggle('hidden');
  priceHighBtn?.classList.toggle('hidden');
  priceLowBtn?.classList.toggle('hidden');
  sortText.textContent = '정렬기준:낮은 가격순';
  sortBtnImage?.setAttribute('src', '/assets/icon24px/icon-down.svg');
});

// 최신순 정렬
recentBtn?.addEventListener('click', async function () {
  const recentUrl = url + `&sort={"createdAt": -1}`;

  const data = await getData(recentUrl);

  if (data?.ok) {
    console.log(data.item);

    renderItemList(data.item);
    renderTitle(data.item);
    renderHiddenTitle(data.item);
  }
  recommendBtn?.classList.toggle('hidden');
  recentBtn?.classList.toggle('hidden');
  priceHighBtn?.classList.toggle('hidden');
  priceLowBtn?.classList.toggle('hidden');
  sortText.textContent = '정렬기준:최신순';
  sortBtnImage?.setAttribute('src', '/assets/icon24px/icon-down.svg');
});

// 추천순 정렬
recommendBtn?.addEventListener('click', async function () {
  const recommendUrl = url + `&sort={"extra.isNew": -1, "extra.isBest": -1}`;

  const data = await getData(recommendUrl);

  if (data?.ok) {
    console.log(data.item);

    renderItemList(data.item);
    renderTitle(data.item);
    renderHiddenTitle(data.item);
  }
  recommendBtn?.classList.toggle('hidden');
  recentBtn?.classList.toggle('hidden');
  priceHighBtn?.classList.toggle('hidden');
  priceLowBtn?.classList.toggle('hidden');
  sortText.textContent = '정렬기준:추천순';
  sortBtnImage?.setAttribute('src', '/assets/icon24px/icon-down.svg');
});
