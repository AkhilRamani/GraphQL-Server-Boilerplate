import { Types } from "mongoose";
import { PaginatedQueryOptions } from "../lib/types/types";
import { Event } from "../models/event.model";
import { EventRecord } from "../models/event.model";

export class EventRepository {
    static create(event: Partial<EventRecord>, locationId: string): Promise<EventRecord> {
        return Event.create({ ...event, location: new Types.ObjectId(locationId) });
    }

    static update(id: string, event: Partial<EventRecord>): Promise<EventRecord | null> {
        return Event.findByIdAndUpdate(id, event, { new: true });
    }

    static delete(id: string): Promise<EventRecord | null> {
        return Event.findByIdAndDelete(id);
    }

    static getById(id: string): Promise<EventRecord | null> {
        return Event.findById(id);
    }

    static async getByLocationId(locationId: string, queryOptions: PaginatedQueryOptions): Promise<{ events: EventRecord[], totalItems: number }> {
        return Event.paginate(queryOptions, { location: locationId });
    }

    static async getAll(options: PaginatedQueryOptions): Promise<{ events: EventRecord[], totalItems: number }> {
        return Event.paginate(options);
    }
}