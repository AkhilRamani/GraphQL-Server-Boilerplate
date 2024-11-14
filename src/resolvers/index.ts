import { eventResolvers } from "./event.resolver";
import { locationResolvers } from "./location.resolver";

const resolvers = {
    Query: {
        ...locationResolvers.Query,
        ...eventResolvers.Query,
    },
    Mutation: {
        ...locationResolvers.Mutation,
        ...eventResolvers.Mutation,
    },
    Event: eventResolvers.Event,
};

export default resolvers;