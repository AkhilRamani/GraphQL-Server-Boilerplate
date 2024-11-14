import { Types } from "mongoose";
import { EventMapper } from "./event.mapper";
import { EventRecord } from "../models/event.model";
import { EventDTO } from "../lib/types/eventDTO.type";

describe('EventMapper', () => {
    describe('recordToDTO', () => {
        it('should map event record to event DTO', () => {
            const mockEventRecord = {
                _id: new Types.ObjectId('666666666666666666666666'),
                name: 'Test Event',
                dateTime: new Date(),
                type: 'CLASS',
                location: new Types.ObjectId('777777777777777777777777'),
                description: 'Test Description',
                tags: ['tag1', 'tag2'],
                createdAt: new Date(),
                updatedAt: new Date(),
            } as EventRecord;

            const result = EventMapper.recordToDTO(mockEventRecord);

            expect(result).toStrictEqual({
                id: '666666666666666666666666',
                name: 'Test Event',
                dateTime: mockEventRecord.dateTime,
                type: mockEventRecord.type,
                location: '777777777777777777777777',
                description: 'Test Description',
                tags: ['tag1', 'tag2'],
                metaData: {
                    createdAt: mockEventRecord.createdAt,
                    updatedAt: mockEventRecord.updatedAt,
                }
            });
        })
    })

    describe('DTOToRecord', () => {
        it('should map event DTO to event record', () => {
            const mockEventDTO: Omit<EventDTO, 'id' | 'metaData'> = {
                name: 'Test Event',
                dateTime: new Date(),
                type: 'CLASS',
                location: '777777777777777777777777',
                description: 'Test Description',
                tags: ['tag1', 'tag2']
            };

            const result = EventMapper.DTOToRecord(mockEventDTO);

            expect(result).toStrictEqual({
                name: mockEventDTO.name,
                dateTime: mockEventDTO.dateTime,
                type: mockEventDTO.type,
                location: new Types.ObjectId('777777777777777777777777'),
                description: mockEventDTO.description,
                tags: mockEventDTO.tags,
            })
        })
    })
})