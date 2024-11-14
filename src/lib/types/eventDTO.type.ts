export interface EventDTO {
    id: string;
    name: string;
    dateTime: Date;
    type: 'CLASS' | 'ONE_ON_ONE' | 'WORKSHOP';
    location: string;
    description: string;
    tags?: string[];
    metaData: {
        createdAt: Date;
        updatedAt: Date;
    }
}