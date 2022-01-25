import { useState } from 'react'
//import Axios from 'axios'

function App() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    submitToServer()
  }

  const submitToServer = () => {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        title,
        content,
      }),
    }

    fetch('http://localhost:3001/post', options).then(() =>
      console.log('success')
    )
  }

  const getFromServer = async () => {
    await fetch('http://localhost:3001/get')
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  }

  //with Axios
  /*const submitToServer = () => {
    Axios.post('http://localhost:3001/post', {
      title,
      content,
    }).then(() => console.log('success'))
  }*/

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
        <button type="submit" className="btn btn-primary mr-3">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={getFromServer}
        >
          Get
        </button>
      </form>
      <ul></ul>
    </main>
  )
}

export default App
