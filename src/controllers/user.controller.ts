// Types
import type { FastifyReply, FastifyRequest } from "fastify";

//
import { query } from '../database/db.js'

async function registerUserHandler(request: FastifyRequest, response: FastifyReply){
    // return {hello: 'world'}
    try {
        return query('SELECT * FROM users')
    } catch(e){
        console.log(e)
        // return e
    }
}

async function postUserHandler(request: FastifyRequest, response: FastifyReply){
    try {
        const {name, email} = request.body as {name: string, email: string}
        return query(
            'INSERT INTO users (name, email) VALUES ($1, $2)',
            [name, email]
        )
    } catch(e){
        console.log(e)
        // return e
    }
}

export { registerUserHandler, postUserHandler }