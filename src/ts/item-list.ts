import type { Products } from '../types/products';
import { getAxios } from '../utils/axios';
import type { ItemListRes } from '../types/response';

const params = new URLSearchParams(window.location.search);
const newQuery = params.get('extra.isNew');
const categoryQuery = params.get('extra.category.0');

console.log('name 파라미터:', newQuery);
console.log('category 파라미터:', categoryQuery);
console.log('현재 URL:', window.location.href);

async function getData() {
  const axios = getAxios();
  try {
    // categoryQuery가 있으면 쿼리를 포함해서 요청
    let url = '/products';
    if (categoryQuery) {
      url = `/products?extra.category.0=${encodeURIComponent(categoryQuery)}`;
    } else if (newQuery) {
      url = `/products?extra.isNew=${encodeURIComponent(newQuery)}`;
    }
    console.log('요청 URL:', url);
    const { data } = await axios.get<ItemListRes>(url);
    return data;
  } catch (err) {
    console.log(err);
  }
}

function render(prds: Products[]) {
  const result = prds.map((prd) => {
    return `
      <figure class="prod1 w-[calc((100%-6px)/2)] nikeDesktop:w-[calc((100%-24px)/3)] nikeDesktop:px-2">

            <a href="/src/pages/itemdetail?_id"><img src="${prd.mainImages[0].path}" alt="신발 이미지" /> </a>
            <figcaption>
              <a href="/">
                <p class="text-sm text-nike-red px-3 nikeDesktop:px-0">${prd.name}</p>
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

const data = await getData();
if (data?.ok) {
  // 쿼리 파라미터가 있으면 필터링, 없으면 전체 출력
  let filteredData = data.item;

  if (categoryQuery) {
    filteredData = data.item.filter((item: Products) => item.extra?.category?.includes(categoryQuery));
  } else if (newQuery) {
    filteredData = data.item.filter((item: Products) => item.extra?.isNew === true);
  }
  console.log(filteredData);

  render(filteredData);
}
