import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Container, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';
import { AuthContext } from './AuthContext'; // Import your AuthContext

const Login = ({ children }) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { login, updateUser } = useContext(AuthContext); // Use AuthContext
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/users/login', data);
      const userData = response.data;

      // Ensure your server returns a token upon successful login
      const token = userData.token;

      // Store user data and notifications in local storage
      login(userData); // Use login function from AuthContext

      // Show success toast
      toast.success('Login Successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        onClose: () => {
          navigate('/');
        },
      });
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Error logging in. Username or Password incorrect.', {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Navigate to /login when clicking Cancel
    navigate('/');
  };

  const ogImage = 'https://res.cloudinary.com/dtcmf6iqn/image/upload/v1701269136/swa8ktluihucqayhmhse.png';
  const ogUrl = 'https://example.com/your-page';

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Zee Tools - Use best AI Tools to make your bussiness and life easier" />
    <meta property="og:title" content="Zee Tools" />
    <meta property="og:description" content="Tools - Use best AI Tools to make your bussiness and life easier" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={ogUrl} />
      </Helmet>
      <Container className="pt-9">
        <div className="border p-4 mx-auto my-5 shadow-sm" style={{ maxWidth: 400, backgroundColor: '#f8f9fa' }}>
          {children}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="h4 bold text-center text-uppercase">
              <span className="text-primary">Log</span> in
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register('email', { required: true })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register('password', { required: true })}
              />
            </Form.Group>
            <Button
              as={Link}
              to="/register"
              variant="link"
              className="mb-3 d-block px-0 text-decoration-none text-start text-primary"
            >
              Don't have an account? Create now.
            </Button>
            <Link to="/forgotpassword" className="mb-3 d-block text-decoration-none text-start text-primary">
              Forgot Password?
            </Link>
            <Button
              variant="success"
              type="submit"
              disabled={isLoading}
              className="blue-button"
              style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
            >
              {isLoading ? <Spinner animation="border" size="sm" /> : 'Log in'}
            </Button>{' '}
            <Button
  variant="outline-secondary"
  type="button"
  onClick={handleCancel}
  className="blue-button"
  style={{ borderColor: '#dc3545', color: '#dc3545' }}
>
  Cancel
</Button>

          </form>
        </div>
        <div className="mt-4">{/* GoogleSignIn component */}</div>
        <ToastContainer autoClose={3000} />
      </Container>
    </>
  );
};

export default Login;
