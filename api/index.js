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
  {
    name: "Extraordinário",
    author: "Rachel Agavino",
    data: "31/01/2013",
    genero: "Drama",
    image: ""
  },
  {
    name: "A Arte da Guerra",
    author: "Sun Tzu",
    data: "20/05/2015",
    genero: "Ficção de aventura",
    image: ""
  },
  {
    name: "Maus",
    author: "Art Spiegelman",
    data: "09/12/2021",
    genero: "História em quadrinhos",
    image: ""
  },

];

app.get("/livros", (req, res) => {
  res.json(livros);
});

app.post("/livros", (req, res) => {
  let bookName = String(req.body.bookName);
  let author = String(req.body.author);
  let date = Date(req.body.date);
  let photo = File(req.body.photo);

  livros.push(req.body);
  res.json({ msg: "Added book successfully" });
});

app.listen(port, () => {
  console.log("Server running on port", port);
});
