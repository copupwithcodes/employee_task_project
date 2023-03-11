const client = require("../util/db_conn");

const getAllTasks = (req, res) => {
  client.query(`select * from tasks`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      res
        .status(500)
        .json({ message: "Technical Error, Please try again!", error: err });
    }
  });
  client.end;
};

const addTasks = (req, res) => {
  const tasks = req.body;

  let insertQuery = `insert into tasks(id, title, description, due_date, employee_id) 
                       values(${tasks.id}, '${tasks.title}', '${tasks.description}', '${tasks.due_date}',  '${tasks.employee_id}')`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Insertion was successful");
    } else {
      console.log(err);
      if (
        err.message.includes("duplicate key value violates unique constraint ")
      ) {
        res
          .status(409)
          .json({
            message:
              "Employee already exists by this id , please enter other id",
          });
      } else if (err.message.includes('invalid value "unde"')) {
        res
          .status(500)
          .json({
            message:
              "Please enter all mandatory feilds like :- id, title, description, due_date, employee_id",
          });
      } else {
        res
          .status(500)
          .json({ message: "Technical Error, Please try again!", error: err });
      }
    }
  });
  client.end;
};
const updateTask = (req, res) => {
  let tasks = req.body;
  let updateQuery = `update tasks
                       set title = '${tasks.title}',
                       description = '${tasks.description}',
                       due_date = '${tasks.due_date}',
                       employee_id= '${tasks.employee_id}'
                       where id = ${tasks.id}`;

  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("Update was successful");
    } else {
      res
        .status(500)
        .json({ message: "Technical Error, Please try again!", error: err });
    }
  });
  client.end;
};

const deleteTask = (req, res) => {
  let insertQuery = `delete from tasks where id=${req.params.id}`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Deletion was successful");
    } else {
      res
        .status(500)
        .json({ message: "Technical Error, Please try again!", error: err });
    }
  });
  client.end;
};

const getByTaskId = function (req, res) {
  const id = req.params.id;
  let insertQuery = `Select * from tasks where id = ${id}`;
  client.query(insertQuery, (err, result) => {
    if (!err) {
      if (result.rows.length == 0) {
        res.send("This task does not exist ");
      } else {
        res.send(result.rows);
      }
    } else {
      res
        .status(500)
        .json({ message: "Technical Error, Please try again!", error: err });
    }
  });
};

const employeeTask = function (req, res) {
  const id = req.params.id;
  client.query(
    `select * from tasks where employee_id= ${id}`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        res
          .status(500)
          .json({ message: "Technical Error, Please try again!", error: err });
      }
    }
  );
  client.end;
};

module.exports = {
  getAllTasks,
  addTasks,
  updateTask,
  deleteTask,
  getByTaskId,
  employeeTask,
};
