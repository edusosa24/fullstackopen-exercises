import Togglable from './Togglable';
import blogService from '../services/blog';

const Blog = ({ blog, user, aux, setAux, handleLike }) => {
  const handleDelete = async () => {
    try {
      const headers = {
        authorization: `Bearer ${user.token}`,
      };

      await blogService.deleteBlog(blog.id, headers);
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
          Liked {blog.likes} times{' '}
          <button onClick={() => handleLike(blog)}>Like</button>
        </p>
      </Togglable>
      <button onClick={handleDelete}>Delete</button>
      <br />
    </div>
  );
};

export default Blog;
