import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useProductContext } from './api/provider';
import { accountServices } from '../../services/accountService';
import swal from 'sweetalert';

export const Login = () => {
  const { loginURL } = useProductContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      debugger
      const payload = await accountServices.login(loginURL, { email, password });
      if (payload && payload.user.role == 'admin') {
        navigate('/dashboard');
      } else if (payload) { navigate('/') }
      dispatch({ type: 'LOGIN', payload });
      swal("Success", "Login Successfull", "success");
    } catch (error) {
      swal("Error!", 'Invalid Login', "error");
    }
  }

  return (
    <>
      <div className="container my-5 p-5 shadow">
        <div className="row">
          <div className="col-6 text-center">
            <img src="./images/login.png" alt="" />
          </div>
          <div className="col-6">
          <h1>Login</h1>
            <form onSubmit={loginUser}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" name='email' placeholder='Enter Email' />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" name='password' placeholder='Enter Password' />
              </div>
              <div className='d-flex justify-content-between align-items-center'>
                <button type="submit" className="btn btn-primary">login</button>
                <p className='m-0'>Do'nt have an Account <Link to='/register'>Register</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
