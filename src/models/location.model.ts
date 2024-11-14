import mongoose, { Schema, Document, Model } from 'mongoose';
import { PaginatedQueryOptions } from '../lib/types/types';

export interface LocationRecord extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

interface LocationModel extends Model<LocationRecord> {
    paginate(queryOptions: PaginatedQueryOptions, additionalFilters?: Record<string, any>): Promise<{ locations: LocationRecord[], totalItems: number }>;
}

const LocationSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        // match: /^[a-zA-Z0-9-]+$/
    }
}, { timestamps: true });

LocationSchema.statics.paginate = async function (queryOptions: PaginatedQueryOptions, additionalFilters: Record<string, any> = {}) {
    const { page, limit, sortBy, sortOrder, search } = queryOptions;
    const skip = (page - 1) * limit;

    const query = this.find(additionalFilters);

    const sortOptions: Record<string, 1 | -1> = {
        [sortBy]: sortOrder === 'ASC' ? 1 : -1
    };

    const countQuery = this.find(additionalFilters);

    if (search) {
        countQuery.where('name', new RegExp(search, 'i'));
        query.where('name', new RegExp(search, 'i'));
    }

    const [locations, totalItems] = await Promise.all([
        query.sort(sortOptions).skip(skip).limit(limit),
        countQuery.countDocuments()
    ]);

    return { locations, totalItems };
};

export const Location = mongoose.model<LocationRecord, LocationModel>('Location', LocationSchema);