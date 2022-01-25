import { useState } from 'react'
import Axios from 'axios'

function App() {
  //const [posts, setPosts] = useState({})
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    //setPosts({ title, content })
    submitToServer()
  }

  const submitToServer = () => {
    Axios.post('http://localhost:3001/post', {
      title,
      content,
    }).then(() => console.log('success'))
  }

  return (
    <main className="container">
      <h1 className="my-4 text-center">Blog Posts</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Post Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="title"
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="textarea">Post Content</label>
          <textarea
            className="form-control"
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
