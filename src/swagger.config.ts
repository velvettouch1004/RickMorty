const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Characters API',
      version: '1.0.0',
      description: 'API for managing characters.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    paths: {
      '/graphql': {
        post: {
          summary: 'Execute GraphQL queries',
          description: 'Use this endpoint to execute GraphQL queries.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    query: {
                      type: 'string',
                      description: 'The GraphQL query to execute',
                      example: `query { charactersByStatus(status: "Dead") { id, status, species, gender, name } }`,
                    },
                  },
                  required: ['query'],
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: {
                        type: 'object',
                        description: 'The GraphQL response data',
                        example: {
                          "charactersByStatus": [
                            {
                              "id": "8",
                              "status": "Dead",
                              "species": "Human",
                              "gender": "Male",
                              "name": "Adjudicator Rick"
                            },
                            {
                              "id": "9",
                              "status": "Dead",
                              "species": "Human",
                              "gender": "Male",
                              "name": "Agency Director"
                            },
                            {
                              "id": "10",
                              "status": "Dead",
                              "species": "Human",
                              "gender": "Male",
                              "name": "Alan Rails"
                            },
                            {
                              "id": "11",
                              "status": "Dead",
                              "species": "Human",
                              "gender": "Male",
                              "name": "Albert Einstein"
                            },
                            {
                              "id": "12",
                              "status": "Dead",
                              "species": "Human",
                              "gender": "Male",
                              "name": "Alexander"
                            },
                            {
                              "id": "16",
                              "status": "Dead",
                              "species": "Alien",
                              "gender": "Male",
                              "name": "Amish Cyborg"
                            }
                          ]
                        }
                      },

                    },
                  },
                },
              },
            },
          },
          parameters: [  // Define parameters here
            {
              in: 'query',
              name: 'status',
              description: 'Filter characters by status',
              required: true,
              schema: {
                type: 'string',
                example: 'Dead',
              },
            },
          ],

        },
      },
    }
  },
  apis: [], // Specify the paths to your API documentation files
  components: {
    schemas: {
      // Define your response schemas here
      // Example:
      Character: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
        },
      },
    },
  },
};

export default options;
