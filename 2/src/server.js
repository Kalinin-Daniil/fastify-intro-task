import fastify from "fastify";

export const data = {
  phones: ["+12345678", "3434343434", "234-56-78"],
  domains: ["example.com", "yandex.ru"],
};

export default () => {
  const app = fastify();

  // BEGIN (write your solution here)
  app.get('/phones', (request, reply) => {
    reply.send(data.phones);
  });

  app.get('/domains', (request, reply) => {
    reply.send(data.domains);
  });
  // END

  return app;
};
