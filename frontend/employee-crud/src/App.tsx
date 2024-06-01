import React, { useState, useEffect } from 'react';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee, Employee } from './api/employeeService';
import { Container, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const App: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newEmployee, setNewEmployee] = useState<Employee>({ name: '', position: '', salary: 0 });
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await getEmployees();
    setEmployees(response.data);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editingEmployee) {
      await updateEmployee(editingEmployee.id!, newEmployee);
    } else {
      await createEmployee(newEmployee);
    }
    setNewEmployee({ name: '', position: '', salary: 0 });
    setEditingEmployee(null);
    fetchEmployees();
  };

  const handleEdit = (employee: Employee) => {
    setNewEmployee(employee);
    setEditingEmployee(employee);
  };

  const handleDelete = async (id: number) => {
    await deleteEmployee(id);
    fetchEmployees();
  };

  return (
    <Container>
      <h1>Employee CRUD</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          id="name"  // ここでidを設定
          label="Name"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          id="position"  // ここでidを設定
          label="Position"
          value={newEmployee.position}
          onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          id="salary"  // ここでidを設定
          label="Salary"
          type="number"
          value={newEmployee.salary}
          onChange={(e) => setNewEmployee({ ...newEmployee, salary: parseFloat(e.target.value) })}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          {editingEmployee ? 'Update' : 'Create'}
        </Button>
      </form>
      <List>
        {employees.map((employee) => (
          <ListItem key={employee.id}>
            <ListItemText primary={`${employee.name} - ${employee.position} - ${employee.salary}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleEdit(employee)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDelete(employee.id!)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
