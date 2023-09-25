import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/LoginComponent'
import Protected from './components/ProtectedRoute'
import Popular from './components/PopularComponent'
import Search from './components/SearchComponent'
import EachMovieDetails from './components/EachMoviesComponent'
import NotFound from './components/NotFoundComponent'
import Account from './components/AccountComponent'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Protected exact path="/" component={Home} />
    <Protected exact path="/popular" component={Popular} />
    <Protected exact path="/account" component={Account} />
    <Protected exact path="/search" component={Search} />
    <Protected exact path="/movies/:id" component={EachMovieDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
