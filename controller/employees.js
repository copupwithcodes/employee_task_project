const client = require("../util/db_conn");

const getAllEmployees = (req, res) => {
  client.query(`select * from employees`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      res.json({ message: "Technical Error, Please try again!", error: err });
    }
  });
  client.end;
};

const addEmployee = (req, res) => {
  const employees = req.body;
  // console.log(JSON.stringify(employees));
  let insertQuery = `insert into employees(id, name, email, phone, hire_date, position) 
                       values(${employees.id}, '${employees.name}', '${employees.email}', '${employees.phone}', TO_DATE('${employees.hire_date}', 'YYYY-MM-DD'), '${employees.position}')`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.status(201).json({ message: "Employee is Inserted" });
    } else {
      console.log(err);
      if (
        err.message.includes("duplicate key value violates unique constraint ")
      ) {
        res.status(409).json({
          message: "Employee already exists by this id , please enter other id",
        });
      } else if (err.message.includes('invalid value "unde"')) {
        res.status(500).json({
          message:
            "Please enter all mandatory feilds like :- id, name,email, phone, hire_date, position",
        });
      } else {
        res.json({ message: "Technical Error, Please try again!", error: err });
      }
    }
  });
  client.end;
};

const updateEmployee = (req, res) => {
  let employees = req.body;
  let updateQuery = `update employees
                       set name = '${employees.name}',
                       email = '${employees.email}',
                       phone = '${employees.phone}',
                       hire_date = '${employees.hire_date}', 
                       position = '${employees.position}'
                       where id = ${employees.id}`;

  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("Update was successful");
    } else {
      res.json({ message: "Technical Error, Please try again!", error: err });
    }
  });
  client.end;
};

const getByEmployeeId = (req, res) => {
  const id = req.params.id;
  let insertQuery = `Select * from employees where id = ${id}`;
  client.query(insertQuery, (err, result) => {
    if (!err) {
      if (result.rows.length == 0) {
        res
          .status(404)
          .json({ message: "employee does not exist with this id" });
      } else {
        res.send(result.rows);
      }
    } else {
      res.json({ message: "Technical Error, Please try again!", error: err });
    }
  });
};

const deleteEmployee = (req, res) => {
  let insertQuery = `delete from employees where id=${req.params.id}`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Deletion was successful");
    } else {
      res.json({ message: "Technical Error, Please try again!", error: err });
    }
  });
  client.end;
};
module.exports = {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  getByEmployeeId,
  deleteEmployee,
};
