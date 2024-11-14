import { UserInputError } from "apollo-server";
import { LocationDTO } from "../../lib/types/locationDTO.type";
import { LocationMapper } from "../../mappers/location.mapper";
import { LocationRepository } from "../../repository/location.repository";
import { UpdateLocationInput } from "../../__generated/graphql";

export const updateLocationUseCase = async (id: string, input: UpdateLocationInput): Promise<LocationDTO> => {
    const parsedInput = LocationMapper.validateAndParse(input);
    const locationRecord = LocationMapper.DTOToRecord(parsedInput);

    const updatedLocation = await LocationRepository.update(id, locationRecord);

    if (!updatedLocation) {
        throw new UserInputError('Location not found');
    }

    return LocationMapper.recordToDTO(updatedLocation);
};
