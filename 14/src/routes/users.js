import { generateToken, buildIdGenerator } from "../utils.js";

export default (app) => {
  const users = [];

  const generateId = buildIdGenerator();

  app.get("/users/new", (req, res) => res.view("src/views/users/new"));
  // BEGIN (write your solution here)
  app.post("/users", (req, res) => {
    const { firstName, lastName, email } = req.body;
    const id = generateId();
    const token = generateToken();

    users.push({ id, firstName, lastName, email, token });

    res.setCookie("token", token, { path: "/" });
    res.redirect(`/users/${id}`);
  });

  app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    const tokenFromCookie = req.cookies.token;

    if (!tokenFromCookie) {
      res.send("User not found");
      return;
    }

    const user = users.find((user) => user.id === id);

    if (!user || user.token !== tokenFromCookie) {
      res.send("User not found");
      return;
    }

    res.view("src/views/users/show", { user });
  });
  // END
};
