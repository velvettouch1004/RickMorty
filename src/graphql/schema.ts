import { buildSchema } from "graphql";

const schema = buildSchema(`
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

export { schema };
