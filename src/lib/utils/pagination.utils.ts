import { PaginatedQueryOptions } from "../types/types";

export const defaultPaginationOptions: PaginatedQueryOptions = {
    page: 1,
    limit: 10,
    sortBy: 'dateTime',
    sortOrder: 'ASC'
};

export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}
export const getPaginationInfo = (totalItems: number, options: PaginatedQueryOptions): PaginationInfo => ({
    currentPage: options.page,
    totalPages: Math.ceil(totalItems / options.limit),
    totalItems,
    itemsPerPage: options.limit
});