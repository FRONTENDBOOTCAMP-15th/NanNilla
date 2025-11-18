/**
 * 상품 전체 정보 (서버에서 반환하는 완전한 형태)
 */
export interface Products {
  ok: 1;

  _id: number;
  seller_id: number;
  price: number;
  shippingFees: number;
  show: boolean;
  active: boolean;
  name: string;
  quantity: boolean;
  buyQuantity: boolean;
  mainImages: [
    {
      path: string;
      name: string;
    },
  ];
  createdAt: string;
  updatedAt: string;
  extra: {
    isNew: boolean;
    isBest: boolean;
    category: string[];
    sort: 1;
    gender: string;
    color: string;
  };
  seller: {
    _id: number;
    email: string;
    name: string;
    phone: string;
    address: string;
    image: string;
    extra: {
      confirm: boolean;
      birthday: string;
      membershipClass: string;
      addressBook: [
        {
          id: number;
          name: string;
          value: string;
        },
      ];
    };
  };
  replies: number;
  bookmarks: number;
  rating: number;
  myBookmarkId: number;
  options: number;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * 게시글 목록 항목 (목록 조회 시 content 제외)
 */
export type PostListItem = Omit<Products, 'content'>;
