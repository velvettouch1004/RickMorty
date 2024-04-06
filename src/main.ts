import express from 'express';
import './db/populate-db'; // Import and execute to populate db
import { schema } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { createHandler } from "graphql-http/lib/use/express"

const app = express();
const PORT = 3000;

const middleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
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
const graphqlMiddleware = createHandler({
    schema: schema,
    rootValue: resolvers,
});

app.use('/graphql', middleware, graphqlMiddleware);

// Define a port and start the Express server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/graphql`);
});