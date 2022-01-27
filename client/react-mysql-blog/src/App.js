import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AddUser from './AddUser'
import AllUsers from './AllUsers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './reducer'
import TopSection from './TopSection'

const store = createStore(reducer)

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <TopSection />
        <Switch>
          <Route exact path="/">
            <AllUsers />
          </Route>
          {/* <Route path="/add-user">
        <AddUser />
      </Route> */}
          <Route exact path="/user/:id" children={<AddUser />}></Route>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
