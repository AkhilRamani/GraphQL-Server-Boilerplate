import { createEventUseCase } from './createEvent.useCase';
import { EventRepository } from '../../repository/event.repository';
import { LocationRepository } from '../../repository/location.repository';
import { EventMapper } from '../../mappers/event.mapper';
import { UserInputError } from 'apollo-server';
import { Types } from 'mongoose';
import { EventRecord } from '../../models/event.model';
import { LocationRecord } from '../../models/location.model';
import { CreateEventInput } from '../../__generated/graphql';

describe('createEventUseCase', () => {
    const mockInput = {
        name: 'Test Event',
        description: 'This is a test event',
        dateTime: new Date().toISOString(),
        locationId: '60d5ecb54b24e1b2c8a7a1b3',
        tags: ['tag1', 'tag2']
    } as CreateEventInput;

    it('should create an event successfully', async () => {
        const eventRecord = {
            _id: new Types.ObjectId('60d5ecb54b24e1b2c8a7a1b4'),
            name: 'test name',
            description: 'test description',
            dateTime: new Date('2024-07-20T17:30:15+05:30'),
            location: new Types.ObjectId('60d5ecb54b24e1b2c8a7a1b3'),
            type: 'CLASS',
            tags: ['tag1', 'tag2'],
            createdAt: new Date(),
            updatedAt: new Date()
        } as EventRecord;
        const mockCreate = jest.spyOn(EventRepository, 'create').mockResolvedValue(eventRecord);
        const mockGetLocation = jest.spyOn(LocationRepository, 'getById').mockResolvedValue({} as LocationRecord);

        const result = await createEventUseCase(mockInput);

        expect(mockGetLocation).toHaveBeenCalledWith(mockInput.locationId);
        expect(mockCreate).toHaveBeenCalledWith(EventMapper.DTOToRecord(EventMapper.validateAndParse.create(mockInput)), mockInput.locationId);
        expect(result).toEqual(EventMapper.recordToDTO(eventRecord));
    });

    it('should throw UserInputError if locationId is invalid', async () => {
        const result = createEventUseCase({
            locationId: 'some invalid id'
        } as CreateEventInput);

        await expect(result).rejects.toThrow(UserInputError);
    });

    it('should throw an error if location is not found', async () => {
        const mockGetLocation = jest.spyOn(LocationRepository, 'getById').mockResolvedValue(null);

        await expect(createEventUseCase(mockInput)).rejects.toThrow('Location not available');

        expect(mockGetLocation).toHaveBeenCalledWith(mockInput.locationId);
    });
});
