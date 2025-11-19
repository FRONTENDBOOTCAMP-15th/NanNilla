import { getAxios } from '../utils/axios';

// 로그인 상태 false true 확인
const isLoggedIn = !!localStorage.getItem('accessToken');
console.log('로그인 상태:', isLoggedIn);
/*----------------- 타입 ------------------*/

// 랜더링 시 저장되는 타입
export interface CartItem {
  id: number;
  serverId?: number;
  name: string;
  price: number;
  size: string;
  image: string;
  quantity: number;
  category?: string;
  gender?: string;
  styleNo?: string;
}

// 원본 데이터 구조 타입
export interface ServerCartItem {
  _id: number;
  product: {
    _id: number;
    name: string;
    price: number;
    image: { path: string };
    extra: {
      category?: string[];
      gender?: string;
    };
  };
  quantity: number;
  size: string;
  createdAt: string;
  updatedAt: string;
}

const axiosInstance = getAxios();
/*----------------- 로컬 장바구니 불러오기 ------------------*/

function loadLocalCart(): CartItem[] {
  const cart = localStorage.getItem('cart');
  try {
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
}

function saveLocalCart(cartItems: CartItem[]) {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}
/*----------------- 서버 장바구니 불러오기 ------------------*/

async function loadServerCart(): Promise<CartItem[]> {
  const token = localStorage.getItem('accessToken');
  if (!token) return [];

  try {
    const { data } = await axiosInstance.get<{ item: ServerCartItem[] }>('/carts', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const productsArray = Array.isArray(data.item) ? data.item : [];

    return productsArray.map((item) => ({
      id: item.product._id,
      serverId: item._id,
      name: item.product.name,
      price: Number(item.product.price) || 0,
      size: item.size,
      quantity: Number(item.quantity) || 1,
      image: item.product.image.path || '',
      category: item.product.extra?.category?.[0] || '',
      gender: item.product.extra?.gender || '',
      styleNo: String(item.product._id),
    }));
  } catch (error) {
    console.error('서버 장바구니 불러오기 실패:', error);
    return [];
  }
}
/*----------------- 렌더 함수 ------------------*/

function renderCart(cartItems: CartItem[]) {
  const container = document.getElementById('cart-items');
  const totalPrice = calculateTotal(cartItems);
  updateTotalPrice(totalPrice);
  renderCartCost(totalPrice);

  if (!container) return;

  container.innerHTML = '';

  if (cartItems.length === 0) {
    container.innerHTML = `<p class="text-center text-nike-gray-dark">장바구니가 비어있습니다.</p>`;
    updateTotalPrice(0);
    renderCartCost(0);
    return;
  }

  cartItems.forEach((item: CartItem, index: number) => {
    const card = document.createElement('div');
    card.className = 'cart-item flex gap-4';

    const qty = Number(item.quantity) || 1;
    const price = Number(item.price) || 0;

    card.innerHTML = `
      <div class="flex flex-col">
        <div class="flex gap-2">
          <img src="${item.image}" class="aspect-square w-[154px] h-[154px] rounded" alt="${item.name}" />
          <div class="grow min-w-0 flex flex-col justify-between">
            <div>
              <p class="whitespace-nowrap font-medium text-base item-price">${(price * qty).toLocaleString()} 원</p>
              <p class="font-medium break-all whitespace-normal item-name">${item.name}</p>
              <p class="text-sm text-nike-gray-dark flex flex-row gap-1">${item.gender || ''}</p>
              <p class="text-sm text-nike-gray-dark flex flex-row gap-1">${item.category || ''}</p>

              <div class="text-sm text-nike-gray-dark flex flex-row gap-1">
                <span class="flex flex-col">
                  <p class="pb-1">사이즈</p>
                  <button class="item-size hover:text-nike-gray-light cursor-pointer">${item.size}</button>
                </span>

                <span class="flex flex-col">
                  <p class="pb-1">수량</p>
                  <div>
                    <button type="button" aria-label="수량 감소" class="cursor-pointer hover:text-nike-gray-light minus">-</button>
                    <span class="item-quantity">${qty}</span>
                    <button type="button" aria-label="수량 증가" class="cursor-pointer hover:text-nike-gray-light plus">+</button>
                  </div>
                </span>
              </div>

              <div class="flex items-center gap-2 mt-1 text-sm text-nike-gray-dark">
                <button type="button" class="cursor-pointer rounded-4xl hover:bg-nike-gray-lighter">
                  <img src="../../public/assets/icon36px/icon-favorite.svg" alt="위시리스트" />
                </button>

                <button type="button" class="cursor-pointer p-1.5 rounded-4xl hover:bg-nike-gray-lighter delete">
                  <img src="../../public/assets/icon24px/icon-delete.svg" alt="삭제" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col mt-2">
          <p class="pb-2">무료 배송</p>
          <span>
            도착 예정일: 7월 27일 (토) 
            배송 지역: 
            <button class="cursor-pointer border-b font-semibold">36512</button>
          </span>
        </div>
      </div>
    `;

    // 수량 감소
    card.querySelector('.minus')?.addEventListener('click', async () => {
      item.quantity = Math.max(1, Number(item.quantity) - 1);

      if (isLoggedIn && item.serverId) {
        await updateServerCartItem(item.serverId, item.quantity);
      } else {
        saveLocalCart(cartItems);
      }
      const totalPrice = calculateTotal(cartItems);
      renderCart(cartItems);
      renderCartCost(totalPrice);
    });

    // 수량 증가
    card.querySelector('.plus')?.addEventListener('click', async () => {
      item.quantity = Number(item.quantity) + 1;

      if (isLoggedIn && item.serverId) {
        await updateServerCartItem(item.serverId, item.quantity);
      } else {
        saveLocalCart(cartItems);
      }
      const totalPrice = calculateTotal(cartItems);
      renderCart(cartItems);
      renderCartCost(totalPrice);
    });

    // 삭제
    card.querySelector('.delete')?.addEventListener('click', async () => {
      if (isLoggedIn && item.serverId) {
        await deleteServerCartItem(item.serverId);
      }

      cartItems.splice(index, 1);
      saveLocalCart(cartItems);
      const totalPrice = calculateTotal(cartItems);
      renderCart(cartItems);
      renderCartCost(totalPrice);
    });

    container.appendChild(card);
  });

  updateTotalPrice(totalPrice);
}

/*----------------- 계산 함수 따로 뺌 ------------------*/

function calculateTotal(cartItems: CartItem[]) {
  return cartItems.reduce((sum, item) => {
    const qty = Number(item.quantity) || 1;
    const price = Number(item.price) || 0;
    return sum + price * qty;
  }, 0);
}

/*----------------- 총액 계산 ------------------*/

function updateTotalPrice(totalPrice: number) {
  const priceEl = document.querySelector('.total-price') as HTMLElement;
  if (!priceEl) return;

  priceEl.textContent = totalPrice.toLocaleString() + ' 원';
}
/*----------------- 장바구니 로딩 ------------------*/

async function loadCart() {
  let cartItems: CartItem[] = [];

  if (isLoggedIn) {
    cartItems = await loadServerCart();
  } else {
    cartItems = loadLocalCart();
  }

  renderCart(cartItems);
}
/*----------------- 주문 요약 렌더링 ------------------*/

function renderCartCost(totalPrice: number) {
  const container = document.querySelector('.cart-cost');
  if (!container) return;

  container.innerHTML = '';

  const card = document.createElement('div');
  card.className = 'cart-cost flex flex-col gap-3 text-base';
  card.innerHTML = `
    <div class="flex justify-between">
      <span class="flex items-center">
        상품 금액
        <span class="w-[13px] h-[13px] pl-1 cursor-pointer">
          <img src="../../public/assets/icon24px/icon-cs.svg" alt="" />
        </span>
      </span>
      <span class="font-semibold">${totalPrice.toLocaleString()} 원</span>
    </div>
    <div class="flex justify-between">
      <span>배송비</span>
      <span class="font-semibold">0 원</span>
    </div>
    <div class="flex justify-between pt-3">
      <span class="font-semibold">총 결제 금액</span>
      <span class="font-semibold">${totalPrice.toLocaleString()} 원</span>
    </div>
    <button class="rounded-3xl bg-nike-black text-nike-white py-2 font-bold mt-4 hover:bg-nike-gray-dark">
      주문결제
    </button>
  `;

  container.appendChild(card);
}
/*----------------- 서버 업데이트 ------------------*/

async function updateServerCartItem(serverId: number, quantity: number) {
  const token = localStorage.getItem('accessToken');
  if (!token) return;

  try {
    await axiosInstance.patch(`/carts/${serverId}`, { quantity }, { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    console.error('서버 장바구니 수량 업데이트 실패:', error);
  }
}

async function deleteServerCartItem(serverId: number) {
  const token = localStorage.getItem('accessToken');
  if (!token) return;

  try {
    await axiosInstance.delete(`/carts/${serverId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('서버 장바구니 삭제 실패:', error);
  }
}
/*----------------- 초기 실행 ------------------*/

loadCart();
