// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateStudent from './components/CreateStudent';
import AllStudents from './components/AllStudents';
import UpdateStudent from './components/UpdateStudent';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AuthComponent from './components/AuthComponent';
import AllTeachers from './components/AllTeachers';
import UpdateTeacher from './components/UpdateTeacher';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Weather from './components/Weather/Weather';

function App() {
  return (
    <>
    <Weather/>
      {/* <BrowserRouter>
        <AuthComponent Component={Navbar} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SignUp />} />

          <Route
            path="/create_student"
            element={<AuthComponent Component={CreateStudent} />}
          />
            <Route
            path="/create_course"
            element={<AuthComponent Component={CreateCourse} />}
          />
         
            <Route
            path="/all_teachers"
            element={<AuthComponent Component={AllTeachers} />}
          />
          <Route
            path="/all_students"
            element={<AuthComponent Component={AllStudents} />}
          />
          <Route
            path="/update_student/:id"
            element={<AuthComponent Component={UpdateStudent} />}
          />
           <Route
            path="/update_teacher/:id"
            element={<AuthComponent Component={UpdateTeacher} />}
          />
        </Routes>
      </BrowserRouter> */}
    </>
  );
}

export default App;
