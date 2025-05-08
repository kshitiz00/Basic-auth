import express from "express";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "Hello",
  });
});
const users = [];

const generateToken = () => {
  let options = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  let token = "";
  for (let i = 0; i < 32; i++) {
    token += options[Math.floor(Math.random() * options.length)];
  }
  return token;
};
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
    const token = generateToken();
    user.token = token;
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
  const user = users.find((user) => user.token === token);
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
