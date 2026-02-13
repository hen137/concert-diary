export const getUserByIdSchema = {
    // body: {
    //     type: 'object',
    //     properties: {
    //         foo: 'bar'
    //     }
    // },
    querystring: {
        type: 'object',
        required: [],
        properties: {
            // apikey: { type: 'string' }
        }
    },
    params: {
        type: 'object',
        properties: {
            // id: { type: 'string' }
        }
    },
    headers: {
        type: 'object',
        properties: {
            // foo: 'bar'
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