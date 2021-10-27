import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Dataset from './pages/Dataset';
import Login from './pages/Login';
import Project from './pages/Project';
import Resource from './pages/Resource';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';

function App() {
  // router config
  // reference: https://reactrouter.com/web/guides/quick-start
  const routers = [
    {
      path: '/',
      component: Home
    },
    {
      path: '/dataset',
      component: Dataset
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/project',
      component: Project
    },
    {
      path: '/resource',
      component: Resource
    },
    {
      path : '/settings',
      component: Settings
    },
    {
      path: '*',
      component: NotFound
    }
  ]
  return (
    <div className="App">
      <Router>
        <Switch>
          {
            routers.map((router) =>
              <Route exact key={router.path} path={router.path}>
                {router.component}
              </Route>
            )
          }
        </Switch>
      </Router>
    </div>
  );
}

export default App;