import { getEventsByLocationUseCase } from '../useCases/event/getEventsByLocation.useCase';
import { getAllEventsUseCase } from '../useCases/event/getAllEvents.useCase';
import { getEventUseCase } from '../useCases/event/getEvent.useCase';
import { createEventUseCase } from '../useCases/event/createEvent.useCase';
import { updateEventUseCase } from '../useCases/event/updateEvent.useCase';
import { deleteEventUseCase } from '../useCases/event/deleteEvent.useCase';
import { getLocationUseCase } from '../useCases/location/getLocation.useCase';
import { EventDTO } from '../lib/types/eventDTO.type';
import { MutationCreateEventArgs, MutationDeleteEventArgs, MutationUpdateEventArgs, QueryEventArgs, QueryEventsArgs, QueryEventsByLocationArgs } from '../__generated/graphql';

export const eventResolvers = {
    Query: {
        events: async (_: unknown, { options }: QueryEventsArgs) => getAllEventsUseCase(options),
        eventsByLocation: async (_: unknown, { locationId, options }: QueryEventsByLocationArgs) => getEventsByLocationUseCase(locationId, options),
        event: async (_: unknown, { id }: QueryEventArgs) => getEventUseCase(id),
    },
    Mutation: {
        createEvent: async (_: unknown, { input }: MutationCreateEventArgs) => createEventUseCase(input),
        updateEvent: async (_: unknown, { id, input }: MutationUpdateEventArgs) => updateEventUseCase(id, input),
        deleteEvent: async (_: unknown, { id }: MutationDeleteEventArgs) => deleteEventUseCase(id),
    },
    Event: {
        location: async (event: EventDTO) => getLocationUseCase(event.location),
    },
};