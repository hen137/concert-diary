import { z } from "zod";

export const testRootGetSchema = {
  summary: "Test GET",
  description: "Testbed for API schema definitions.",
  tags: ["tests"],
  // params: z.object({}),
  // querystring: z.object({}),
  // headers: z.object({}),
  // response: {
  //   200: z
  //     .object({})
  //     .meta({ description: "200 success response for the test handler" }),
  // },
  // 401: z
  //   .object({
  //     message: z.string(),
  //   })
  //   .meta({ description: "401 unauthorized response for the test handler" }),
};

export const testRootPostSchema = {
  summary: "Test POST",
  description: "Testbed for API schema definitions.",
  tags: ["tests"],
  // params: z.object({}),
  // querystring: z.object({}),
  // headers: z.object({}),
  body: z.object({
    email: z.string(),
    name: z.string(),
    password: z.string(),
  }),
  response: {
    // 200: z
    //   .object({
    //     statusCode: z.int(),
    //   })
    //   .meta({ description: "200 success response for the test handler" }),
  },
};

export const testParamSchema = {
  summary: "Test Schema 2",
  description: "Another testbed for API schema definitions.",
  tags: ["tests"],
  params: z.object({
    foo: z.string(),
    // "bar": z.number(),
  }),
  // querystring: z.object({

  // }),
  // headers: z.object({

  // }),
  response: {
    200: z
      .object({
        statusCode: z.int(),
        params: z.object({
          foo: z.string(),
          // "bar": z.number(),
        }),
      })
      .meta({ description: "200 success response for the test param handler" }),
  },
};
