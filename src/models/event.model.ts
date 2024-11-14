import mongoose, { Schema, Document, Model } from 'mongoose';
import { PaginatedQueryOptions } from "../lib/types/types";

export interface EventRecord extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    dateTime: Date;
    type: 'CLASS' | 'ONE_ON_ONE' | 'WORKSHOP';
    location: mongoose.Types.ObjectId;
    description: string;
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
}

interface EventModel extends Model<EventRecord> {
    paginate(queryOptions: PaginatedQueryOptions, additionalFilters?: Record<string, any>): Promise<{ events: EventRecord[], totalItems: number }>;
}

const EventSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['CLASS', 'ONE_ON_ONE', 'WORKSHOP'],
        required: true
    },
    tags: {
        type: [String],
    }
}, { timestamps: true });

EventSchema.statics.paginate = async function (queryOptions: PaginatedQueryOptions, additionalFilters: Record<string, any> = {}) {
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

    const [events, totalItems] = await Promise.all([
        query.sort(sortOptions).skip(skip).limit(limit),
        countQuery.countDocuments()
    ]);

    return { events, totalItems };
};

export const Event = mongoose.model<EventRecord, EventModel>('Event', EventSchema);