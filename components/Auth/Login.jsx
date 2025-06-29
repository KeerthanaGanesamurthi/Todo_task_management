import React from 'react';
import { Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import SocialLogin from './SocialLogin';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Row className="w-100">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4 p-md-5">
              <Card.Title className="text-center mb-4 fs-2 fw-bold">Welcome to Task Manager</Card.Title>
              <Card.Text className="text-center mb-4 text-muted">
                Sign in to manage your tasks and collaborate with others
              </Card.Text>
              {loading ? (
                <div className="text-center py-4">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <div className="d-grid gap-3">
                  <SocialLogin provider="google" />
                  <SocialLogin provider="github" />
                  <SocialLogin provider="facebook" />
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;