require('dotenv').config();
const express = require("express");
const client = require("./util/db_conn");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  getByEmployeeId,
  deleteEmployee,
} = require("./controller/employees");
const {
  getAllTasks,
  addTasks,
  updateTask,
  deleteTask,
  getByTaskId,
  employeeTask,
} = require("./controller/tasks");

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
client
  .connect()
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

app.get("/employees", getAllEmployees);
app.post("/employees", addEmployee);
app.put("/employees/:id", updateEmployee);
app.get("/employee/:id", getByEmployeeId);
app.delete("/employees/:id", deleteEmployee);

app.get("/tasks", getAllTasks);
app.post("/tasks", addTasks);
app.put("/tasks/:id", updateTask);
app.delete("/tasks/:id", deleteTask);
app.get("/tasks/:id", getByTaskId);
app.get("/employee/task/:id", employeeTask);
