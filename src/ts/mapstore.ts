/// <reference types="kakao.maps.d.ts" />
import storesData from '../../nike-store.json';

// HTML 요소
const mapElement = document.querySelector('.map') as HTMLElement; // 지도 넣는 곳
const storeListElement = document.querySelector('.store-list') as HTMLElement; // 매장 리스트
const mapBtn = document.querySelector('.map-btn') as HTMLElement; // 지도 버튼
const listBtn = document.querySelector('.list-btn') as HTMLElement; // 리스트 버튼
const storeCount = document.querySelector('.total-store') as HTMLElement; // 매장 개수

// 지도 초기화
const options = {
  center: new kakao.maps.LatLng(37.5023134298285, 127.025925464437),
  level: 3,
  scrollwheel: false,
};

const map = new kakao.maps.Map(mapElement, options);

// 현재 뷰 상태
let isMapView = false;

// nike-store.json 데이터 불러오기
async function loadStores() {
  try {
    // 매장 개수 표시
    storeCount.textContent = `매장: ${storesData.length}개`;

    // 마커 표시 및 리스트 렌더링
    loadStoreMarkers();
    renderStoreList();
  } catch (err) {
    console.error(err);
  }
}

// 지도 / 리스트 토글
mapBtn.addEventListener('click', () => {
  if (isMapView) return;
  isMapView = true;

  storeListElement.classList.add('hidden');
  storeListElement.classList.remove('block');

  mapElement.classList.remove('hidden');
  mapElement.classList.add('block');

  map.relayout();

  listBtn.classList.remove('border-b-2', 'border-nike-black');
  mapBtn.classList.add('border-b-2', 'border-nike-black');
});

listBtn.addEventListener('click', () => {
  if (!isMapView) return;
  isMapView = false;

  mapElement.classList.add('hidden');
  mapElement.classList.remove('block');

  storeListElement.classList.remove('hidden');
  storeListElement.classList.add('block');

  mapBtn.classList.remove('border-b-2', 'border-nike-black');
  listBtn.classList.add('border-b-2', 'border-nike-black');

  renderStoreList();
});

// 마커 표시
function loadStoreMarkers() {
  storesData.forEach((store) => {
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(store.lat, store.lng),
      map,
    });

    const infoWindow = new kakao.maps.InfoWindow({
      content: `
        <div class="p-3 text-sm min-w-[250px] min-h-[150px]">
          <strong class="text-base">${store.name}</strong><br>
          <span class="text-nike-gray-dark text-xs">${store.category}</span><br>
          <span class="text-[13px] mt-2 block">${store.address}</span><br>
          <span class="text-[#007aff] text-[13px]">${store.phone}</span>
        </div>
      `,
    });

    kakao.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(map, marker);
    });
  });
}

// 매장 리스트 렌더링
function renderStoreList() {
  storeListElement.innerHTML = storesData
    .map(
      (store) => `
      <div class="store-item border-b border-nike-gray-lighter p-6 cursor-pointer hover:bg-nike-gray-lightest" data-id="${store.id}">
        <h3 class="text-lg font-bold mb-2">${store.name}</h3>
        <p class="text-sm text-nike-gray-dark mb-1">${store.address}</p>
        <p class="text-sm text-nike-gray-medium mb-2">${store.category}</p>
        <p class="text-sm text-nike-green">${store.hours}</p>
      </div>
    `
    )
    .join('');

  // 리스트 아이템 클릭 시 지도 뷰로 전환
  const allStore = document.querySelectorAll('.store-item');
  allStore.forEach((item) => {
    item.addEventListener('click', () => {
      const dataId = item.getAttribute('data-id')!;
      const storeId = parseInt(dataId);
      const store = storesData.find((s) => s.id === storeId);
      if (!store) return;

      isMapView = true;

      storeListElement.classList.add('hidden');
      storeListElement.classList.remove('block');

      mapElement.classList.remove('hidden');
      mapElement.classList.add('block');

      listBtn.classList.remove('border-b-2', 'border-nike-black');
      mapBtn.classList.add('border-b-2', 'border-nike-black');

      const position = new kakao.maps.LatLng(store.lat, store.lng);
      map.setCenter(position);
      map.relayout();
      map.setLevel(3);
    });
  });
}

// 초기 데이터 로드
loadStores();
