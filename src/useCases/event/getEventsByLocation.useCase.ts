import { QueryEventsByLocationArgs } from "../../__generated/graphql";
import { EventDTO } from "../../lib/types/eventDTO.type";
import { PaginatedQueryOptions } from "../../lib/types/types";
import { defaultPaginationOptions, getPaginationInfo, PaginationInfo } from "../../lib/utils/pagination.utils";
import { EventMapper } from "../../mappers/event.mapper";
import { EventRepository } from "../../repository/event.repository";

export const getEventsByLocationUseCase = async (locationId: string, options?: QueryEventsByLocationArgs['options']): Promise<{ events: EventDTO[], pageInfo: PaginationInfo }> => {
    const filterOptions = { ...defaultPaginationOptions, ...options } as PaginatedQueryOptions;

    const { events, totalItems } = await EventRepository.getByLocationId(locationId, filterOptions);

    return {
        events: events.map(EventMapper.recordToDTO),
        pageInfo: getPaginationInfo(totalItems, filterOptions),
    };
};