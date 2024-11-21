import _ from "lodash";
import fastify from "fastify";
import getUsers from "./utils.js";

export default () => {
  const app = fastify();

  const users = getUsers();

  // BEGIN (write your solution here)
  app.get('/users', (request, reply) => {
    const page = parseInt(request.query.page) || 1;
    const per = parseInt(request.query.per) || 5;

    const startIndex = (page - 1) * per;
    const endIndex = startIndex + per;

    const paginatedUsers = _.slice(users, startIndex, endIndex);

    reply.send(paginatedUsers);
  });
  // END

  return app;
};
