import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useTask } from '../../context/TaskContext';
import { toast } from 'react-toastify';

const TaskShareModal = ({ show, onHide, taskId }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { shareTask } = useTask();

  const handleShare = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter an email address');
      return;
    }

    try {
      await shareTask(taskId, email);
      toast.success(`Task shared with ${email}`);
      setEmail('');
      setError('');
      onHide();
    } catch (err) {
      setError('Failed to share task. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Share Task</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleShare}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group controlId="shareEmail">
            <Form.Label>Email to share with</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter user's email"
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Share
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TaskShareModal;