import { EventDTO } from "../../lib/types/eventDTO.type";
import { EventMapper } from "../../mappers/event.mapper";
import { EventRepository } from "../../repository/event.repository";

export const getEventUseCase = async (id: string): Promise<EventDTO | null> => {
    const event = await EventRepository.getById(id);
    return event ? EventMapper.recordToDTO(event) : null;
};