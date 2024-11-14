import { UserInputError } from "apollo-server";
import { LocationRepository } from "../../repository/location.repository";

export const deleteLocationUseCase = async (id: string): Promise<boolean> => {
    const location = await LocationRepository.getById(id);
    if (!location) {
        throw new UserInputError('Location not found');
    }

    const result = await LocationRepository.delete(id);

    // TODO: should we also remove events where this location referenced?

    return !!result;
}