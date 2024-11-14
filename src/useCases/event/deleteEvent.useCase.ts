import { isAfter } from "date-fns";
import { EventRepository } from "../../repository/event.repository";
import { UserInputError, ValidationError } from "apollo-server";

export const deleteEventUseCase = async (id: string): Promise<boolean> => {
    const event = await EventRepository.getById(id);
    if (!event) {
        throw new UserInputError('Event not found');
    }

    if (isAfter(new Date(), event.dateTime)) {
        throw new ValidationError('Cannot delete past events');
    }

    const result = await EventRepository.delete(id);
    return !!result;
};