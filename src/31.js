let express = require('express');
const app = express();

app.get('/nodejs', (req, res) => {
  res.send("Hello, Node.js!");
});

app.listen(3000, () => {
  console.log("Node.js server is running on http://localhost:3000");
});
