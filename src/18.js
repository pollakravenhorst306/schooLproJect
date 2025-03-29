const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Sample student data
let students = [
  {
    name: 'Tom',
    age: 10,
    grade: 9th
  },
  {
    name: 'Jerry',
    age: 12,
    grade: 10th
  }
];

// GET route to fetch all students
app.get('/students', (req, res) => {
  res.json(students);
});

// POST route to add a new student
app.post('/students', (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  res.json(newStudent);
});

// Example endpoint to retrieve details of a single student
app.get('/student-details/:id', (req, res) => {
  const id = req.params.id;
  if (students.length > id) {
    const student = students[id];
    res.json(student);
  } else {
    res.status(404).send('Student not found');
  }
});

// Example endpoint to delete a student
app.delete('/student-details/:id', (req, res) => {
  const id = req.params.id;
  if (students.length > id) {
    students.splice(id, 1);
    res.json({ message: 'Student deleted successfully' });
  } else {
    res.status(404).send('Student not found');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
