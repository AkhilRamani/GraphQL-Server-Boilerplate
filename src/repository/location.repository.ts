import { PaginatedQueryOptions } from "../lib/types/types";
import { Location, LocationRecord } from "../models/location.model";

export class LocationRepository {
    static getById(id: string): Promise<LocationRecord | null> {
        return Location.findById(id);
    }

    static getAll(options: PaginatedQueryOptions): Promise<{ locations: LocationRecord[], totalItems: number }> {
        return Location.paginate(options);
    }

    static create(location: Partial<LocationRecord>): Promise<LocationRecord> {
        return Location.create(location);
    }

    static update(id: string, location: Partial<LocationRecord>): Promise<LocationRecord | null> {
        return Location.findByIdAndUpdate(id, location, { new: true });
    }

    static delete(id: string): Promise<LocationRecord | null> {
        return Location.findByIdAndDelete(id);
    }
}