import { QueryEventsArgs } from "../../__generated/graphql";
import { EventDTO } from "../../lib/types/eventDTO.type";
import { PaginatedQueryOptions } from "../../lib/types/types";
import { defaultPaginationOptions, getPaginationInfo, PaginationInfo } from "../../lib/utils/pagination.utils";
import { EventMapper } from "../../mappers/event.mapper";
import { EventRepository } from "../../repository/event.repository";

export const getAllEventsUseCase = async (options?: QueryEventsArgs['options']): Promise<{ events: EventDTO[], pageInfo: PaginationInfo }> => {
    const filterOptions = { ...defaultPaginationOptions, ...options } as PaginatedQueryOptions;

    const { events, totalItems } = await EventRepository.getAll(filterOptions);

    return {
        events: events.map(EventMapper.recordToDTO),
        pageInfo: getPaginationInfo(totalItems, filterOptions),
    };
};