

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SignImg from '../../Components/Image/SignImg';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { getAuthUser, checkPassword, UserRoles } from '../../Services/Auth';
import InputGroup from 'react-bootstrap/InputGroup';
import Teacher from '../../Teacherdata';

const Login = () => {
  const navigate = useNavigate();
  const [inpval, setInpval] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const getdata = (e) => {
    const { value, name } = e.target;
    setInpval((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function isEmailExists(userEmail) {
    for (let i = 0; i < Teacher.length; i++) {
      if (Teacher[i].email === userEmail && Teacher[i].password === inpval.password) {
        return Teacher[i].id;
      }
    }
    return false;
  }

  const HandleSubmit = (e) => {
    e.preventDefault();
    const Id = isEmailExists(inpval.email); // Use inpval.email
    if (!Id) {
      alert('Credentials missing. Please check email and password.');
    } else {
      navigate('/user-profile', { state: Id });
    }
  };

  const togglePasswordVisibility = () => {
    setInpval((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const addData = (e) => {
    e.preventDefault();

    const { email, password } = inpval;
    if (email === '') {
      toast.error('Email field is required', {
        position: 'top-center',
      });
    } else if (!email.includes('@')) {
      toast.error('Please enter a valid email address', {
        position: 'top-center',
      });
    } else if (password === '') {
      toast.error('Password field is required', {
        position: 'top-center',
      });
    } else if (password.length < 5) {
      toast.error('Password length should be greater than five', {
        position: 'top-center',
      });
    } else {
      const userdata = getAuthUser(email);
      if (userdata) {
        // Verify the user password

        if (checkPassword(password, userdata.password)) {
          sessionStorage.setItem('authUser', JSON.stringify(userdata));
          // Check the user role and redirect to the page
          redirectUser(userdata);
        } else {
          toast.error('Invalid login details', {
            position: 'top-center',
          });
        }
      } else {
        toast.error('User not found', {
          position: 'top-center',
        });
      }
    }
  };

  const redirectUser = (userData) => {
    // Handle redirection based on user role
    if (userData.role === UserRoles.STUDENT) {
      navigate('/userrole');
    } else {
      navigate('/userrole');
    }
  };

  return (
    <>
      <div className="container mt-3">
        <section className="d-flex justify-content-between">
          <div className="left_data mt-3 p-3" style={{ width: '100%' }}>
            <h3 className="text-center col-lg-6">Sign IN</h3>
            <Form>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  onChange={getdata}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                <InputGroup>
                  <Form.Control
                    type={inpval.showPassword ? 'text' : 'password'}
                    name="password"
                    onChange={getdata}
                    placeholder="Password"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={togglePasswordVisibility}
                    className="password-toggle-btn"
                  >
                    {inpval.showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputGroup>
              </Form.Group>

              <Button
                variant="primary"
                className="col-lg-6"
                onClick={addData}
                style={{ background: 'rgb(67, 185, 127)' }}
                type="submit"
              >
                Login
              </Button>
            </Form>
            <p className="mt-3">
              Don't Have an Account{' '}
              <span>
                <NavLink to="/register">SignUp</NavLink>
              </span>{' '}
            </p>
          </div>
          <SignImg />
        </section>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
