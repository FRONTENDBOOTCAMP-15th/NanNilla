/// <reference types="kakao.maps.d.ts" />
// npm i 하면 타입에러 밑줄이 안생김

// 매장 데이터
const storesData = [
  {
    id: 1,
    name: '나이키 서현',
    lat: 37.3839,
    lng: 127.1214,
    address: '경기도 성남시 분당구 서현1동 분당로53번길 9',
    phone: '02-123-4567',
    category: '리테일 스토어',
    hours: '영업 중 • 영업 종료 시간: 오후 8:00',
  },
  {
    id: 2,
    name: '나이키 성남',
    lat: 37.4438,
    lng: 127.1535,
    address: '경기도 성남시 수정구 산성대로 337',
    phone: '02-987-6543',
    category: '나이키 플래그십',
    hours: '영업 중 • 영업 종료 시간: 오후 9:00',
  },
  {
    id: 3,
    name: '나이키 야탑',
    lat: 37.3406,
    lng: 127.2133,
    address: '경기도 광주시 오포읍 문형리 392-7',
    phone: '02-942-5143',
    category: '나이키 플래그십',
    hours: '영업 중 • 영업 종료 시간: 오후 9:00',
  },
  {
    id: 4,
    name: '나이키 현대백화점판교점',
    lat: 37.3926,
    lng: 127.112,
    address: '경기도 성남시 분당구 판교역로 146번길 20 현대백화점 판교점',
    phone: '02-092-4764',
    category: '나이키 플래그십',
    hours: '영업 중 • 영업 종료 시간: 오후 9:00',
  },
];

const container = document.getElementById('map') as HTMLElement;
const options = {
  center: new kakao.maps.LatLng(37.3839, 127.1214), // 첫번째 목록 나이키 장소
};

const map = new kakao.maps.Map(container, options);

// 매장 개수 표시 업데이트
const storeCount = document.querySelector('.total-store');
if (storeCount) {
  storeCount.textContent = `근처 매장: ${storesData.length}개`;
}

// 지도/리스트 토글
const mapBtn = document.querySelector('.map-btn');
const listBtn = document.querySelector('.list-btn');
const mapElement = document.querySelector('.map');
const storeListElement = document.querySelector('.store-list');

// 첫 화면에는 리스트가 보이고 맵은 숨김
let isMapView = false;

// Map 버튼 클릭 시 매장리스트 숨기고 지도 보이게함
mapBtn?.addEventListener('click', () => {
  if (isMapView) return;

  isMapView = true;

  storeListElement?.classList.add('hidden');
  storeListElement?.classList.remove('block');

  mapElement?.classList.remove('hidden');
  mapElement?.classList.add('block');

  map.relayout();

  listBtn?.classList.remove('border-b-2', 'border-nike-black');
  mapBtn?.classList.add('border-b-2', 'border-nike-black');
});

// List 버튼 클릭 시 지도 숨기고 매장리스트 보이게함
listBtn?.addEventListener('click', () => {
  if (!isMapView) return;

  isMapView = false;

  mapElement?.classList.add('hidden');
  mapElement?.classList.remove('block');

  storeListElement?.classList.remove('hidden');
  storeListElement?.classList.add('block');

  mapBtn?.classList.remove('border-b-2', 'border-nike-black');
  listBtn?.classList.add('border-b-2', 'border-nike-black');

  renderStoreList();
});

// 매장 마커 표시
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
  const listHTML = storesData
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

  storeListElement!.innerHTML = listHTML;

  // 리스트 아이템 클릭 시 지도로 전환하고 해당 위치로 이동
  const allStore = document.querySelectorAll('.store-item');
  allStore.forEach((item) => {
    item.addEventListener('click', () => {
      const dataId = item.getAttribute('data-id') as string;
      const storeId = parseInt(dataId);
      const store = storesData.find((s) => s.id === storeId);

      if (store) {
        // 리스트에서 매장 클릭 시 맵으로 전환
        // 리스트 아이템 클릭 시 지도 열기
        isMapView = true;

        storeListElement?.classList.add('hidden');
        storeListElement?.classList.remove('block');

        mapElement?.classList.remove('hidden');
        mapElement?.classList.add('block');

        // 버튼 스타일 지정
        listBtn?.classList.remove('border-b-2', 'border-nike-black');
        mapBtn?.classList.add('border-b-2', 'border-nike-black');

        const position = new kakao.maps.LatLng(store.lat, store.lng);
        map.setCenter(position);
        map.relayout();
        map.setLevel(3);
      }
    });
  });
}

loadStoreMarkers();
renderStoreList(); // 초기 화면에 리스트 표시
