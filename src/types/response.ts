import type { Products, CategoryItem } from './products';

/**
 * API 에러 응답
 */
export interface ApiError {
  ok: 0;
  message: string;
}

export type ItemListRes =
  | {
      ok: 1;
      item: Products[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }
  | ApiError;

export type CategoryListRes =
  | {
      ok: 1;
      item: {
        flatten: Record<string, CategoryItem>;
      };
    }
  | ApiError;
