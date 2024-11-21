import fastify from "fastify";
import view from "@fastify/view";
import pug from "pug";
import getUsers from "./utils.js";

export default async () => {
  const app = fastify();

  const users = getUsers();

  // BEGIN (write your solution here)
  await app.register(view, { engine: { pug } });

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((user) => user.id === id);

    if (!user) {
      return res.code(404).send('User not found');
    }

    res.send(user);
  });
  // END

  return app;
};
