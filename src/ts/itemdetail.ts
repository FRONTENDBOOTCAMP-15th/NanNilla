import type { Products } from '../types/products';
import { getAxios } from '../utils/axios';
import type { ItemListRes } from '../types/response';

const params = new URLSearchParams(window.location.search);
const newQuery = params.get('extra.isNew');
const categoryQuery = params.get('extra.category.0');
const IdQuery = params.get('_id');

console.log('name 파라미터:', newQuery);
console.log('category 파라미터:', categoryQuery);
console.log('현재 URL:', window.location.href);
console.log('Id값 출력', IdQuery);

async function getData() {
  const axios = getAxios();
  try {
    // categoryQuery가 있으면 쿼리를 포함해서 요청
    let url = '/products';
    if (IdQuery) {
      url = `/products?extra.category.0=${encodeURIComponent(IdQuery)}`;
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

// 상품 이름, 가격, 이미지 출력
function render(prds: Products[]) {
  const result = prds?.map((prd) => {
    return `

    <main class="detail-main pt-20 flow-root">
      <h1 class=" h-8.75 ml-6 font-medium text-xl font-Noto">${prd?.name}</h1>
      <p class=" h-7 ml-6 font-medium font-Noto">${prd.name}</p>
      <div class="detail-price-info pt-3 ml-6 flex">
        <span class="inline-block h-7 mr-2 font-medium font-Noto">${prd.price}</span>
        <s class="inline-block h-7 mr-2 font-medium font-Noto text-nike-gray-medium">${prd.price}</s> 
        <span class="inline-block h-7 font-medium font-Noto text-nike-green">${prd.price}</span>
      </div>

    <figure class="detail-item-image pt-6">
       <a href="/src/pages/itemdetail?_id=${prd._id}"><img class="w-full" src="${prd.mainImages[0].path}" alt="${prd.name} 이미지" />
      </figure>
      <div class="detail-item-color pt-0.75 flex gap-2.5 overflow-x-auto">
        <img class="w-[125px] h-[125px]" src="${prd.mainImages[0].path}" alt="${prd.name}" />
        <img class="w-[125px] h-[125px]" src="${prd.mainImages[0].path}" alt="${prd.name}" />
        <img class="w-[125px] h-[125px]" src="${prd.mainImages[0].path}" alt="${prd.name}" />
      </div>

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
  let filteredData = data?.item;
  console.log('1', filteredData);
  console.log('2', IdQuery);
  if (IdQuery) {
    filteredData = data.item.filter((item: Products) => String(item._id) === IdQuery);
  }
  // else if (newQuery) {
  //   filteredData = data.item.filter((item: Products) => item.extra?.isNew === true);
  // }
  console.log('3', filteredData);

  render(filteredData);
}

// 제품 사이즈 출력
const axiosInstace = getAxios();
const container = document.querySelector('.container');

async function getDetailProduct() {
  try {
    const id = IdQuery;

    const { data } = await axiosInstace.get(`/products/${id}`);
    const { item } = data;

    console.log(item);

    const sizeList = item.extra.size;

    sizeList.map((data: number) => {
      const productSize = document.createElement('button');
      productSize.textContent = String(data);
      productSize.classList.add('w-[56.4px]', 'px-4', 'py-2', 'border', 'border-gray-300', 'rounded-md', 'text-sm', 'hover:bg-gray-100');

      container?.append(productSize);
    });
  } catch (err) {
    // 사이즈가 DB에 없을 때

    function noArray() {
      return `
<button class="w-[56.4px] px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100" type="button ">250</button>
        <button class="w-[56.4px] px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100" type="button">255</button>
        <button class="w-[56.4px] px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100" type="button">260</button>
        <button class="w-[56.4px] px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100" type="button">265</button>
        <button class="w-[56.4px] px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100" type="button">270</button>
        <button class="w-[56.4px] px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100" type="button">275</button>
        <button class="w-[56.4px] px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100" type="button">280</button>
        <button class="w-[56.4px] px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100" type="button">285</button>
        <button class="w-[56.4px] px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100" type="button">290</button>
        <button class="w-[56.4px] px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100" type="button">295</button>
        <button class="w-[56.4px] px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100" type="button">300</button>
        <button class="w-[56.4px] px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100" type="button">305</button>
        <button class="w-[56.4px] px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100" type="button">310</button>
    `;
    }
    const itemList = document.querySelector('.container');
    if (itemList) {
      itemList.innerHTML = noArray();
    }

    console.log('사이즈 배열 존재하지 않음', err);
    noArray();
  }
}

getDetailProduct();

// 장바구니에 상품 담는 기능
const addCartBtn = document.querySelector('.addCartBtn') as HTMLButtonElement;
console.log('버튼의 id 값', IdQuery);

addCartBtn.addEventListener('click', () => {
  localStorage.setItem('cart', IdQuery);
  alert('장바구니에 상품이 추가되었습니다');
});
