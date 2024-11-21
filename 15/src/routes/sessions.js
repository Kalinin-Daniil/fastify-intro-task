import generateUsers, { decrypt } from "../utils.js";

export default (app) => {
  const users = generateUsers();

  // BEGIN (write your solution here)
  app.get("/sessions/new", (req, res) => {
    res.view("src/views/sessions/new", { error: null });
  });

  app.post("/sessions", (req, res) => {
    const { username, password } = req.body;
    const user = users.find((user) => user.username === username);

    if (!user) {
      return res.view("src/views/sessions/new", { error: "User not found" });
    }

    if (decrypt(user.password) !== password) {
      return res.view("src/views/sessions/new", { error: "Wrong password" });
    }

    req.session.username = user.username;
    return res.redirect("/");
  });

  app.post("/sessions/delete", (req, res) => {
    req.session.username = null;
    res.redirect("/");
  });
  // END
};
