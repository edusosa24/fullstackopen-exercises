const Blog = ({ blog }) => (
  <div>
    <h3>{blog.title}</h3>
    <p>author: {blog.author}</p>
    <p>URL: {blog.url}</p>
    <p>Liked {blog.likes} times</p>
    <br />
  </div>
);

export default Blog;
