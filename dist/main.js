"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./populate-db"); // Import and execute the populate-db.ts file
const schema_1 = require("./schema"); // Import your GraphQL schema
const resolvers_1 = require("./resolvers"); // Import your GraphQL resolvers
const express_2 = require("graphql-http/lib/use/express");
const app = (0, express_1.default)(); // Use the correct instance type
const PORT = 3000;
// Configure Sequelize
/*const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite', // SQLite3 memory database
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  */
const middleware = (req, res, next) => {
    // Log request information
    console.log(`Request method: ${req.method}`);
    console.log(`Request URL: ${req.originalUrl}`);
    console.log(`Request body:`, req.body);
    console.log(`Request query parameters:`, req.query);
    console.log(`Request headers:`, req.headers);
    // Check if the request is for GraphQL
    const isGraphQLRequest = req.originalUrl.includes('/graphql');
    console.log(`Is GraphQL request: ${isGraphQLRequest}`);
    next(); // Call the next middleware in the chain
};
const graphqlMiddleware = (0, express_2.createHandler)({
    schema: schema_1.schema,
    rootValue: resolvers_1.resolvers,
});
app.use('/graphql', middleware, graphqlMiddleware);
// Define a port and start the Express server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/graphql`);
});
