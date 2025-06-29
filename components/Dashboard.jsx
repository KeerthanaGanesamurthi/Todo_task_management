import React, { useState } from 'react';
import { Container, Row, Col, Button, Spinner, Tabs, Tab, ButtonGroup } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useTask } from '../context/TaskContext';
import TaskList from './Task/TaskList';
import TaskForm from './Task/TaskForm';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const { tasks, sharedTasks, loading, filter, setFilter } = useTask();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const filteredTasks = activeTab === 'personal' ? tasks : sharedTasks;

  return (
    <Container fluid="md" className="px-3 px-md-4 py-4">
      <Row className="mb-4 align-items-center">
        <Col xs={12} md={6} className="mb-3 mb-md-0">
          <h1 className="h2 mb-1">Task Dashboard</h1>
          <p className="text-muted mb-0">Manage your tasks efficiently</p>
        </Col>
        <Col xs={12} md={6} className="d-flex flex-column flex-md-row justify-content-md-end gap-2">
          <Button variant="primary" onClick={() => setShowTaskForm(true)}
            className="d-flex align-items-center justify-content-center">
            <FaPlus className="me-1" /> Add Task
          </Button>
          
          <ButtonGroup aria-label="Task filter" className="flex-wrap">
            <Button variant={filter === 'all' ? 'primary' : 'outline-secondary'}
              onClick={() => setFilter('all')} className="text-nowrap">All</Button>
            <Button variant={filter === 'today' ? 'primary' : 'outline-secondary'}
              onClick={() => setFilter('today')} className="text-nowrap">Today</Button>
            <Button variant={filter === 'completed' ? 'primary' : 'outline-secondary'}
              onClick={() => setFilter('completed')} className="text-nowrap">Completed</Button>
          </ButtonGroup>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4" id="task-tabs">
        <Tab eventKey="personal" title="My Tasks" />
        <Tab eventKey="shared" title="Shared With Me" />
      </Tabs>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <TaskList tasks={filteredTasks} />
      )}

      <TaskForm show={showTaskForm} onHide={() => setShowTaskForm(false)} />
    </Container>
  );
};

export default Dashboard;