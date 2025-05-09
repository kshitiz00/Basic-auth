import express from "express";
import jwt from "jsonwebtoken";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "Hello",
  });
});
const users = [];
const JWT_SECRET = "kshtizjivanshu";
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  users.push({
    username: username,
    password: password,
  });
  console.log(users);
  res.send({
    message: "You are signed up",
  });
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => {
    if (user.username === username && user.password === password) {
      return true;
    } else {
      return false;
    }
  });
  if (user) {
    console.log(users);
    console.log(user);
    const token = jwt.sign(
      {
        username: username,
      },
      JWT_SECRET
    );
    console.log(users);
    res.send({
      Token: token,
    });
  } else {
    res.send({
      message: "Invalid username or password",
    });
  }
});

app.get("/me", (req, res) => {
  const { token } = req.headers;
  const decodeduser = jwt.verify(token, JWT_SECRET);
  const user = users.find((user) => decodeduser.username === user.username);
  if (user) {
    res.send({
      username: user.username,
      password: user.password,
    });
  } else {
    res.send({
      message: "Unauthorised",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on Port 3000");
});
