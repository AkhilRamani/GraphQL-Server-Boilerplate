import { getAllLocationsUseCase } from '../useCases/location/getAllLocations.useCase';
import { getLocationUseCase } from '../useCases/location/getLocation.useCase';
import { createLocationUseCase } from '../useCases/location/createLocation.useCase';
import { updateLocationUseCase } from '../useCases/location/updateLocation.useCase';
import { deleteLocationUseCase } from '../useCases/location/deleteLocation.useCase';
import { MutationCreateLocationArgs, MutationDeleteLocationArgs, MutationUpdateLocationArgs, QueryLocationArgs, QueryLocationsArgs } from '../__generated/graphql';

export const locationResolvers = {
    Query: {
        locations: async (_: unknown, { options }: QueryLocationsArgs) => getAllLocationsUseCase(options),
        location: async (_: unknown, { id }: QueryLocationArgs) => getLocationUseCase(id),
    },
    Mutation: {
        createLocation: async (_: unknown, { input }: MutationCreateLocationArgs) => createLocationUseCase(input),
        updateLocation: async (_: unknown, { id, input }: MutationUpdateLocationArgs) => updateLocationUseCase(id, input),
        deleteLocation: async (_: unknown, { id }: MutationDeleteLocationArgs) => deleteLocationUseCase(id),
    },
};