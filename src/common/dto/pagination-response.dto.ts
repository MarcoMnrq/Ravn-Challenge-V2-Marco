export class PaginationResponseDto<T> {
  items: T[];

  total: number;

  page: number;

  limit: number;

  hasNext: boolean;

  hasPrev: boolean;

  constructor(items: T[], total: number, page: number, limit: number) {
    this.items = items;
    this.total = total;
    this.page = page;
    this.limit = limit;
    this.hasNext = (page + 1) * limit < total;
    this.hasPrev = page > 0;
  }
}
