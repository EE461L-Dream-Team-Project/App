import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Home from './pages/Home';
import Dataset from './pages/Dataset';
import Login from './pages/Login';
import Register from './pages/Register';
import Project from './pages/Project';
import Resource from './pages/Resource';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import { Menu } from 'antd';
import { HomeOutlined, AppstoreOutlined, SettingOutlined, HddOutlined } from '@ant-design/icons';
import ProjectDetail from './pages/ProjectDetail';
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
      path: '/register',
      component: Register
    },
    {
      path: '/project',
      component: Project
    },
    {
      path: '/project-detail/:projectId',
      component: ProjectDetail
    },
    {
      path: '/resource',
      component: Resource
    },
    {
      path: '/settings',
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
        <Menu mode="horizontal" theme='dark' style={{ display: 'flex' }}>
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to='/'>
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="project" icon={<AppstoreOutlined />}>
            <Link to="/project">
              Project
            </Link>
          </Menu.Item>
          <Menu.Item key="datasets" icon={<HddOutlined />}>
            <Link to='/dataset'>
              Datasets
            </Link>
          </Menu.Item>
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            <Link to="/settings">
              Settings
            </Link>
          </Menu.Item>
        </Menu>
        <Switch>
          {
            routers.map((router) =>
              <Route exact key={router.path} path={router.path} component={router.component} />
            )
          }
        </Switch>
      </Router>
    </div >
  );
}

export default App;