import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

const livros = [
  {
    name: "1984",
    author: "George Orwell",
    data: "08/06/1949",
    genero: "Romance",
    image: "./1984.jpg"
  },
  {
    name: "Capitões de areia",
    author: "Jorge Amado",
    data: "1937",
    genero: "Romance",
    image: ""
  },
];

app.get("/livros", (req, res) => {
  res.json(livros);
});

app.post("/livros", (req, res) => {
  livros.push(req.body);
  res.json({ msg: "Added book successfully" });
});

app.listen(port, () => {
  console.log("Server running on port", port);
});
