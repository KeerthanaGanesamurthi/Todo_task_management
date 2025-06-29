import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, FloatingLabel, Row, Col } from 'react-bootstrap';
import { useTask } from '../../context/TaskContext';
import { toast } from 'react-toastify';

const TaskForm = ({ show, onHide, task, isEdit = false }) => {
  const { createTask, updateTask } = useTask();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending'
  });

  useEffect(() => {
    if (isEdit && task) {
      setFormData({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate.split('T')[0],
        priority: task.priority,
        status: task.status
      });
    } else {
      setFormData({
        title: '',
        description: '',
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'medium',
        status: 'pending'
      });
    }
  }, [task, isEdit, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateTask(task.id, formData);
        toast.success('Task updated successfully');
      } else {
        await createTask(formData);
        toast.success('Task created successfully');
      }
      onHide();
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} task`);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit Task' : 'Create New Task'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <FloatingLabel controlId="title" label="Title" className="mb-3">
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="description" label="Description" className="mb-3">
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description"
              style={{ height: '100px' }}
            />
          </FloatingLabel>

          <Row className="mb-3">
            <Col xs={12} md={6} className="mb-3 mb-md-0">
              <FloatingLabel controlId="dueDate" label="Due Date">
                <Form.Control
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col xs={12} md={6}>
              <FloatingLabel controlId="priority" label="Priority">
                <Form.Select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>

          {isEdit && (
            <FloatingLabel controlId="status" label="Status">
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </FloatingLabel>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {isEdit ? 'Update Task' : 'Create Task'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TaskForm;