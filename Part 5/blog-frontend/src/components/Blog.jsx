import Togglable from './Togglable';
import blogService from '../services/blog';

/* eslint-disable no-unused-vars */
const Blog = ({ blog, user, aux, setAux }) => {
  const handleLike = async () => {
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

      const response = await blogService.updateBlog(blog.id, data, headers);
      setAux(aux + 1);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async () => {
    try {
      const headers = {
        authorization: `Bearer ${user.token}`,
      };

      const response = await blogService.deleteBlog(blog.id, headers);
      setAux(aux + 1);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h3>{blog.title}</h3>
      <Togglable
        buttonLabelOpen={'Show details'}
        buttonLabelClose={'Hide details'}
      >
        <p>author: {blog.author}</p>
        <p>URL: {blog.url}</p>
        <p>
          Liked {blog.likes} times <button onClick={handleLike}>Like</button>
        </p>
      </Togglable>
      <button onClick={handleDelete}>Delete</button>
      <br />
    </div>
  );
};

export default Blog;
