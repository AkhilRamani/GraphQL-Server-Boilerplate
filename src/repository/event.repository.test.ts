import { Types } from "mongoose";
import { EventRecord } from "../models/event.model";
import { EventRepository } from "./event.repository";
import { Event } from "../models/event.model";
import { PaginatedQueryOptions } from "../lib/types/types";

describe('EventRepository', () => {
    describe('create', () => {
        it('should create an event', async () => {
            const mockEvent = { name: 'test name' } as EventRecord;
            const mockLocationId = new Types.ObjectId().toString();

            const mockCreate = jest.spyOn(Event, 'create').mockResolvedValue({} as ReturnType<typeof Event.create>);

            const result = await EventRepository.create(mockEvent, mockLocationId);

            expect(mockCreate).toHaveBeenCalledWith({ ...mockEvent, location: new Types.ObjectId(mockLocationId) });
            expect(result).toEqual({});
        });
    });

    describe('update', () => {
        it('should update an event', async () => {
            const mockEvent = { name: 'test name' } as EventRecord;
            const mockId = new Types.ObjectId().toString();

            const mockUpdate = jest.spyOn(Event, 'findByIdAndUpdate').mockResolvedValue({} as ReturnType<typeof Event.findByIdAndUpdate>);

            const result = await EventRepository.update(mockId, mockEvent);

            expect(mockUpdate).toHaveBeenCalledWith(mockId, mockEvent, { new: true });
            expect(result).toEqual({});
        });
    });

    describe('delete', () => {
        it('should delete an event', async () => {
            const mockId = new Types.ObjectId().toString();

            const mockDelete = jest.spyOn(Event, 'findByIdAndDelete').mockResolvedValue({} as ReturnType<typeof Event.findByIdAndDelete>);

            const result = await EventRepository.delete(mockId);

            expect(mockDelete).toHaveBeenCalledWith(mockId);
            expect(result).toEqual({});
        });
    });

    describe('getById', () => {
        it('should get an event by id', async () => {
            const mockId = new Types.ObjectId().toString();

            const mockFindById = jest.spyOn(Event, 'findById').mockResolvedValue({} as ReturnType<typeof Event.findById>);

            const result = await EventRepository.getById(mockId);

            expect(mockFindById).toHaveBeenCalledWith(mockId);
            expect(result).toEqual({});
        });
    });

    describe('getByLocationId', () => {
        it('should get events by location id', async () => {
            const mockLocationId = new Types.ObjectId().toString();
            const mockQueryOptions = { page: 1, limit: 10 } as PaginatedQueryOptions;

            const mockPaginate = jest.spyOn(Event, 'paginate').mockResolvedValue({} as ReturnType<typeof Event.paginate>);

            const result = await EventRepository.getByLocationId(mockLocationId, mockQueryOptions);

            expect(mockPaginate).toHaveBeenCalledWith(mockQueryOptions, { location: mockLocationId });
            expect(result).toEqual({});
        });
    });

    describe('getAll', () => {
        it('should get all events', async () => {
            const mockQueryOptions = { page: 1, limit: 10 } as PaginatedQueryOptions;

            const mockPaginate = jest.spyOn(Event, 'paginate').mockResolvedValue({} as ReturnType<typeof Event.paginate>);

            const result = await EventRepository.getAll(mockQueryOptions);

            expect(mockPaginate).toHaveBeenCalledWith(mockQueryOptions);
            expect(result).toEqual({});
        });
    });
});