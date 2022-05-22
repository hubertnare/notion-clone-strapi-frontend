import { useMemo } from "react";
import { GraphQLClient } from "graphql-hooks";
import memCache from "graphql-hooks-memcache";


let graphQLClient;

//Create a GraphQL client by connecting to your API
function createClient(initialState) {
    return new GraphQLClient({
        ssrMode: typeof window === "undefined",
        url: "http://localhost:1337/graphql", // Server URL (must be absolute)
        cache: memCache({ initialState }),
    });
};

// Initialize your GraphQL client or return the existing one
export function initializeGraphQL(initialState = null) {
    const _graphQLClient = graphQLClient ?? createClient(initialState);
    // For SSG and SSR always create a new GraphQL Client
    if (typeof window === "undefined") return _graphQLClient;
    // Create the GraphQL Client once in the client
    if (!graphQLClient) graphQLClient = _graphQLClient;
    return _graphQLClient;
};

export function useGraphQLClient(initialState) {
    const store = useMemo(() => initializeGraphQL(initialState), [initialState]);
    return store;
};