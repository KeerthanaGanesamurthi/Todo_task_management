import React, { useState } from 'react';
import { ListGroupItem, Badge, Button, Stack, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash, FaShare, FaCheck } from 'react-icons/fa';
import { format } from 'date-fns';
import TaskForm from './TaskForm';
import TaskShareModal from './TaskShareModal';
import { useTask } from '../../context/TaskContext';

const TaskItem = ({ task }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const { updateTask, deleteTask } = useTask();

  const handleStatusChange = async () => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    await updateTask(task.id, { status: newStatus });
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(task.id);
    }
  };

  const priorityVariant = {
    high: 'danger',
    medium: 'warning',
    low: 'primary'
  };

  return (
    <>
      <ListGroupItem className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center w-100">
          <Button
            variant={task.status === 'completed' ? 'success' : 'outline-secondary'}
            size="sm"
            className="me-md-3 mb-2 mb-md-0"
            onClick={handleStatusChange}
          >
            <FaCheck />
          </Button>
          <div className="flex-grow-1">
            <h5 className="mb-1">{task.title}</h5>
            <p className="mb-1 text-muted">{task.description}</p>
            <small className="text-muted">
              Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
            </small>
          </div>
        </div>
        <Stack direction="horizontal" gap={2} className="mt-3 mt-md-0">
          <Badge bg={priorityVariant[task.priority]}>{task.priority}</Badge>
          {task.sharedWith && task.sharedWith.length > 0 && (
            <Badge bg="info">Shared</Badge>
          )}
          <Button variant="outline-primary" size="sm" onClick={() => setShowEditModal(true)}>
            <FaEdit />
          </Button>
          <Button variant="outline-success" size="sm" onClick={() => setShowShareModal(true)}>
            <FaShare />
          </Button>
          <Button variant="outline-danger" size="sm" onClick={handleDelete}>
            <FaTrash />
          </Button>
        </Stack>
      </ListGroupItem>

      <TaskForm
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        task={task}
        isEdit
      />

      <TaskShareModal
        show={showShareModal}
        onHide={() => setShowShareModal(false)}
        taskId={task.id}
      />
    </>
  );
};

export default TaskItem;