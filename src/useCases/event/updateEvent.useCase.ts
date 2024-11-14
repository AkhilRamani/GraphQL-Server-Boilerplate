import { isAfter, parseISO } from "date-fns";
import { EventMapper } from "../../mappers/event.mapper";
import { EventRepository } from "../../repository/event.repository";
import { EventDTO } from "../../lib/types/eventDTO.type";
import { UserInputError, ApolloError, ValidationError } from "apollo-server";
import { UpdateEventInput } from "../../__generated/graphql";

export const updateEventUseCase = async (id: string, input: UpdateEventInput): Promise<EventDTO> => {
    const event = await EventRepository.getById(id);
    if (!event) {
        throw new UserInputError('Event not found');
    }

    const inputDTO = EventMapper.validateAndParse.update(input, event.dateTime);
    const eventRecord = EventMapper.DTOToRecord(inputDTO);

    const updatedEvent = await EventRepository.update(id, eventRecord);
    if (!updatedEvent) {
        throw new ApolloError('Something went wrong');
    }

    return EventMapper.recordToDTO(updatedEvent);
};
