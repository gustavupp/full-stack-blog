import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
} from 'react-router-dom'
import AddUser from './AddUser'
import AllUsers from './AllUsers'

const App = () => {
  return (
    <Router>
      <Route exact path="/">
        <AllUsers />
      </Route>
      <Route path="/add-user">
        <AddUser />
      </Route>
    </Router>
  )
}

export default App
