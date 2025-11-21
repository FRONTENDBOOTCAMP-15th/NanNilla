import type { Products } from '../types/products';
import { getAxios } from '../utils/axios';
import type { ItemListRes } from '../types/response';
import type { CartItem } from './cart';

const params = new URLSearchParams(window.location.search);
// 현재 웹 페이지 URL에서 쿼리문자열을 가져와 params에 저장
const newQuery = params.get('extra.isNew');

const IdQuery: string | null = params.get('_id');
// params 객체에서 id라는 키에 해당하는 값을 가져와서 IDQuery에 저장

async function getData() {
  // 비동기 함수로 getData 선언
  const axios = getAxios();
  // getAxios 함수를 import 하여 axios라 선언
  try {
    let url = '/products';
    // url 변수를 '/products' 로 초기화
    if (IdQuery) {
      // IDQuery에 값이 있는 경우
      url = `/products?extra.category.0=${encodeURIComponent(IdQuery)}`; // url이 해당 값으로 변경
    } else if (newQuery) {
      // IDQuery 가 없지만 newQuery에 값이 있는 경우
      url = `/products?extra.isNew=${encodeURIComponent(newQuery)}`; // url 이 해당 값으로 변경
    }
    const { data } = await axios.get<ItemListRes>(url);
    // axios를 사용해 위에서 결정된 url로 GET요청 보냄 . await 있으므로 서버 응답 올 때까지 기다림
    return data;
    // 서버로부터 받은 ItemListRes를 함수를 호출한 곳으로 반환
  } catch (err) {
    console.log(err);
  }
}

const itemWrapper = document.querySelector('.item-entire-wrapper'); // item-entire-wrapper 찾기
const itemList = document.querySelector('.item-list-wrapper') as HTMLElement; // item-list-wrapper 찾기
const productInfo = document.querySelector('.product-info') as HTMLElement; // productInfo  찾기
const figureTag = document.createElement('figure'); // figure 태그 생성

let selectedProduct = {}; // selectedProduct를 빈 객체로 선언

const productName = document.createElement('div'); // div 태그 생성
productName.classList.add('productname'); // productname 라고 클래스명 짓기

const mainTag = document.createElement('main'); // main 태그 생성
const h1Tag = document.createElement('h1'); // h1 태그 생성
const pTag = document.createElement('p'); // p 태그 생성
const div1Tag = document.createElement('div'); // div 태그 생성

productName?.appendChild(mainTag); // <div class="productName"><main></main></div>
productName?.appendChild(h1Tag); // <div class="productName"><main><h1></h1></main></div>
productName?.appendChild(pTag); //<div class="productName"><main><h1><p></p></h1></main></div>
productName?.appendChild(div1Tag); //<div class="productName"><main><h1><p><div></div></p></h1></main></div>

///-------------------------반응형을 위한 div 묶기----------------------------/////
if (window.innerWidth <= 960) {
  itemWrapper?.appendChild(productName); // 브레이크 포인트보다 뷰포트가 작을때 <div><div class="productName"><main><h1><p><div></div></p></h1></main></div></div>
} else {
  productInfo?.appendChild(productName); // 브레이크 포인트보다 뷰포트가 클 때 <div><div class="productName"><main><h1><p><div></div></p></h1></main></div></div>
}

if (window.innerWidth >= 960) {
  itemWrapper?.appendChild(figureTag); // 브레이크 포인트보다 뷰포트가 작을때 <div ><figure></figure></div>
}
itemWrapper?.appendChild(itemList); // 브레이크 포인트보다 뷰포트가 클 때 <div class="item-list-wrapper "><figure></figure></div>
///-------------------------반응형을 위한 div 묶기----------------------------/////

// 상품 이름, 가격, 이미지 출력
function render(prds: Products[]) {
  const div2Tag = document.createElement('div'); // div 태그 생성
  div2Tag.classList.add('detail-item-color', 'pt-0.75', 'flex', 'gap-2.5', 'overflow-x-auto');
  console.log(prds);
  prds?.map((prd) => {
    figureTag.classList.add('min-w-[360px]', 'detail-item-image', 'overflow-x-auto', 'pt-6', 'justify-center', 'items-center');

    ///-------------------------메인 이미지----------------------------/////

    const imgTag = document.createElement('img'); // img 태그 생성 ( 메인 이미지)
    imgTag.classList.add('nikeDesktop:w-[400px]', 'nikeDesktop:h-[400px]', 'nikeDesktop:object-cover');
    if (prd.mainImages && prd.mainImages.length > 0) {
      // 만일 데이터에 mainImages속성이 존재하고 유효한 이미지 데이터 또한 존재한다면
      imgTag.src = prd.mainImages[0].path;
      // 생성되는 이미지 태그의 src는 그 배열의 첫번째 인덱스의 path로 한다. (메인 이미지)
    }
    imgTag.alt = prd.name + '이미지';
    // 대체 이미지는 prd.name + 이미지로 한다
    figureTag.appendChild(imgTag);
    // <figure><img src="prd.mainImages[0].path;" alt ="prd.name + 이미지"></figure>
    const colorList = document.createElement('div');
    // div 태그 생성 하고 colorList라고 한다
    colorList.classList.add('min-h-[150px]', 'flex', 'overflow-x-auto', 'nikeDesktop:w-[376px]', 'flex-shrink-0', 'nikeDesktop:min-h-[70px]', 'nikeDesktop:pt-[32px]', 'nikeDesktop:pl-6');
    // 스타일 추가
    ///-------------------------메인 이미지----------------------------/////

    ///-------------------------상세 이미지 및 다른 색상 이미지 출력----------------------------/////

    // 색상 버튼 생성 루프
    prd.mainImages.map((image, index) => {
      const itemColorButton = document.createElement('button') as HTMLButtonElement;
      // button 태그 생성
      const itemImage = document.createElement('img') as HTMLImageElement;
      // img 태그 생성 - 아래의 작은 상세 이미지들
      ///-------------------------상세 이미지 및 다른 색상 이미지 출력----------------------------/////

      // 버튼 스타일 설정
      itemColorButton.classList.add(
        'itemColorButton',
        'w-[125px]', // 버튼 크기 고정
        'h-[125px]',
        'nikeDesktop:w-[70px]',
        'nikeDesktop:h-[70px]',
        'flex-shrink-0',
        'cursor-pointer',
        'p-0',
        'overflow-hidden',
        'border-2', // [수정] 테두리 두께 2px (항상 존재)
        'box-border' // [수정] 테두리를 포함한 크기 계산
      );

      // 이미지 스타일 설정
      itemImage.classList.add('w-full', 'h-full', 'object-cover', 'block', 'nikeDesktop:w-[70px]', 'nikeDesktop:h-[70px]');
      itemImage.src = image.path;
      itemImage.alt = `${prd.name} - ${image.name}`;

      ///-------------------------색상 선택 시 테두리 나타나는 기능 ----------------------------/////

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
        const allButtons = productInfo.querySelectorAll('.itemColorButton');
        allButtons.forEach((btn) => {
          btn.classList.remove('border-black');
          btn.classList.add('border-transparent');
        });

        //  클릭된 버튼만 검은 테두리 적용
        itemColorButton.classList.remove('border-transparent');
        itemColorButton.classList.add('border-black');

        console.log('선택된 상품:', selectedProduct);
        ///-------------------------색상 선택 시 테두리 나타나는 기능 ----------------------------/////
      });

      itemColorButton.appendChild(itemImage);
      // 버튼 태그 안에 상세이미지 태그 넣기 ( 누르면 선택 할 수 있도록)

      colorList?.appendChild(itemColorButton);
      // 그 버튼를 colorList div로 묶기
    });
    productInfo?.appendChild(colorList);
    // productInfo 안에 colorList div 집어넣기

    mainTag.classList.add('detail-main', 'flow-root');
    // mainTag 스타일 추가

    h1Tag.classList.add('h-8.75', 'ml-6', 'font-medium', 'text-xl', 'font-Noto');
    h1Tag.textContent = prd.name;
    // <h1>prd.name</h1>

    // 성별 카테고리에 따라 pTag 렌더링 다르게 하기
    pTag.classList.add('h-7', 'ml-6', 'font-medium', 'font-Noto');
    if (prds[0].extra.gender === 'men') {
      pTag.textContent = '남성 신발';
    } else if (prd.extra.gender === 'women') {
      pTag.textContent = '여성 신발';
    } else if (prd.extra.gender === 'kids') {
      pTag.textContent = '키즈 신발';
    }

    // pTag.textContent = prd.extra.gender;
    //<p>prd.extar.gender</p>

    div1Tag.classList.add('detail-price-info', 'pt-3', 'ml-6', 'flex');
    // div1Tag에 detail-price-info 클래스 추가 및 디자인 추가
    const span1Tag = document.createElement('span');
    // span 태그 생성
    span1Tag.classList.add('inline-block', 'h-7', 'mr-2', 'font-medium', 'font-Noto');
    span1Tag.textContent = String(prd.price.toLocaleString()) + '원';
    // 디자인 추가하고 <span>prd.price.toLocaleString()</span>

    const sTag = document.createElement('s');
    // s 태그 생성
    sTag.classList.add('inline-block', 'h-7', 'mr-2', 'font-medium', 'font-Noto', 'text-nike-gray-medium');
    sTag.textContent = `${Math.round(prd.price / 0.9).toLocaleString()}원`;
    // <s>prd.price.toLocaleString()</s>

    const span2Tag = document.createElement('span');
    // span 태그 생성
    span2Tag.classList.add('inline-block', 'h-7', 'font-medium', 'font-Noto', 'text-nike-green');
    span2Tag.textContent = '10% 할인';
    // <span>prd.price.toLocaleString()</span>

    div1Tag.appendChild(span1Tag);
    // <div class="productName"><main><h1><p><div><span></span></div></p></h1></main></div>
    div1Tag.appendChild(sTag);
    // <div class="productName"><main><h1><p><div><span><s></s></span></div></p></h1></main></div>
    div1Tag.appendChild(span2Tag);
    // <div class="productName"><main><h1><p><div><span><s><span></span></s></span></div></p></h1></main></div>
    if (window.innerWidth <= 960) {
      itemList?.appendChild(figureTag); // 위에서 미리 만든 figureTag 추가
    }
    //<div class="item-list-wrapper"><figure><img src="prd.mainImages[0].path;" alt ="prd.name + 이미지"></figure></div>
    itemList?.appendChild(div2Tag);
    //<div class="item-list-wrapper"><figure><img src="prd.mainImages[0].path;" alt ="prd.name + 이미지"><div><div></figure></div>
  });
}

const data = await getData();

// getData를 호출하고 응답이 올 때까지 기다린다
let filteredData: Products[] = [];
// filteredData를 선언하고 빈 배열로 초기화한다

if (data?.ok) {
  // 유효성 검사 : 응답 객체 data가 존재하고 데이터가 성공적으로 로드 될 경우 내부 로직 실행
  filteredData = data?.item; // data.item을 filteredData에 할당, IDQuery 가 없다면 data.item 전체가 화면에 렌더링될 데이터
  if (IdQuery) {
    // 변수에 값이 존재할 때만 추가 필터링 실행
    filteredData = data.item.filter((item: Products) => String(item._id) === IdQuery);
  } // 결과적으로 URL 파라미터로 지정된 특정 ID와 일치하는 상품만 남게됨
  render(filteredData);
}
///-------------------------제품 사이즈 출력 ----------------------------/////

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
    // 타입에러 발생 - catch 문으로 빠져나가서 하드코딩 렌더링 되게
    // 사이즈가 DB에 없을 때 - 하드코딩
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

///-------------------------제품 사이즈 출력 ----------------------------/////

const detailSummaries = document.querySelectorAll('.detail-info-summary');

detailSummaries.forEach((summaryElement) => {
  summaryElement.addEventListener('click', () => {
    if (summaryElement.classList.contains('border-b-2')) {
      //제품 상세 클릭 시 border-b 없어지도록 하기
      summaryElement.classList.remove('border-b-2', 'border-nike-gray-lighter');
    } else {
      //제품 상세 재 클릭 시 border-b 나타나도록 하기
      summaryElement.classList.add('border-b-2', 'border-nike-gray-lighter');
    }
  });
});

///-------------------------제품 사이즈 선택 - 장바구니 연동 ----------------------------/////

// 사이즈 선택
container?.addEventListener('click', (event) => {
  const btn = event.target as HTMLElement;
  if (btn.tagName === 'BUTTON') {
    selectedSize = btn.textContent || null;
    console.log('선택된 사이즈:', selectedSize);
  }
});

const addCartBtn = document.querySelector('.addCartBtn') as HTMLButtonElement;

addCartBtn?.addEventListener('click', async () => {
  if (!IdQuery) return alert('상품 정보를 불러오지 못했어요...');
  if (!selectedSize) return alert('사이즈가 선택되지 않았습니다.');

  const productElement = filteredData[0];
  if (!productElement) return;

  const token = localStorage.getItem('accessToken');

  // 로그인 후
  if (token) {
    try {
      await axiosInstace.post(
        '/carts',
        {
          product_id: productElement._id,
          quantity: 1,
          size: selectedSize,
          color: '',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('장바구니에 담겼습니다.');
      window.location.href = '/src/pages/cart.html';
      return; // 로컬 스토리지로 내려가지 않도록
    } catch (err) {
      console.error('서버 장바구니 추가 실패:', err);
      return;
    }
  }

  // 비회원 로컬스토리지 장바구니
  const product: CartItem = {
    id: productElement._id,
    name: productElement.name,
    price: productElement.price,
    size: selectedSize,
    image: productElement.mainImages[0].path,
    quantity: 1,
    category: productElement.extra.category[0] || '',
    gender: productElement.extra.gender,
    styleNo: String(productElement._id),
  };

  // 기존 장바구니 가져오기
  const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  console.log(cart);
  const cartitem = Array.isArray(cart) ? cart : [cart];
  console.log(cartitem);
  // 같은 상품 + 같은 사이즈인지 체크
  const exist = cartitem.find((item) => item.id === product.id && item.size === product.size && item.category === product.category && item.gender === product.gender && item.styleNo === product.styleNo);

  if (exist) {
    exist.quantity = (exist.quantity || 0) + 1;
  } else {
    cartitem.push(product);
  }

  // 저장
  localStorage.setItem('cart', JSON.stringify(cartitem));

  alert('장바구니에 담겼습니다.');
  window.location.href = '/src/pages/cart.html';
});

getData();
///-------------------------제품 사이즈 선택 - 장바구니 연동 ----------------------------/////

///-------------------------추천 제품 기능 구현----------------------------------------////

// 랜더 함수

function renderPreference(prds) {
  let result = prds;
  console.log(result);

  const newConst = [...result.item].sort(() => 0.5 - Math.random()).slice(0, 8);
  console.log(newConst);
  result = newConst
    .map((prd: Products) => {
      try {
        if (prd.extra.gender === 'men') {
          prd.extra.gender = '남성 신발';
        } else if (prds.extra.gender === 'women') {
          prd.extra.gender = '여성 신발';
        } else if (prds.extra.gender === 'kids') {
          prd.extra.gender = '키즈 신발';
        }
      } catch (err) {
        prd.extra.gender = '　';
        console.log(err);
      }
      const priceText = `${prd.price.toLocaleString()}원`;

      return `

        <div class="prefer-items pl-6  flex gap-3  nikeDesktop:flex nikeDesktop:gap-3 nikeDesktop:min-w-[566.94px]">
          <article class="min-w-[196px] min-h-[196px] nikeDesktop:min-w-[566.94px]">
            <figure class="pt-3 nikeDesktop:min-w-[566.94px]">
              <img class="nikeDesktop:min-w-[566.94px] nikeDesktop:h-[566.94px] w-[196px] h-[196px]" src="${prd.mainImages[0].path}" alt="${prd.name} 이미지" />
            </figure>
            <div class="pt-[11.75px] pb-[11.75px]">
              <h3 class="font-Noto text-sm font-medium">${prd.name}</h3>
              <p class="font-Noto text-sm text-nike-gray-dark">${prd?.extra.gender || '　'}</p>
            </div>
            <p class="pb-[49px]">${priceText}
          </article>
        </div>

  `;
    })
    .join('');

  const preferList = document.querySelector('.preference-wrapper');
  if (preferList) {
    preferList.innerHTML = result;
  }
}
renderPreference(data);

///-------------------------추천 제품 기능 구현----------------------------------------////
