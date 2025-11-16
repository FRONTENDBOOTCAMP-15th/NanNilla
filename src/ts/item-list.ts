import type { Products } from '../types/products';
import { getAxios } from '../utils/axios';
import type { ItemListRes } from '../types/response';

const params = new URLSearchParams(window.location.search);
console.log(params);

// http://localhost:5173/src/pages/itemlist?extra.isNew=true
const newQuery = params.get('extra.isNew');
const genderQuery = params.get('extra.gender'); // null
console.log('newQuery 파라미터:', newQuery);
console.log('genderQuery 파라미터:', genderQuery);
console.log('현재 URL:', window.location.href);

async function getData() {
  const axios = getAxios();
  try {
    // categoryQuery가 있으면 쿼리를 포함해서 요청
    const url = '/products';

    console.log('요청 URL:', url);
    const { data } = await axios.get<ItemListRes>(url);
    return data;
  } catch (err) {
    console.log(err);
  }
}

function renderItemList(prds: Products[]) {
  const result = prds.map((prd) => {
    return `
      <figure class="prod1 w-[calc((100%-6px)/2)] nikeDesktop:w-[calc((100%-24px)/3)] nikeDesktop:px-2">
            <a href="/src/pages/itemdetail?_id=${prd._id}"><img src="${prd.mainImages[0].path}" alt="신발 이미지" /> </a>
            <figcaption>
              <a href="/src/pages/itemdetail">
                <p class="text-sm text-nike-red px-3 nikeDesktop:px-0">신제품</p>
                <p class="text-sm px-3 nikeDesktop:px-0">${prd.name}</p>
                <p class="text-sm text-nike-gray-dark font-normal px-3 nikeDesktop:px-0">${prd.name}</p>
                <p class="text-sm text-nike-gray-dark font-normal px-3 nikeDesktop:px-0">${prd.name}</p>
                <p class="text-base px-3 nikeDesktop:px-0">${prd.price}</p>
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
  if (prds[0].extra.gender === 'men' && genderQuery) {
    result = `
      <h1 class="nike-title-mobile text-[1.25rem] px-5 pt-[13px] pb-[13px] mb-[15px] nikeDesktop:hidden">${prds[0].extra.gender}</h1>
      <h1 class="nike-title-desktop text-[1.25rem] px-12 pt-[17px] pb-[30px] hidden nikeDesktop:block nikeDesktop:whitespace-nowrap">${prds[0].extra.gender} (${prds.length})</h1>
    `;
  } else if (prds[0].extra.gender === 'women' && genderQuery) {
    result = `
      <h1 class="nike-title-mobile text-[1.25rem] px-5 pt-[13px] pb-[13px] mb-[15px] nikeDesktop:hidden">${prds[0].extra.gender}</h1>
      <h1 class="nike-title-desktop text-[1.25rem] px-12 pt-[17px] pb-[30px] hidden nikeDesktop:block nikeDesktop:whitespace-nowrap">${prds[0].extra.gender} (${prds.length})</h1>
    `;
  } else if (prds[0].extra.gender === 'kids' && genderQuery) {
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

  if (prds[0].extra.gender === 'men' && genderQuery) {
    textNode = document.createTextNode(`men (${prds.length})`);
  } else if (prds[0].extra.gender === 'women' && genderQuery) {
    textNode = document.createTextNode(`women (${prds.length})`);
  } else if (prds[0].extra.gender === 'kids' && genderQuery) {
    textNode = document.createTextNode(`kids (${prds.length})`);
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

const data = await getData();
if (data?.ok) {
  // 쿼리 파라미터가 있으면 필터링, 없으면 전체 출력
  let filteredData = data.item;

  if (genderQuery === 'men') {
    filteredData = data.item.filter((item: Products) => item.extra?.gender === 'men');
  } else if (genderQuery === 'women') {
    filteredData = data.item.filter((item: Products) => item.extra?.gender === 'women');
  } else if (genderQuery === 'kids') {
    filteredData = data.item.filter((item: Products) => item.extra?.gender === 'kids');
  } else if (newQuery) {
    filteredData = data.item.filter((item: Products) => item.extra?.isNew === true);
  }
  console.log(filteredData);

  renderItemList(filteredData);
  renderTitle(filteredData);
  renderHiddenTitle(filteredData);
}

// 필터숨기기 누르면 필터영역 사라짐
const hiddenBtn = document.querySelector('.item-filter-hidden');

hiddenBtn?.addEventListener('click', function () {
  const categoryWrapper = document.querySelector('.category-wrapper');
  const nikeTitle = document.querySelector('.nike-title');
  const hiddenTitle = document.querySelector('.hidden-desktop-title');

  categoryWrapper?.classList.toggle('hidden');
  nikeTitle?.classList.toggle('hidden');
  hiddenTitle?.classList.toggle('hidden');
});
