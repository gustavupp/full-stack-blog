import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
//import Axios from 'axios'

export const AddUser = ({ edit, users, dispatch }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [status, setStatus] = useState('')
  const id = parseInt(useParams().id.slice(1))

  useEffect(() => {
    if (edit) {
      const editingUser = users.find((user) => user.id === id)
      setName(editingUser.userName)
      setEmail(editingUser.email)
      setGender(editingUser.gender)
      setStatus(editingUser.userStatus)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    postToDatabase({ name, email, gender, status })
    setName('')
    setEmail('')
    setGender('')
    setStatus('')
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
        name,
        email,
        gender,
        status,
      }),
    }

    try {
      await fetch('http://localhost:3001/post', options).then(() =>
        console.log('User Added')
      )
    } catch (error) {
      throw error
    }
  }

  //update request
  const updateUser = async (e) => {
    e.preventDefault()
    const options = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        name,
        email,
        id,
        gender,
        status,
      }),
    }

    await fetch('http://localhost:3001/user', options)
      .then(() => console.log('User updated'))
      .catch((err) => console.log(err))
  }

  return (
    <main className="container">
      <h2 className="my-4 text-center">Create a New Post</h2>
      <Link
        to="/"
        className="btn btn-success my-4"
        onClick={() => dispatch({ type: 'EDITING', payload: false })}
      >
        All Users
      </Link>
      <form onSubmit={edit ? updateUser : handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Post Title</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="radios d-flex ">
          <p className="mr-4">Gender: </p>
          <div className="pr-4 form-check">
            <input
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="form-check-input"
              type="radio"
              name="gender"
              id="male"
              value="male"
            ></input>
            <label htmlFor="male">Male</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="female"
              value="female"
            ></input>
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <div className="radios d-flex ">
          <p className="mr-4">Status: </p>
          <div className="pr-4 form-check">
            <input
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="form-check-input"
              type="radio"
              name="status"
              id="active"
              value="active"
            ></input>
            <label htmlFor="active">Active</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="status"
              id="inactive"
              value="inactive"
            ></input>
            <label htmlFor="inactive">Inactive</label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mr-3">
          {edit ? 'Save' : 'Submit'}
        </button>
      </form>
    </main>
  )
}

const mapStateToProps = (state) => {
  const { edit, users } = state

  return { edit, users }
}

export default connect(mapStateToProps)(AddUser)
