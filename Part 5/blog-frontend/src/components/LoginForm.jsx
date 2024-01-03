import { useState } from 'react';
import loginService from '../services/login';

const LoginForm = ({ setUser, setErrorMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const loginInfo = {
        username: username,
        password: password,
      };
      const loginData = await loginService.login(loginInfo);
      window.localStorage.setItem(
        'blogAppLoginData',
        JSON.stringify(loginData)
      );
      setUser(loginData);
      setUsername('');
      setPassword('');
    } catch (e) {
      setErrorMessage('Username or Password is incorrect');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Log in to the application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => {
              setUsername(target.value);
            }}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
