import { React, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Home from './pages/Home';
import Dataset from './pages/Dataset';
import Login from './pages/Login';
import Register from './pages/Register';
import Project from './pages/Project';
import Resource from './pages/Resource';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import { Button, Menu, message } from 'antd';
import { HomeOutlined, AppstoreOutlined, SettingOutlined, HddOutlined } from '@ant-design/icons';
import ProjectDetail from './pages/ProjectDetail';
import CustomRoute from './components/CustomRoute';
import { get } from './request';

function App() {
  // router config
  // reference: https://reactrouter.com/web/guides/quick-start
  const routers = [
    {
      path: '/',
      component: Home,
      checkAuth: false
    },
    {
      path: '/dataset',
      component: Dataset,
      checkAuth: true,
      loginRequired: true,
      redirectPath: '/login'
    },
    {
      path: '/login',
      component: Login,
      checkAuth: true,
      loginRequired: false,
      redirectPath: '/project'
    },
    {
      path: '/register',
      component: Register,
      checkAuth: true,
      loginRequired: false,
      redirectPath: '/project'
    },
    {
      path: '/project',
      component: Project,
      checkAuth: true,
      loginRequired: true,
      redirectPath: '/login'
    },
    {
      path: '/project-detail/:projectId',
      component: ProjectDetail,
      checkAuth: true,
      loginRequired: true,
      redirectPath: '/login'
    },
    {
      path: '/settings',
      component: Settings,
      checkAuth: true,
      loginRequired: true,
      redirectPath: '/login'
    },
    {
      path: '*',
      component: NotFound,
      checkAuth: false
    }
  ]

  const handleLogout = async () => {
    try {
      await get('/logout')
      window.open('/', '_top')
    } catch (e) {
      console.error(e)
      message.error("Log out failed.")
    }
  }
  return (
    <div className="App">
      <Router>
        <div style={{ display: 'flex', backgroundColor: '#001529', alignItems: 'center' }}>
          <Menu mode="horizontal" theme='dark' style={{ flex: 1 }}>
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
          <Button onClick={handleLogout} type="link" style={{ height: '100%', color: '#FF662B' }}>Log out</Button>
        </div>
        <Switch>
          {
            routers.map((router) =>
              router.checkAuth ? <CustomRoute component={router.component} loginRequired={router.loginRequired} key={router.path}
                redirectPath={router.redirectPath} path={router.path} exact /> :
                <Route exact key={router.path} path={router.path} component={router.component} />
            )
          }
        </Switch>
      </Router>
    </div >
  );
}

export default App;