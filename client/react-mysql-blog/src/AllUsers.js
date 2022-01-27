import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

function AllUsers({ setEditing, getData, users }) {
  //const [posts, setPosts] = useState([])

  useEffect(() => {
    getFromServer()
  }, [users])

  //get all data from databse
  const getFromServer = async () => {
    try {
      const response = await fetch('http://localhost:3001/get')
      const data = await response.json()
      getData(data)
    } catch (error) {
      throw error
    }
  }

  //delete request
  const deleteUser = async (id) => {
    await fetch(`http://localhost:3001/delete/${id}`, {
      method: 'DELETE',
    }).then(() => console.log('user deleted'))
  }

  return (
    <main className="container">
      <h2 className="my-4 text-center my-5">All Posts</h2>
      <table className="table ">
        <thead className="thead-light">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">Status</th>
            <th scope="col">Admission</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((item) => {
              const { id, userName, email, gender, userStatus, admission } =
                item
              return (
                <tr key={id}>
                  <th scope="row">{id}</th>
                  <td>{userName}</td>
                  <td>{email}</td>
                  <td>{gender}</td>
                  <td>{userStatus}</td>
                  <td>{admission}</td>
                  <td>
                    <div className="d-flex">
                      <Link
                        to={`/user/:${id}`}
                        className="btn btn-info mr-2"
                        onClick={setEditing}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteUser(id)}
                      >
                        Del
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
      <Link to="/user/new-user" className="btn btn-success">
        Add User
      </Link>
    </main>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEditing: () => dispatch({ type: 'EDITING', payload: true }),
    getData: (data) => dispatch({ type: 'GET_DATA', payload: data }),
  }
}

const mapStateToProps = (state) => {
  const { users } = state
  return { users }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
