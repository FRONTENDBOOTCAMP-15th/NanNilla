import type { Products } from '../types/products';
import { getAxios } from '../utils/axios';
import type { ItemListRes, CategoryListRes } from '../types/response';

// URL 파라미터
const params = new URLSearchParams(window.location.search);
const newQuery = params.get('extra.isNew');
const saleQuery = params.get('extra.sale');
const firstItemQuery = params.get('extra.category.0'); // 대분류
const secondItemQuery = params.get('extra.category.1'); // 중분류
const thirdItemQuery = params.get('extra.category.2'); // 소분류
const currentQuery = (firstItemQuery || secondItemQuery || thirdItemQuery || newQuery || saleQuery) as string;
let currentKey = '';

let gender = '';
let category = '';
let parent = '';
let depth: number;
let sort: number;
const detailed: string[] = [];

for (const [key, value] of params) {
  if (value === currentQuery) {
    currentKey = key;
  }
}
// 카테고리데이터 가져오기
async function getCategoryData() {
  const axios = getAxios();
  const url = '/codes';
  try {
    const { data } = await axios.get<CategoryListRes>(url);
    console.log('카테고리 데이터', data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

const categoryData = (await getCategoryData()) as CategoryListRes;
if (categoryData?.ok) {
  console.log('카테고리데이터 flatten', categoryData.item.flatten);
  console.log('현재쿼리의 카테고리데이터', categoryData?.item?.flatten[currentQuery]);

  // 성별과 어떤용도이고 더 구체적인
  if (categoryData.item.flatten[currentQuery]?.depth === 2) {
    gender = categoryData?.item?.flatten[currentQuery]?.parent === 'PC01' ? '남성' : categoryData.item.flatten[currentQuery].parent === 'PC02' ? '여성' : '키즈';
    category = categoryData.item.flatten[currentQuery]?.value;
    depth = categoryData.item.flatten[currentQuery].depth;
    parent = categoryData.item.flatten[currentQuery].parent as string;
    Object.values(categoryData.item.flatten).forEach((item) => {
      if (item.parent === currentQuery) {
        detailed.push(item.value);
      }
    });
    console.log('parent', parent);
    console.log('gender', gender);
    console.log('category', category);
    console.log('depth', depth);
  }
  if (categoryData.item.flatten[currentQuery]?.depth === 3) {
    gender = categoryData.item.flatten[currentQuery].parent?.substring(2, 4) === '01' ? '남성' : categoryData.item.flatten[currentQuery].parent?.substring(2, 4) === '02' ? '여성' : '키즈';
    category = categoryData.item.flatten[categoryData.item.flatten[currentQuery].parent as string].value;
    Object.values(categoryData.item.flatten).forEach((item) => {
      //PC010203
      if (item.parent === currentQuery.substring(0, 6)) {
        detailed.push(item.value);
      }
    });
    depth = categoryData.item.flatten[currentQuery].depth;
    parent = categoryData.item.flatten[currentQuery].parent as string;
    sort = categoryData.item.flatten[currentQuery].sort;
    console.log('parent', parent);
    console.log('gender', gender);
    console.log('category', category);
    console.log('depth', depth);
    console.log('sort', sort);
    console.log('세부 카테고리', detailed);
  }
}

console.log('현재 URL:', window.location.href);

let url = '/products';
if (newQuery) {
  const urlParams = encodeURIComponent(`{"${currentKey}": ${newQuery}}`);
  url += `?custom=${urlParams}`;
} else if (saleQuery) {
  const urlParams = encodeURIComponent(`{"${currentKey}": ${saleQuery}}`);
  url += `?custom=${urlParams}`;
  console.log('asdsadasdsadasdasda', url);
} else if (currentQuery) {
  const urlParams = encodeURIComponent(`{"${currentKey}": "${currentQuery}"}`);
  url += `?custom=${urlParams}`;
}

// 데이터 가져오기
const data = await getData(url);
console.log(data);

// 가져온 데이터들을 화면에 출력
if (data?.ok) {
  console.log(data.item);
  renderItemList(data.item);
  renderTitle(data.item);
  renderTotalItem(data.item);
  renderFiliterList();
}

// 데이터 가져오기
async function getData(currentUrl: string) {
  const axios = getAxios();
  try {
    console.log('요청 서버 URL:', currentUrl);
    const { data } = await axios.get<ItemListRes>(currentUrl);
    console.log('상품 데이터', data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

// 상품 목록 랜더 함수
function renderItemList(prds: Products[]) {
  let result;

  if (prds.length === 0) {
    result = `
    <figure class="prod1 invisible w-[calc((100%-6px)/2)] bg-nike-white nikeDesktop:w-[calc((100%-24px)/3)] nikeDesktop:px-2">
        <p class="trash-data" href="/"><img src="/api/dbinit/team-nike/uploadFiles/AIR_MAX_C_01.png" alt="" /> </p>
        <figcaption>
          <p>
            <p class="text-sm text-nike-red px-3">trash-data</p>
          </p>
        </figcaption>
      </figure>
      `;
  } else {
    result = prds
      .map((prd) => {
        return `
      <figure class="prod1 w-[calc((100%-6px)/2)] nikeDesktop:w-[calc((100%-24px)/3)] nikeDesktop:px-2">
        <a href="/src/pages/itemdetail?_id=${prd._id}">
          <img class="aspect-[1/1.25] w-full" src="${prd.mainImages[0].path}" alt="${prd.name} ${category} 이미지" />
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
function renderFiliterList() {
  let result = ``;

  if (newQuery) {
    result = `
    <button class="text-nike-black text-[1rem] font-medium px-4 pb-3.5 nikeDesktop:ml-8 nikeDesktop:pb-[10.79px]"><a href="/src/pages/itemlist?extra.category.1=PC0102">남성 신발</a></button>
    <button class="text-nike-black text-[1rem] font-medium px-4 pb-3.5 nikeDesktop:ml-8 nikeDesktop:pb-[10.79px]"><a href="/src/pages/itemlist?extra.category.1=PC0201">여성 신발</a></button>
    <button class="text-nike-black text-[1rem] font-medium px-4 pb-3.5 nikeDesktop:ml-8 nikeDesktop:pb-[10.79px]"><a href="/src/pages/itemlist?extra.category.1=PC0301">키즈 신발</a></button>
    `;
  } else if (saleQuery) {
    result = `
    <button class="text-nike-black text-[1rem] font-medium px-4 pb-3.5 nikeDesktop:ml-8 nikeDesktop:pb-[10.79px]"><a href="/src/pages/itemlist?extra.category.1=PC0102">남성 신발</a></button>
    <button class="text-nike-black text-[1rem] font-medium px-4 pb-3.5 nikeDesktop:ml-8 nikeDesktop:pb-[10.79px]"><a href="/src/pages/itemlist?extra.category.1=PC0201">여성 신발</a></button>
    <button class="text-nike-black text-[1rem] font-medium px-4 pb-3.5 nikeDesktop:ml-8 nikeDesktop:pb-[10.79px]"><a href="/src/pages/itemlist?extra.category.1=PC0301">키즈 신발</a></button>
    `;
  } else if (depth === 3) {
    result = detailed.map((item, index) => `<button class="text-nike-black text-[1rem] font-medium px-4 pb-3.5 nikeDesktop:ml-8 nikeDesktop:pb-[10.79px]"><a href="/src/pages/itemlist?extra.category.2=${parent}${index + 1 >= 10 ? index + 1 : '0' + (index + 1)}">${item}</a></button>`).join('');
  } else if (depth === 2) {
    result = detailed.map((item, index) => `<button class="text-nike-black text-[1rem] font-medium px-4 pb-3.5 nikeDesktop:ml-8 nikeDesktop:pb-[10.79px]"><a href="/src/pages/itemlist?extra.category.2=${currentQuery}${index + 1 >= 10 ? index + 1 : '0' + (index + 1)}">${item}</a></button>`).join('');
  }
  const subWrapper = document.querySelector('.sub-categoty-wrapper');
  if (subWrapper) {
    subWrapper.innerHTML = result;
  }
}

// 대제목 랜더 함수
function renderTitle(prds: Products[]) {
  const h1MobileEl = document.createElement('h1');
  const h1DesktopEl = document.createElement('h1');

  if (newQuery === 'true') {
    h1MobileEl.textContent = `신제품`;
    h1DesktopEl.textContent = `신제품(${prds.length})`;
    console.log(h1DesktopEl.textContent);
  } else if (saleQuery === 'true') {
    h1MobileEl.textContent = `세일상품`;
    h1DesktopEl.textContent = `세일상품(${prds.length})`;
    console.log(h1DesktopEl.textContent);
  } else if (depth === 2) {
    h1MobileEl.textContent = `${gender} ${category}`;
    h1DesktopEl.textContent = `${gender} ${category}(${prds.length})`;
    console.log(h1DesktopEl.textContent);
  } else if (depth === 3) {
    h1MobileEl.textContent = `${gender} ${detailed[sort - 1]} ${category === '신발' ? ` ${category}` : ''}`;
    h1DesktopEl.textContent = `${gender} ${detailed[sort - 1]}${category === '신발' ? ` ${category}` : ''}(${prds.length})`;
    console.log(h1DesktopEl.textContent);
  }

  h1MobileEl.classList.add('nike-title-mobile', 'text-[1.25rem]', 'px-5', 'pt-[13px]', 'pb-[13px]', 'mb-[15px]', 'nikeDesktop:hidden');
  h1DesktopEl.classList.add('nike-title-desktop', 'text-[1.25rem]', 'px-12', 'pt-[17px]', 'pb-[30px]', 'hidden', 'nikeDesktop:block', 'nikeDesktop:whitespace-nowrap');

  const nikeTitle = document.querySelector('.nike-title');
  if (nikeTitle!.firstElementChild?.tagName === 'H1') {
    // 이미 h1태그가 있다면 텍스트만 바꾸기
    const alreadyH1 = document.querySelector('.nike-title-desktop');
    if (depth === 2) {
      alreadyH1!.textContent = `${gender} ${category}(${prds.length})`;
    } else if (depth === 3) {
      alreadyH1!.textContent = `${gender} ${detailed[sort - 1]}${category === '신발' ? ` ${category}` : ''}(${prds.length})`;
    }
  } else if (nikeTitle) {
    // h1태그가 없으면 넣기
    nikeTitle.insertBefore(h1MobileEl, nikeTitle.firstElementChild);
    nikeTitle.insertBefore(h1DesktopEl, nikeTitle.firstElementChild);
  }
}

// 모바일 일때 상품 전체개수를 나타내기위한 랜더함수
function renderTotalItem(prds: Products[]) {
  const result = `${prds.length}개의 결과`;

  const totalItem = document.querySelector('.total-item');
  if (totalItem) {
    totalItem.textContent = result;
  }
}

// 데스크탑에서 사이드바 닫힘 기능(성별, 키즈, 키즈연령, 가격대)
function setupToggle(sideSelector: string, wrapperSelector: string) {
  const side = document.querySelector(sideSelector);
  if (!side) return;

  side.addEventListener('click', () => {
    const wrapper = document.querySelector(wrapperSelector);
    const img = side.querySelector('img');

    wrapper?.classList.toggle('hidden');

    if (img) {
      const isUp = img.getAttribute('src') === '/assets/icon24px/icon-up.svg';
      img.setAttribute('src', isUp ? '/assets/icon24px/icon-down.svg' : '/assets/icon24px/icon-up.svg');
    }
  });
}

setupToggle('.gender', '.checkbox-gender-wrapper');
setupToggle('.is-kid', '.checkbox-kids-wrapper');
setupToggle('.kid-age', '.checkbox-kids-age-wrapper');
setupToggle('.price-range', '.checkbox-price-wrapper');

// 필터 숨기기
const hiddenBtn = document.querySelector('.item-filter-hidden');

hiddenBtn?.addEventListener('click', () => {
  const categoryWrapper = document.querySelector('.category-wrapper');
  const hiddenTitle = document.querySelector('.hidden-desktop-title');
  const itemList = document.querySelector('.item-list-wrapper');
  itemList?.classList.toggle('ml-3');

  hiddenBtn.classList.toggle('open');

  const isHidden = hiddenBtn.textContent === '필터 숨기기';
  hiddenBtn.innerHTML = isHidden ? `필터 표시<img src="/assets/icon24px/icon-filter.svg" alt="필터이미지" />` : `필터 숨기기<img src="/assets/icon24px/icon-filter.svg" alt="필터이미지" />`;

  categoryWrapper?.classList.toggle('nikeDesktop:hidden');
  hiddenTitle?.classList.toggle('hidden');
});

// 정렬 버튼
const sortBtn = document.querySelector('.item-filter-sort') as HTMLElement;
const recommendBtn = document.querySelector('.recommend-sort'); // 추천순
const recentBtn = document.querySelector('.recent-sort'); // 최신순
const priceHighBtn = document.querySelector('.price-high-sort'); // 가격높은순
const priceLowBtn = document.querySelector('.price-low-sort'); // 가격낮은순
const sortBtnImage = document.querySelector('.sort-btn-image'); //정렬필터이미지
const sortText = document.querySelector('.sort-text') as HTMLElement;

// 데스크탑에서 정렬기준 누르면 정렬기준들이 나오고 이미지도 위아래로 토글
sortBtn?.addEventListener('click', () => {
  [recommendBtn, recentBtn, priceHighBtn, priceLowBtn].forEach((btn) => btn?.classList.toggle('hidden'));
  sortBtnImage?.setAttribute('src', sortBtnImage?.getAttribute('src') === '/assets/icon24px/icon-down.svg' ? '/assets/icon24px/icon-up.svg' : '/assets/icon24px/icon-down.svg');
});

// 공통 정렬 함수 :
async function handleSort(sortUrl: string, label: string) {
  console.log('sortUrl: ', sortUrl);

  // 정렬할 데이터 가지옴
  const sortUrlData = await getData(sortUrl);

  // 정렬할 데이터들을 화면에 재구성
  if (sortUrlData?.ok) {
    console.log('sortUrlData', sortUrlData.item);

    renderItemList(sortUrlData.item);
    renderTitle(sortUrlData.item);
    renderTotalItem(sortUrlData.item);
    renderFiliterList();
  }

  // 정렬하면 열렸던 정렬기준들이 숨겨짐
  [recommendBtn, recentBtn, priceHighBtn, priceLowBtn].forEach((btn) => btn?.classList.add('hidden'));

  // 정렬한 4가지중 하나를 정렬기준에다가 적음
  if (label) {
    sortText.textContent = `정렬기준:${label}`;
    sortBtnImage?.setAttribute('src', '/assets/icon24px/icon-down.svg'); // 이미지토글
  }
}

// 각 정렬 버튼에 대한 이벤트
priceHighBtn?.addEventListener('click', () => handleSort(url + `&sort={"price":-1}`, '높은 가격순'));
priceLowBtn?.addEventListener('click', () => handleSort(url + `&sort={"price":1}`, '낮은 가격순'));
recentBtn?.addEventListener('click', () => handleSort(url + `&sort={"createdAt":-1}`, '최신순'));
recommendBtn?.addEventListener('click', () => handleSort(url + `&sort={"extra.isNew":-1,"extra.isBest":-1}`, '추천순'));

// 모바일 필터 버튼
const mobileFilterBtn = document.querySelector('.item-filter'); // 모바일 필터 버튼
const mobileFilterModal = document.querySelector('.mobile-filter-wrapper');
const mobileFilterExit = document.querySelector('.mobile-filter-exit'); // 모바일 필터 나가기 버튼
const mobileFilterApply = document.querySelector('.mobile-filter-apply'); // 모바일 필터 적용 버튼

// 모바일 필터에서 필터 버튼누르면 모달이 나오게함
mobileFilterBtn?.addEventListener('click', function () {
  mobileFilterModal?.classList.toggle('hidden');
  document.body.style.overflow = 'hidden'; // 모달이 열렸을때 body 스크롤 잠굼
});

// 모바일 필터에서 닫기 버튼이나 적용 누르면 모달 끔
mobileFilterExit?.addEventListener('click', function () {
  mobileFilterModal?.classList.toggle('hidden');
  document.body.style.overflow = ''; // 모달이 열렸을때 body 스크롤 해제
});

let selectedPriceId = ''; // 선택된 가격대 저장

// 모바일에서 필터 기능
mobileFilterApply?.addEventListener('click', function () {
  // 선택된 정렬 옵션 가져오기
  const selectedSort = document.querySelector('input[name="mobile-sort"]:checked') as HTMLInputElement;
  const mobilePrice0To50 = document.querySelector('input[id="mobile-price-0-50"]:checked') as HTMLInputElement;
  const mobilePrice50To100 = document.querySelector('input[id="mobile-price-50-100"]:checked') as HTMLInputElement;
  const mobilePrice100To150 = document.querySelector('input[id="mobile-price-100-150"]:checked') as HTMLInputElement;
  const mobilePrice150To200 = document.querySelector('input[id="mobile-price-150-200"]:checked') as HTMLInputElement;
  const mobilePrice200Plus = document.querySelector('input[id="mobile-price-200-plus"]:checked') as HTMLInputElement;
  let sortUrl = '';
  let sortLabel = '';
  const queryArray = []; // 쿼리를 담을 곳

  if (mobilePrice0To50) {
    queryArray.push({ price: { $gte: 0 } });
    queryArray.push({ price: { $lte: 50000 } });
    selectedPriceId = 'desktop-price-0-50';
  }
  if (mobilePrice50To100) {
    queryArray.push({ price: { $gte: 50000 } });
    queryArray.push({ price: { $lte: 100000 } });
    selectedPriceId = 'desktop-price-50-100';
  }
  if (mobilePrice100To150) {
    queryArray.push({ price: { $gte: 100000 } });
    queryArray.push({ price: { $lte: 150000 } });
    selectedPriceId = 'desktop-price-100-150';
  }
  if (mobilePrice150To200) {
    queryArray.push({ price: { $gte: 150000 } });
    queryArray.push({ price: { $lte: 200000 } });
    selectedPriceId = 'desktop-price-150-200';
  }
  if (mobilePrice200Plus) {
    queryArray.push({ price: { $gte: 200000 } });
    selectedPriceId = 'desktop-price-200-plus';
  }

  {
    if (depth === 2) {
      queryArray.push({ 'extra.category.1': currentQuery });
    }
    if (depth === 3) {
      queryArray.push({ 'extra.category.2': currentQuery });
    }
    // 만드는 JSON 구조 = {"$and":[ ... ]}
    const customObj = { $and: queryArray };

    // custom 파라미터 값만 인코딩
    const encoded = encodeURIComponent(JSON.stringify(customObj));

    sortUrl = `/products?custom=${encoded}`;
  }

  if (selectedSort && sortUrl) {
    // 모바일에서 가격대별이랑 정렬 동시
    const sortId = selectedSort.id;

    if (sortId === 'mobile-recommend-sort') {
      sortUrl += `&sort={"extra.isNew":-1,"extra.isBest":-1}`;
      sortLabel = '추천순';
    } else if (sortId === 'mobile-recent-sort') {
      sortUrl += `&sort={"createdAt":-1}`;
      sortLabel = '최신순';
    } else if (sortId === 'mobile-price-high-sort') {
      sortUrl += `&sort={"price":-1}`;
      sortLabel = '높은 가격순';
    } else if (sortId === 'mobile-price-low-sort') {
      sortUrl += `&sort={"price":1}`;
      sortLabel = '낮은 가격순';
    }
  } else if (!selectedSort && sortUrl) {
    //가격대별만
  } else {
    // 정렬만
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
  }

  // 정렬 적용
  if (sortUrl) {
    handleSort(sortUrl, sortLabel).then(() => {
      // 렌더링 완료 후 데스크톱 라디오 버튼 체크: 연동느낌을 주기위해
      if (selectedPriceId) {
        const desktopRadio = document.querySelector(`input[id="${selectedPriceId}"]`) as HTMLInputElement;
        if (desktopRadio) {
          desktopRadio.checked = true;
        }
      }
    });
  }

  mobileFilterModal?.classList.toggle('hidden'); // 모바일 적용 버튼 누르면 모바일 필터 닫힘
  document.body.style.overflow = ''; // 모달이 닫히면 body 스크롤 해제
});

// 데스크탑에서 가격대 필터링 버튼들
const desktopPrice0To50 = document.querySelector('input[id="desktop-price-0-50"]') as HTMLInputElement;
const desktopPrice50To100 = document.querySelector('input[id="desktop-price-50-100"]') as HTMLInputElement;
const desktopPrice100To150 = document.querySelector('input[id="desktop-price-100-150"]') as HTMLInputElement;
const desktopPrice150To200 = document.querySelector('input[id="desktop-price-150-200"]') as HTMLInputElement;
const desktopPrice200Plus = document.querySelector('input[id="desktop-price-200-plus"]') as HTMLInputElement;

// 공통 가격 필터 함수 생성
function handleDesktopPriceFilter(minPrice: number, maxPrice: number | null, mobileId: string, clickedButton: HTMLInputElement) {
  clickedButton.checked = true;

  const queryArray = [];
  let sortUrl = '';
  const sortLabel = '';

  queryArray.push({ price: { $gte: minPrice } });
  if (maxPrice !== null) {
    queryArray.push({ price: { $lte: maxPrice } });
  }

  selectedPriceId = mobileId;

  if (depth === 2) {
    queryArray.push({ 'extra.category.1': currentQuery });
  }
  if (depth === 3) {
    queryArray.push({ 'extra.category.2': currentQuery });
  }

  const customObj = { $and: queryArray };
  const encoded = encodeURIComponent(JSON.stringify(customObj));
  sortUrl = `/products?custom=${encoded}`;

  if (sortUrl) {
    // 가격대필터링 시작
    console.log('sortUrl ', sortUrl);

    handleSort(sortUrl, sortLabel);

    // 모바일 라디오 버튼 동기화
    const mobileRadio = document.querySelector(`input[id="${selectedPriceId}"]`) as HTMLInputElement;
    if (mobileRadio) {
      mobileRadio.checked = true;
    }
  }
}

// 각 데스크톱 라디오 버튼에 이벤트 리스너 연결
desktopPrice0To50?.addEventListener('click', function () {
  handleDesktopPriceFilter(0, 50000, 'mobile-price-0-50', desktopPrice0To50);
});

desktopPrice50To100?.addEventListener('click', function () {
  handleDesktopPriceFilter(50000, 100000, 'mobile-price-50-100', desktopPrice50To100);
});

desktopPrice100To150?.addEventListener('click', function () {
  handleDesktopPriceFilter(100000, 150000, 'mobile-price-100-150', desktopPrice100To150);
});

desktopPrice150To200?.addEventListener('click', function () {
  handleDesktopPriceFilter(150000, 200000, 'mobile-price-150-200', desktopPrice150To200);
});

desktopPrice200Plus?.addEventListener('click', function () {
  handleDesktopPriceFilter(200000, null, 'mobile-price-200-plus', desktopPrice200Plus);
});

// 브레이크포인트에서 필터바 위치 변경

const filterBar = document.querySelector('.filter-bar'); // 필터바
const sectionEl = document.querySelector('.section-aside-wrapper'); // 데스크탑 배치 위치
const nikeTitle = document.querySelector('.nike-title'); // 모바일 배치 위치

function moveFilterBar() {
  if (!filterBar || !sectionEl || !nikeTitle) return;

  if (window.innerWidth <= 960) {
    sectionEl?.insertBefore(filterBar, sectionEl.lastElementChild);
  } else {
    nikeTitle?.appendChild(filterBar);
  }
}
moveFilterBar();
window.addEventListener('resize', moveFilterBar);
