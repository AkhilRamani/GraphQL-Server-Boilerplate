import { EventMapper } from "../../mappers/event.mapper";
import { EventRepository } from "../../repository/event.repository";
import { LocationRepository } from "../../repository/location.repository";
import { EventDTO } from "../../lib/types/eventDTO.type";
import { ValidationError } from "apollo-server";
import { CreateEventInput } from "../../__generated/graphql";

export const createEventUseCase = async (input: CreateEventInput): Promise<EventDTO> => {

    const eventDTO = EventMapper.validateAndParse.create(input);

    const location = await LocationRepository.getById(input.locationId);
    if (!location) {
        throw new ValidationError('Location not available');
    }

    const record = EventMapper.DTOToRecord(eventDTO);   // ideally useCase may receive DTO and return DTO

    const eventRecord = await EventRepository.create(record, input.locationId);

    return EventMapper.recordToDTO(eventRecord);
};
