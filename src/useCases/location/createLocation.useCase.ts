import { LocationDTO } from "../../lib/types/locationDTO.type";
import { LocationMapper } from "../../mappers/location.mapper";
import { LocationRepository } from "../../repository/location.repository";
import { CreateLocationInput } from "../../__generated/graphql";

export const createLocationUseCase = async (input: CreateLocationInput): Promise<LocationDTO> => {
    const parsedInput = LocationMapper.validateAndParse(input);
    const locationRecord = LocationMapper.DTOToRecord(parsedInput);

    const location = await LocationRepository.create(locationRecord);

    return LocationMapper.recordToDTO(location);
};
