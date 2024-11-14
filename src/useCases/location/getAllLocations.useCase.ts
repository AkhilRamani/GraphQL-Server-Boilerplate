import { QueryLocationsArgs } from "../../__generated/graphql";
import { LocationDTO } from "../../lib/types/locationDTO.type";
import { PaginatedQueryOptions } from "../../lib/types/types";
import { defaultPaginationOptions, getPaginationInfo, PaginationInfo } from "../../lib/utils/pagination.utils";
import { LocationMapper } from "../../mappers/location.mapper";
import { LocationRepository } from "../../repository/location.repository";

export const getAllLocationsUseCase = async (options?: QueryLocationsArgs['options']): Promise<{ locations: LocationDTO[], pageInfo: PaginationInfo }> => {
    const filteredOptions = { ...defaultPaginationOptions, ...options } as PaginatedQueryOptions;

    const { locations, totalItems } = await LocationRepository.getAll(filteredOptions);

    return {
        locations: locations.map(LocationMapper.recordToDTO),
        pageInfo: getPaginationInfo(totalItems, filteredOptions),
    };
};