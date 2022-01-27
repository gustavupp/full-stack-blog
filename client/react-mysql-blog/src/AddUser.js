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
    <main className="container my-5">
      {/* edit button */}

      <Link
        to="/"
        className="btn btn-success my-4"
        onClick={() => dispatch({ type: 'EDITING', payload: false })}
      >
        All Users
      </Link>
      <form onSubmit={edit ? updateUser : handleSubmit}>
        {/* name */}
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

        {/* email */}
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

        {/* gender */}
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
              checked={gender === 'male' ? 'checked' : ''}
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
              onChange={(e) => setGender(e.target.value)}
              checked={gender === 'female' ? 'checked' : ''}
            ></input>
            <label htmlFor="female">Female</label>
          </div>
        </div>

        {/* status */}
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
              checked={status === 'active' ? 'checked' : ''}
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
              onChange={(e) => setStatus(e.target.value)}
              checked={status === 'inactive' ? 'checked' : ''}
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
