import React, { useState } from 'react'
import { Link } from 'react-router-dom'
//import Axios from 'axios'

export const AddUser = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    postToDatabase({ title, content })
  }

  //post request wit Axios
  /*const submitToServer = () => {
    Axios.post('http://localhost:3001/post', {
      title,
      content,
    }).then(() => console.log('success'))
  }*/

  //post request
  const postToDatabase = async () => {
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

    try {
      await fetch('http://localhost:3001/post', options).then(() =>
        console.log('success')
      )
    } catch (error) {
      throw error
    }
  }

  return (
    <main className="container">
      <h2 className="my-4 text-center">Create a New Post</h2>
      <Link to="/" className="btn btn-success my-4">
        All Users
      </Link>
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
            rows="3"
            placeholder="Your blog post..."
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mr-3">
          Submit
        </button>
      </form>
    </main>
  )
}

export default AddUser
