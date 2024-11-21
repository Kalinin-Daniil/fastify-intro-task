import generateId from "../utils.js";

export default (app) => {
  const posts = [];

  app.get("/posts/new", (req, res) => res.view("src/views/posts/new"));

  app.get("/posts/:id", (req, res) => {
    const post = posts.find(({ id }) => id === req.params.id);

    if (!post) {
      res.status(404).send("Post not found");
      return;
    }
    res.view("src/views/posts/show", { post });
  });

  // BEGIN (write your solution here)
  app.post("/posts", (req, res) => {
    const { title, body } = req.body;

    if (title.length < 2) {
      req.session.flash = {
        type: "error",
        message: "Ошибка создания поста!",
      };
      res.redirect("/posts/new");
      return;
    }

    const id = generateId();
    const post = { title, body, id };
    posts.push(post);

    req.session.flash = {
      type: "success",
      message: "Пост был успешно создан!",
    };
    res.redirect("/posts");
  });

  app.get("/posts", (req, res) => {
    const flash = req.session.flash;
    req.session.flash = null;

    res.view("src/views/posts/index", { posts, flash });
  });
  // END
};
