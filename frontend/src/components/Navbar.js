import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Create a separate CSS file for styling

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.clear();
    navigate('/');
    console.log('Logout');
  };

  return (
    <>
      <div className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Giftx
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/create_student" className="nav-link active" aria-current="page">
                  Create Student
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/all_students" className="nav-link active" aria-current="page">
                  All Students
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/all_teachers" className="nav-link active" aria-current="page">
                  All Teachers
                </Link>
              </li>
             
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button onClick={handleLogout} className="btn btn-outline-danger" type="submit">
                Logout
              </button>
             
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
