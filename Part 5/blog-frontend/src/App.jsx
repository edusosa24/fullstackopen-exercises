import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blog';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [aux, setAux] = useState(0);

  const blogFormRef = useRef();

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

        setBlogs(sortedBlogs);
      } catch (e) {
        return e;
      }
    };
    getBlogs();
  }, [aux]);

  useEffect(() => {
    const userData = JSON.parse(
      window.localStorage.getItem('blogAppLoginData')
    );
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleLike = async (blog) => {
    try {
      const data = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
      };
      const headers = {
        authorization: `Bearer ${user.token}`,
      };

      await blogService.updateBlog(blog.id, data, headers);
      setAux(aux + 1);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('blogAppLoginData');
    setUser(null);
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
        {successMessage !== null && showSuccess()}
        <Togglable buttonLabelOpen={'Login'} buttonLabelClose={'Cancel'}>
          <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
        </Togglable>
      </>
    );
  }

  return (
    <>
      {errorMessage !== null && showError()}
      {successMessage !== null && showSuccess()}
      <p>
        Logged in as {user.username}{' '}
        <button onClick={handleLogout}>Logout</button>
      </p>
      <br />
      <h2>Blogs</h2>
      <br />
      <h3>Create new blog</h3>
      <Togglable
        buttonLabelOpen={'Create'}
        buttonLabelClose={'Close'}
        ref={blogFormRef}
      >
        <BlogForm
          aux={aux}
          setAux={setAux}
          setSuccessMessage={setSuccessMessage}
          blogFormRef={blogFormRef}
          user={user}
        />
      </Togglable>
      <br />
      {blogs.map((blog) => (
        <Blog
          aux={aux}
          setAux={setAux}
          user={user}
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
        />
      ))}
    </>
  );
};

export default App;
