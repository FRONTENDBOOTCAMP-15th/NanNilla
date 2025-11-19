import type { Products } from '../types/products';
import { getAxios } from '../utils/axios';
import type { ItemListRes } from '../types/response';

const params = new URLSearchParams(window.location.search);
const newQuery = params.get('extra.isNew');
const categoryQuery = params.get('extra.category.0');
const IdQuery: string | null = params.get('_id');

async function getData() {
  const axios = getAxios();
  try {
    let url = '/products';
    if (IdQuery) {
      url = `/products?extra.category.0=${encodeURIComponent(IdQuery)}`;
    } else if (newQuery) {
      url = `/products?extra.isNew=${encodeURIComponent(newQuery)}`;
    }
    const { data } = await axios.get<ItemListRes>(url);
    return data;
  } catch (err) {
    console.log(err);
  }
}

const itemList = document.querySelector('.item-list-wrapper');
let selectedProduct = {};

// 상품 이름, 가격, 이미지 출력
function render(prds: Products[]) {
  const div2Tag = document.createElement('div');
  div2Tag.classList.add('detail-item-color', 'pt-0.75', 'flex', 'gap-2.5', 'overflow-x-auto');

  prds?.map((prd) => {
    const figureTag = document.createElement('figure');
    figureTag.classList.add('min-w-[360px]', 'detail-item-image', 'overflow-x-auto', 'pt-6', 'justify-center', 'items-center');

    const imgTag = document.createElement('img');
    if (prd.mainImages && prd.mainImages.length > 0) {
      imgTag.src = prd.mainImages[0].path;
    }
    imgTag.alt = prd.name + '이미지';
    figureTag.appendChild(imgTag);

    // 색상 버튼 생성 루프
    prd.mainImages.map((image, index) => {
      const itemColorButton = document.createElement('button') as HTMLButtonElement;
      const itemImage = document.createElement('img') as HTMLImageElement;

      // 버튼 스타일 설정
      itemColorButton.classList.add(
        'itemColorButton',
        'w-[125px]', // 버튼 크기 고정
        'h-[125px]',
        'flex-shrink-0',
        'cursor-pointer',
        'p-0',
        'overflow-hidden',
        'border-2', // [수정] 테두리 두께 2px (항상 존재)
        'box-border' // [수정] 테두리를 포함한 크기 계산
      );

      // 이미지 스타일 설정
      itemImage.classList.add('w-full', 'h-full', 'object-cover', 'block');
      itemImage.src = image.path;
      itemImage.alt = `${prd.name} - ${image.name}`;

      // [초기 상태 설정]
      // 첫 번째는 검은 테두리, 나머지는 투명 테두리
      if (index === 0) {
        itemColorButton.classList.add('border-black');
        itemColorButton.classList.remove('border-transparent');
      } else {
        itemColorButton.classList.add('border-transparent'); // 안 보일 뿐 공간은 차지
        itemColorButton.classList.remove('border-black');
      }

      // [클릭 이벤트]
      itemColorButton.addEventListener('click', () => {
        // 메인 이미지 변경
        imgTag.src = image.path;
        selectedProduct = image;

        //  모든 버튼을 투명 테두리로 초기화
        const allButtons = div2Tag.querySelectorAll('.itemColorButton');
        allButtons.forEach((btn) => {
          btn.classList.remove('border-black');
          btn.classList.add('border-transparent');
        });

        //  클릭된 버튼만 검은 테두리 적용
        itemColorButton.classList.remove('border-transparent');
        itemColorButton.classList.add('border-black');

        console.log('선택된 상품:', selectedProduct);
      });

      itemColorButton.appendChild(itemImage);
      div2Tag.appendChild(itemColorButton);
    });

    const mainTag = document.createElement('main');
    mainTag.classList.add('detail-main', 'pt-20', 'flow-root');

    const h1Tag = document.createElement('h1');
    h1Tag.classList.add('h-8.75', 'ml-6', 'font-medium', 'text-xl', 'font-Noto');
    h1Tag.textContent = prd.name;

    const pTag = document.createElement('p');
    pTag.classList.add('h-7', 'ml-6', 'font-medium', 'font-Noto');
    pTag.textContent = prd.name;

    const div1Tag = document.createElement('div');
    div1Tag.classList.add('detail-price-info', 'pt-3', 'ml-6', 'flex');

    const span1Tag = document.createElement('span');
    span1Tag.classList.add('inline-block', 'h-7', 'mr-2', 'font-medium', 'font-Noto');
    span1Tag.textContent = String(prd.price);

    const sTag = document.createElement('s');
    sTag.classList.add('inline-block', 'h-7', 'mr-2', 'font-medium', 'font-Noto', 'text-nike-gray-medium');
    sTag.textContent = String(prd.price);

    const span2Tag = document.createElement('span');
    span2Tag.classList.add('inline-block', 'h-7', 'font-medium', 'font-Noto', 'text-nike-green');
    span2Tag.textContent = String(prd.price);

    div1Tag.appendChild(span1Tag);
    div1Tag.appendChild(sTag);
    div1Tag.appendChild(span2Tag);

    itemList?.appendChild(mainTag);
    itemList?.appendChild(h1Tag);
    itemList?.appendChild(pTag);
    itemList?.appendChild(div1Tag);
    itemList?.appendChild(figureTag); // 위에서 미리 만든 figureTag 추가

    itemList?.appendChild(div2Tag);
  });
}

const data = await getData();
if (data?.ok) {
  let filteredData = data?.item;
  if (IdQuery) {
    filteredData = data.item.filter((item: Products) => String(item._id) === IdQuery);
  }
  render(filteredData);
}
// 제품 사이즈 출력
const axiosInstace = getAxios();
const container = document.querySelector('.container');
export let selectedSize: string | null = null;
async function getSizeProduct() {
  try {
    const id = IdQuery;
    const { data } = await axiosInstace.get(`/products/${id}`);
    const { item } = data;

    const sizeList = item.extra.size;

    sizeList.forEach((sizeData: string) => {
      const productSize = document.createElement('button');
      productSize.id = String(sizeData);
      productSize.textContent = String(sizeData);

      // 초기 버튼 스타일
      productSize.classList.add('w-[56.4px]', 'px-4', 'py-2', 'border', 'border-gray-300', 'rounded-md', 'text-sm', 'hover:bg-gray-100');

      productSize.addEventListener('click', () => {
        selectedSize = sizeData; // 1. 값 업데이트

        // 모든 버튼 초기화
        const allButtons = container?.querySelectorAll('button');
        allButtons?.forEach((btn) => {
          btn.classList.remove('border-black', 'font-bold');
          btn.classList.add('border-gray-300');
        });

        //  현재 버튼 활성화
        productSize.classList.add('border-black', 'font-bold');
        productSize.classList.remove('border-gray-300');

        console.log(selectedSize); // 선택된 값 확인 (클릭 시마다 실행)
      });

      // 버튼을 컨테이너에 추가
      container?.append(productSize);
    }); //
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
getSizeProduct();

// 비회원 일때 로컬스토리지에 상품 담는 기능 ( 장바구니 )
const addCartBtn = document.querySelector('.addCartBtn') as HTMLButtonElement;
console.log('버튼의 id 값', IdQuery);
addCartBtn.addEventListener('click', () => {
  localStorage.setItem('cart', IdQuery);
  alert('장바구니에 상품이 추가되었습니다');
});
// 로그인 할 때 로컬스토리지를의 데이터를 DB로 병합하고 로컬스토리지 삭제
// 로그인 후
