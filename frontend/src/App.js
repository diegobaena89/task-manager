import React, { Component, Fragment } from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes in addition to Route
import { inject, observer } from 'mobx-react';

import SignInPage from './pages/signin/SignInPage';
import SignUpPage from './pages/signup/SignUpPage';
import TasksPage from './pages/tasks/TasksPage';
import CreateTaskPage from './pages/create-task/CreateTaskPage';

@inject('routerStore')
@observer
class App extends Component {
  render() {
    return (
      <Routes> 
          <Route path="/" element={<SignInPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/create" element={<CreateTaskPage />} />
        </Routes>
    );
  }
}

export default App;
