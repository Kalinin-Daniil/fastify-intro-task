import fastify from "fastify";
import getCompanies from "./utils.js";

export default () => {
  const app = fastify();

  const companies = getCompanies();

  // BEGIN (write your solution here)
  app.get('/companies/:id', (request, reply) => {
    const companyId = request.params.id;
    const company = companies.find(c => c.id === companyId);

    if (company) {
      reply.send(company);
    } else {
      reply.code(404).send('Company not found');
    }
  });
  // END

  return app;
};
