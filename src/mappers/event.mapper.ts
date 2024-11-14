import { UserInputError, ValidationError } from "apollo-server";
import { EventDTO } from "../lib/types/eventDTO.type";
import { EventRecord } from "../models/event.model";
import { isValidObjectId, Types } from 'mongoose';
import { CreateEventInput, UpdateEventInput } from "../__generated/graphql";
import { isAfter, parseISO } from "date-fns";
import { ObjectUtils } from "../lib/utils/object.utils";

export class EventMapper {
    static recordToDTO(event: EventRecord): EventDTO {
        return {
            id: event._id.toString(),
            name: event.name,
            dateTime: event.dateTime,
            type: event.type,
            location: event.location.toString(),
            description: event.description,
            tags: event.tags,
            metaData: {
                createdAt: event.createdAt,
                updatedAt: event.updatedAt,
            }
        }
    }

    static DTOToRecord(event: Omit<Partial<EventDTO>, 'id' | 'metaData'>): Partial<EventRecord> {
        return {
            ...ObjectUtils.pick(event, ['name', 'dateTime', 'type', 'description', 'tags']),
            ...event.location && { location: new Types.ObjectId(event.location) },
        };
    }

    static validateAndParse = {
        create: (input: CreateEventInput): Omit<EventDTO, 'id' | 'metaData'> => {
            const dateTime = new Date(input.dateTime);

            if (!isValidObjectId(input.locationId)) {
                throw new UserInputError('Invalid location id');
            }

            if (isNaN(dateTime.getTime())) {
                throw new UserInputError('Invalid dateTime format');
            }

            const eventDTO: Omit<EventDTO, 'id' | 'metaData'> = {
                name: input.name,
                dateTime: new Date(input.dateTime as string),
                type: input.type,
                location: input.locationId,
                description: input.description,
                tags: input.tags || []
            };

            return eventDTO;
        },
        update: (input: UpdateEventInput, dbEventDateTime: Date): Omit<Partial<EventDTO>, 'id' | 'metaData'> => {
            if (isAfter(new Date(), parseISO(dbEventDateTime.toString()))) {
                throw new ValidationError('Cannot update past events');
            }

            const dto = {
                ...ObjectUtils.pick(input, ['name', 'type', 'description', 'tags']),
            } as Omit<Partial<EventDTO>, 'id' | 'metaData'>;

            if (input.dateTime) {
                const dateTime = parseISO(input.dateTime);
                if (isNaN(dateTime.getTime())) {
                    throw new UserInputError('Invalid dateTime format');
                }
                if (isAfter(new Date(), dateTime)) {
                    throw new Error('Cannot update event dateTime to past');
                }

                dto.dateTime = dateTime;
            }

            return dto;
        }
    }
}