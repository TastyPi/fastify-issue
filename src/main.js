import Fastify from "fastify";

const fastify = Fastify();

await fastify.register(import("@fastify/swagger"), {
  openapi: {
    openapi: "3.1.0",
    info: {
      title: "Test swagger",
      version: "1.0.0"
    }
  }
});

fastify.get("/", {
  schema: {
    headers: {
      type: "object",
      properties: {
        "Accept-Version": {
          type: "string",
          const: "1"
        }
      },
      required: ["Accept-Version"]
    }
  },
  async handler(request, reply) {
    return ({ version: request.headers["accept-version"] });
  }
});

await fastify.ready();

console.log(JSON.stringify(fastify.swagger(), null, 2));
