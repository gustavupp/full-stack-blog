import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function AllUsers() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getFromServer()
  }, [posts])

  const getFromServer = async () => {
    try {
      const response = await fetch('http://localhost:3001/get')
      const data = await response.json()

      setPosts(data)
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
            <th scope="col">Title</th>
            <th scope="col">Content</th>
            <th scope="col">Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts &&
            posts.map((item) => {
              const { id, title, content, postDate } = item
              return (
                <tr key={id}>
                  <th scope="row">{id}</th>
                  <td>{title}</td>
                  <td>{content}</td>
                  <td>{postDate}</td>
                  <td>
                    <div className="d-flex">
                      <button className="btn btn-info mr-2">Edit</button>
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
      <Link to="/add-user" className="btn btn-success">
        Add User
      </Link>
    </main>
  )
}

export default AllUsers
