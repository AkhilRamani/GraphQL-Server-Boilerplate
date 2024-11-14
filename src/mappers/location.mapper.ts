import { Types } from "mongoose";
import { LocationDTO } from "../lib/types/locationDTO.type";
import { LocationRecord } from "../models/location.model";
import { validateLocationName } from "../utils/validators";
import { ValidationError } from "apollo-server";
import { CreateLocationInput, UpdateLocationInput } from "../__generated/graphql";

export class LocationMapper {
    static recordToDTO(location: LocationRecord): LocationDTO {
        return {
            id: location._id.toString(),
            name: location.name,
            metaData: {
                createdAt: location.createdAt,
                updatedAt: location.updatedAt
            }
        }
    }

    static DTOToRecord(location: Partial<LocationDTO>): Omit<Partial<LocationRecord>, 'id' | 'metaData'> {
        return {
            name: location.name,
        }
    }

    static validateAndParse(input: CreateLocationInput | UpdateLocationInput): Omit<LocationDTO, 'id' | 'metaData'> {
        if (!validateLocationName(input.name)) {
            throw new ValidationError('Invalid location name');
        }
        return { name: input.name };
    }
}
