import { Types } from "mongoose";
import { PaginatedQueryOptions } from "../lib/types/types";
import { Event, EventRecord } from "./event.model";

describe('EventModel', () => {
    describe('paginate', () => {
        it('should paginate event documents', async () => {
            const mockEvents = [
                { _id: new Types.ObjectId(), name: 'Event 1' },
                { _id: new Types.ObjectId(), name: 'Event 2' },
            ] as EventRecord[];
            const mockQueryOptions: PaginatedQueryOptions = { page: 1, limit: 10, sortBy: 'name', sortOrder: 'DESC' };

            const mockWhere = jest.fn().mockReturnThis();
            const mockSort = jest.fn().mockReturnThis();
            const mockSkip = jest.fn().mockReturnThis();
            const mockLimit = jest.fn().mockResolvedValue(mockEvents);
            const mockCountDocuments = jest.fn().mockResolvedValue(2);

            const mockFind = jest.spyOn(Event, 'find').mockReturnValue({
                where: mockWhere,
                sort: mockSort,
                skip: mockSkip,
                limit: mockLimit,
                countDocuments: mockCountDocuments,
            } as any);

            const result = await Event.paginate(mockQueryOptions);

            expect(result).toStrictEqual({ events: mockEvents, totalItems: 2 });

            expect(mockFind).toHaveBeenCalledWith({});
            expect(mockWhere).not.toHaveBeenCalled();
            expect(mockCountDocuments).toHaveBeenCalled();
            expect(mockSort).toHaveBeenCalledWith({ name: -1 });
            expect(mockSkip).toHaveBeenCalledWith(0);
            expect(mockLimit).toHaveBeenCalledWith(10);
        });

        it('should paginate event documents when additional filters are provided', async () => {
            const mockAdditionalFilters = { location: new Types.ObjectId() };

            const mockEvents = [
                { _id: new Types.ObjectId(), name: 'Event 1' },
                { _id: new Types.ObjectId(), name: 'Event 2' },
            ] as EventRecord[];
            const mockQueryOptions: PaginatedQueryOptions = { page: 1, limit: 10, sortBy: 'name', sortOrder: 'DESC' };

            const mockWhere = jest.fn().mockReturnThis();
            const mockSort = jest.fn().mockReturnThis();
            const mockSkip = jest.fn().mockReturnThis();
            const mockLimit = jest.fn().mockResolvedValue(mockEvents);
            const mockCountDocuments = jest.fn().mockResolvedValue(2);

            const mockFind = jest.spyOn(Event, 'find').mockReturnValue({
                where: mockWhere,
                sort: mockSort,
                skip: mockSkip,
                limit: mockLimit,
                countDocuments: mockCountDocuments,
            } as any);

            const result = await Event.paginate(mockQueryOptions, mockAdditionalFilters);

            expect(result).toStrictEqual({ events: mockEvents, totalItems: 2 });

            expect(mockFind).toHaveBeenCalledWith(mockAdditionalFilters);
            expect(mockWhere).not.toHaveBeenCalled();
            expect(mockCountDocuments).toHaveBeenCalled();
            expect(mockSort).toHaveBeenCalledWith({ name: -1 });
            expect(mockSkip).toHaveBeenCalledWith(0);
            expect(mockLimit).toHaveBeenCalledWith(10);
        });

        it('should paginate event documents when additional filters and search are provided', async () => {
            const mockAdditionalFilters = { location: new Types.ObjectId() };

            const mockEvents = [
                { _id: new Types.ObjectId(), name: 'Event 1' },
                { _id: new Types.ObjectId(), name: 'Event 2' },
            ] as EventRecord[];
            const mockQueryOptions: PaginatedQueryOptions = { page: 1, limit: 10, sortBy: 'name', sortOrder: 'DESC', search: 'test search' };

            const mockWhere = jest.fn().mockReturnThis();
            const mockSort = jest.fn().mockReturnThis();
            const mockSkip = jest.fn().mockReturnThis();
            const mockLimit = jest.fn().mockResolvedValue(mockEvents);
            const mockCountDocuments = jest.fn().mockResolvedValue(2);

            const mockFind = jest.spyOn(Event, 'find').mockReturnValue({
                where: mockWhere,
                sort: mockSort,
                skip: mockSkip,
                limit: mockLimit,
                countDocuments: mockCountDocuments,
            } as any);

            const result = await Event.paginate(mockQueryOptions, mockAdditionalFilters);

            expect(result).toStrictEqual({ events: mockEvents, totalItems: 2 });

            expect(mockFind).toHaveBeenCalledWith(mockAdditionalFilters);
            expect(mockWhere).toHaveBeenCalledTimes(2);
            expect(mockWhere).toHaveBeenCalledWith('name', new RegExp('test search', 'i'));

            expect(mockCountDocuments).toHaveBeenCalled();
            expect(mockSort).toHaveBeenCalledWith({ name: -1 });
            expect(mockSkip).toHaveBeenCalledWith(0);
            expect(mockLimit).toHaveBeenCalledWith(10);
        });
    });
});