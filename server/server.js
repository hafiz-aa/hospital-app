import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// In-memory store for simplicity
const users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];

const doctors = [];

// Simple login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (user) {
    res.json({ message: "Login successful", user: { username: user.username } });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

// CRUD operations for doctors
app.post("/doctors/add", (req, res) => {
  const { name, specialty, email } = req.body;
  const newDoctor = { id: doctors.length + 1, name, specialty, email };
  doctors.push(newDoctor);
  res.json("Doctor added!");
});

app.get("/doctors", (req, res) => {
  res.json(doctors);
});

app.get("/doctors/:id", (req, res) => {
  const doctor = doctors.find((d) => d.id === parseInt(req.params.id));
  if (doctor) {
    res.json(doctor);
  } else {
    res.status(404).json("Doctor not found");
  }
});

app.delete("/doctors/:id", (req, res) => {
  const index = doctors.findIndex((d) => d.id === parseInt(req.params.id));
  if (index !== -1) {
    doctors.splice(index, 1);
    res.json("Doctor deleted.");
  } else {
    res.status(404).json("Doctor not found");
  }
});

app.post("/doctors/update/:id", (req, res) => {
  const doctor = doctors.find((d) => d.id === parseInt(req.params.id));
  if (doctor) {
    const { name, specialty, email } = req.body;
    doctor.name = name;
    doctor.specialty = specialty;
    doctor.email = email;
    res.json("Doctor updated!");
  } else {
    res.status(404).json("Doctor not found");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
