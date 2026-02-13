export const getUserByIdSchema = {
    body: {
        type: 'object',
        properties: {
            foo: 'bar'
        }
    },
    querystring: {
        type: 'object',
        properties: {
            foo: 'bar'
        }
    },
    params: {
        type: 'object',
        properties: {
            foo: 'bar'
        }
    },
    headers: {
        type: 'object',
        properties: {
            foo: 'bar'
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                hello: { type: 'string' }
            }
        }, 

    }
}