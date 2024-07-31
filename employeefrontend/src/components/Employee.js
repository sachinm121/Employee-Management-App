import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Container, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function BasicTextFields() {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [employees, setEmployees] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null)

  const submitHandler = (e) => {
    e.preventDefault();
    const employee = { name, role, salary };
    console.log(employee);

    fetch("http://localhost:8080/employee/add", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(employee),
    }).then(() => {
      setName("");
      setRole("");
      setSalary("");
      console.log("New Employee added");
    });
  };

  const fetchEmployees = () => {
    fetch("http://localhost:8080/employee/getAll")
      .then((res) => res.json())
      .then((result) => {
        setEmployees(result);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, [employees]);

  const deleteEmployee = (id) => {
    fetch(`http://localhost:8080/employee/delete/${id}`, {
      method: "DELETE",
    })
    .then(() => {
      // setEmployees(employees.filter(employee => employee.eid !== id));
      console.log("Employee Deleted")
    })
  }

  const openEditDialog = (employee) => {
    setCurrentEmployee(employee);
    setDialogOpen(true);
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setCurrentEmployee(null);
  }

  const handleChange = (e) => {
    setCurrentEmployee({...currentEmployee, [e.target.name]: e.target.value})
  }

  const handleSave = () => {
    fetch(`http://localhost:8080/employee/update/${currentEmployee.eid}`, {
      method: "PUT",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(currentEmployee)
    })
    .then(() => {
      console.log("Employee Updated")
      fetchEmployees();
      handleCloseDialog();
    })
  }
  return (
    <Container>
      <Paper elevation={2} style={paperStyle}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Employee Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Employee Role"
            variant="outlined"
            fullWidth
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Employee Salary"
            variant="outlined"
            fullWidth
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <br />
          <Button variant="contained" onClick={submitHandler}>
            Submit
          </Button>
        </Box>
      </Paper>
      <Paper elevation={3} style={paperStyle}>
        {employees.map((employee) => (
          <Paper
            elevation={6}
            style={{ margin: "10px", padding: "15px", textAlign: "left" }}
            key={employee.eid}
          >
            <div style={{display:"flex", justifyContent:"space-between"}}>
            EId: {employee.eid} <br />
            Name: {employee.name}
            <br />
            Role: {employee.role} <br />
            Salary: {employee.salary} <br />

            <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <Button  variant="outlined" color="error" style={{height:"30px"}} startIcon={<DeleteIcon />} onClick={() => deleteEmployee(employee.eid)}>Delete</Button>
            <Button  variant="contained" style={{height:"30px"}} startIcon={<EditIcon />} onClick={() => openEditDialog(employee)}>Edit</Button>
            </div>
            </div>
          </Paper>
        ))}
      </Paper>

        {/* Dialog for editing employee details */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="standard"
            name="name"
            value={currentEmployee?.name || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Role"
            fullWidth
            variant="standard"
            name="role"
            value={currentEmployee?.role || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Salary"
            fullWidth
            variant="standard"
            name="salary"
            value={currentEmployee?.salary || ''}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}