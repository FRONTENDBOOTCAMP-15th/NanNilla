import type { Products, CategoryItem } from './products';

/**
 * API 에러 응답
 */
export interface ApiError {
  ok: 0;
  message: string;
}

/**
 * 게시글 목록 조회 응답 (GET /posts)
 * 성공: { ok: 1, item: [...], pagination: {...} }
 * 실패: { ok: 0, message: "에러 메시지" }
 */

export type ItemListRes = {
  ok: 1;
  item: Products[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type CategoryListRes =
  | {
      ok: 1;
      item: {
        flatten: Record<string, CategoryItem>;
      };
    }
  | ApiError;
