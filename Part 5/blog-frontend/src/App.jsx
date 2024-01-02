import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blog';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [URL, setURL] = useState('');
  const [aux, setAux] = useState(0);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      } catch (e) {
        return e;
      }
    };
    getBlogs();
  }, []);

  useEffect(() => {
    const userData = JSON.parse(
      window.localStorage.getItem('blogAppLoginData')
    );
    if (userData) {
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      } catch (e) {
        return e;
      }
    };
    getBlogs();
  }, [aux]);

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

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('blogAppLoginData');
    setUser(null);
  };

  const handleCreate = async (event) => {
    try {
      event.preventDefault();
      const data = {
        title: title,
        author: author,
        url: URL,
        likes: 0,
      };

      const headers = {
        authorization: `Bearer ${user.token}`,
      };

      const response = await blogService.createBlog(data, headers);
      setAux(aux + 1);
      setSuccessMessage(`${response.title} successfully created`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (e) {
      console.log(e);
    }
  };

  const showSuccess = () => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'green',
          borderWidth: '1px',
          borderStyle: 'solid',
          color: 'green',
          backgroundColor: 'lightgray',
        }}
      >
        {successMessage}
      </div>
    );
  };

  const showError = () => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'red',
          borderWidth: '1px',
          borderStyle: 'solid',
          color: 'red',
          backgroundColor: 'lightgray',
        }}
      >
        {errorMessage}
      </div>
    );
  };

  if (user === null) {
    return (
      <>
        {errorMessage !== null && showError()}
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
      </>
    );
  }

  return (
    <>
      {successMessage !== null && showSuccess()}
      <p>
        Logged in as {user.username}{' '}
        <button onClick={handleLogout}>Logout</button>
      </p>
      <h2>Blogs</h2>
      <h3>Create new</h3>
      <div>
        <form onSubmit={handleCreate}>
          <div>
            Title:
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => {
                setTitle(target.value);
              }}
            />
          </div>

          <div>
            Author:
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => {
                setAuthor(target.value);
              }}
            />
          </div>

          <div>
            URL:
            <input
              type="text"
              value={URL}
              name="URL"
              onChange={({ target }) => {
                setURL(target.value);
              }}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default App;
