import { LocationDTO } from "../../lib/types/locationDTO.type";
import { LocationMapper } from "../../mappers/location.mapper";
import { LocationRepository } from "../../repository/location.repository";

export const getLocationUseCase = async (id: string): Promise<LocationDTO | null> => {
    const location = await LocationRepository.getById(id);
    return location ? LocationMapper.recordToDTO(location) : null;
};