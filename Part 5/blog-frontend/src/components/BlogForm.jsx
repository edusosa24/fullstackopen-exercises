import { useState } from 'react';
import blogService from '../services/blog';

const BlogForm = ({ setSuccessMessage, blogFormRef, aux, setAux, user }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [URL, setURL] = useState('');

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
      blogFormRef.current.toggleVisibility();
      setSuccessMessage(`${response.title} successfully created`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (e) {
      console.log(e);
    }
  };

  return (
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
  );
};

export default BlogForm;
