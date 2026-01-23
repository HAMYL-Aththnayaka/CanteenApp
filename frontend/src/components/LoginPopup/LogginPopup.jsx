import React, { useContext, useState } from 'react';
import './LogginPopup.css';
import { assets } from '../../assets/assets';
import api from '../../lib/axios';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';

const LogginPopup = ({ setShowLogin }) => {
  const { setToken } = useContext(StoreContext);

  const [curentState, setCurrentState] = useState('Login');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    try {
      const newUrl =
        curentState === 'Login' ? '/api/user/login' : '/api/user/register';

      // Send only required fields
      const payload =
        curentState === 'Login'
          ? { email: data.email, password: data.password }
          : {
              name: data.name,
              email: data.email,
              password: data.password,
              role: data.role,
            };

      const response = await api.post(newUrl, payload);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setShowLogin(false);
        
        const successMessage = curentState === 'Login' ? 'Logged in successfully!' : 'Account created!';
        toast.success(successMessage); 

      } else {
        toast.error(response.data.alert); 
        console.log(response.data.alert);
      }
    } catch (error) {
    
      const errorMessage = error.response?.data?.alert || 'Server error, please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          
          <h2>{curentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>

        <div className="login-popup-inputs">
          {curentState !== 'Login' && (
            <>
              <input
                type="text"
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                placeholder="Your name"
                required
              />
              <br />
            </>
          )}

          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="text"
            placeholder="Your email"
            required
          />
          <br />

          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password 8 characters long"
            required
          />

          {curentState !== 'Login' && (
            <>
              <br />
              <p>Select your role:</p>
              <div className="radio-group">
                <input
                  type="radio"
                  id="student"
                  name="role"
                  value="Student"
                  checked={data.role === 'Student'}
                  onChange={onChangeHandler}
                  required
                />
                <label htmlFor="student">Student</label>

                <input
                  type="radio"
                  id="staff"
                  name="role"
                  value="Staff"
                  checked={data.role === 'Staff'}
                  onChange={onChangeHandler}
                />
                <label htmlFor="staff">Staff</label>
              </div>
            </>
          )}
        </div>

        <button type="submit">
          {curentState === 'Sign-up' ? 'Create an account' : 'Login'}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>

        {curentState === 'Login' ? (
          <p>
            Create a new account? &nbsp;
            <span onClick={() => setCurrentState('Sign-up')}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account? &nbsp;
            <span onClick={() => setCurrentState('Login')}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LogginPopup;