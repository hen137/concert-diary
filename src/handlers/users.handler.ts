import type { FastifyReply, FastifyRequest, } from "fastify";

// TODO: find a way to apply request/response typing based on corresponding route/handler pair

export async function handler(request: FastifyRequest, response: FastifyReply) {
    return {
        test: "test"
    }
}