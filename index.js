const { response } = require("express");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

let persons = [
  {
    id: 1,
    name: "James",
    number: "2054763581",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello</>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((item) => item.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((item) => item.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return response.status(400).json({
      error: "person cannot be empty",
    });
  }

  const mote = {
    content: body.content,
    date: new Date(),
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((item) => item.id !== id);

  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
