import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Box,
  Checkbox,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { token } = useAuth();

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:4000/api/tasks',
        newTask,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewTask({ title: '', description: '' });
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      await axios.put(
        `http://localhost:4000/api/tasks/${task.id}`,
        { ...task, completed: !task.completed },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleEditTask = async (task: Task) => {
    if (editingTask) {
      try {
        await axios.put(
          `http://localhost:4000/api/tasks/${task.id}`,
          editingTask,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEditingTask(null);
        fetchTasks();
      } catch (error) {
        console.error('Error updating task:', error);
      }
    } else {
      setEditingTask(task);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            My Tasks
          </Typography>
          
          <form onSubmit={handleAddTask}>
            <TextField
              fullWidth
              label="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              margin="normal"
              multiline
              rows={2}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Add Task
            </Button>
          </form>

          <List sx={{ mt: 4 }}>
            {tasks.map((task) => (
              <ListItem
                key={task.id}
                sx={{
                  bgcolor: 'background.paper',
                  mb: 1,
                  borderRadius: 1,
                }}
              >
                <Checkbox
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task)}
                />
                {editingTask?.id === task.id ? (
                  <Box sx={{ flexGrow: 1 }}>
                    <TextField
                      fullWidth
                      value={editingTask.title}
                      onChange={(e) =>
                        setEditingTask({ ...editingTask, title: e.target.value })
                      }
                      margin="dense"
                    />
                    <TextField
                      fullWidth
                      value={editingTask.description}
                      onChange={(e) =>
                        setEditingTask({
                          ...editingTask,
                          description: e.target.value,
                        })
                      }
                      margin="dense"
                      multiline
                      rows={2}
                    />
                    <Button
                      onClick={() => handleEditTask(task)}
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ mt: 1 }}
                    >
                      Save
                    </Button>
                  </Box>
                ) : (
                  <ListItemText
                    primary={task.title}
                    secondary={task.description}
                    sx={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                    }}
                  />
                )}
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleEditTask(task)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default TaskList; 