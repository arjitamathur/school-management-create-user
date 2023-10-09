import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SignImg from '../../Components/Image/SignImg'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { UserRoles, addAdminUser, getAuthUser } from '../../Services/Auth'


const Register = () => {
  const navigate = useNavigate();
  const [inpval, setInpval] = useState({
    name: "",
    email: "",
    role: UserRoles.ADMIN,
    password: "",
  })

  const getdata = (e) => {
    const { value, name } = e.target;
    setInpval(() => {
      return {
        ...inpval,
        [name]: value
      }
    })

  }

  const addData = (e) => {
    e.preventDefault();

    const { name, email , role , password } = inpval;

    if (name === "") {
      toast.error(' name field is required!', {
        position: "top-center",
      });
    } else if (email === "") {
      toast.error('email field is required', {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.error('please enter valid email addres', {
        position: "top-center",
      });
    } else if (role === "") {
      toast.error('Select a role', {
        position: "top-center",
      });
    } 
    else if (password === "") {
      toast.error('password field is required', {
        position: "top-center",
      });
    } else if (password.length < 5) {
      toast.error('password length must be greater than five', {
        position: "top-center",
      });
    } else {
      const alreadyExists = getAuthUser(email)
      if(alreadyExists){
        toast.error('This email address already exists', {
          position: "top-center",
        });
      }else{
        addAdminUser(inpval)
        toast.success("Registered succesfully")
        navigate("/login")
      }
      
    }
  }

  return (
    <>
      <div className="container mt-3">
        <section className='d-flex justify-content-between'>
          <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
            <h3 className='text-center col-lg-6'>Sign Up</h3>
            <Form >
              <Form.Group className="mb-3 col-lg-6" >
                <Form.Control type="text" name='name' onChange={getdata} placeholder="Enter Your Name" />
              </Form.Group>

              <Form.Group className="mb-3 mt-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3 mt-3 col-lg-6" controlId="formBasicPassword">
                <Form.Control type="password" name='password' onChange={getdata} placeholder="Password" />
              </Form.Group>

              <Button variant="primary" className='col-lg-6' onClick={addData} style={{ background: "rgb(67, 185, 127)" }} type="submit">
               Register
              </Button>
            </Form>
            <p className='mt-3'>Already Have an Account 
            <span>
              <NavLink to="/login">SignIn</NavLink></span>
              </p>
          </div>
          <SignImg />
        </section>
        <ToastContainer />
      </div>
    </>
  )
}

export default Register