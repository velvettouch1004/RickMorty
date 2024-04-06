"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const schema = (0, graphql_1.buildSchema)(`
   type Character {
    id: ID!
    status: String!
    species: String!
    gender: String!
    name: String!
    origin: String!
  }

  type Query {
        charactersByStatus(status: String!): [Character]!
        charactersBySpecies(species: String!): [Character]
        charactersByGender(gender: String!): [Character]!
        charactersByName(name: String!): [Character]
        charactersByOrigin(origin: String!): [Character]
        hello: String
    }

  type Mutation {
    createCharacter(
        id: ID!,
        status: String!,
        species: String!,
        gender: String!,
        name: String!,
        origin: String!
      ): Character!
    
      updateCharacter(
        id: ID!,
        status: String,
        species: String,
        gender: String,
        name: String,
        origin: String
      ): Character!
    
      deleteCharacter(id: ID!): ID!
    }
`);
exports.schema = schema;
