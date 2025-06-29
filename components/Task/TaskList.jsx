import React from 'react';
import { Card, ListGroup, Badge, Spinner, Alert } from 'react-bootstrap';
import TaskItem from './TaskItem';
import { useTask } from '../../context/TaskContext';

const TaskList = ({ tasks }) => {
  const { loading } = useTask();

  if (loading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <Alert variant="info" className="text-center">
        No tasks found. Create a new task to get started!
      </Alert>
    );
  }

  return (
    <Card className="shadow-sm">
      <ListGroup variant="flush">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ListGroup>
    </Card>
  );
};

export default TaskList;
