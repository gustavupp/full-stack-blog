import { useState } from 'react'

function App() {
  const [post, setPost] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <main className="container">
      <h1 className="my-4 text-center">Blog Posts</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="title">Post Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="title"
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="textarea">Post Content</label>
          <textarea
            class="form-control"
            id="textarea"
            rows="7"
            placeholder="Your blog post..."
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </main>
  )
}

export default App
