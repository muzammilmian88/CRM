import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap modal components
import './AllTeachers.css';
import './Create.css';

export default function AllUsers() {
  const [teachers, setTeachers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the API endpoint
    const apiUrl = 'http://localhost:5000/all_teachers';

    // Use Axios to fetch data
    axios.get(apiUrl)
      .then(response => {
        // Update the state with the fetched data
        setTeachers(response.data);
        setLoading(false); // Set loading to false when data is received
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/teacher/${id}`);
      console.log(response.data);
      // Update the state after successful deletion
      setTeachers(teachers.filter(teacher => teacher._id !== id));
      // Close the modal after deletion
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  const handleShowDeleteModal = (id) => {
    // Set the selected teacher ID and show the delete modal
    setSelectedTeacherId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    // Reset the selected teacher ID and hide the delete modal
    setSelectedTeacherId(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <h2 className='text-center'>All Teachers</h2>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <p>Loading...</p>
        </div>
      ) : (
        <table className="table table-hover mt-5 custom-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>
                  <button
                    className='btn btn-danger btn-sm'
                    onClick={() => handleShowDeleteModal(teacher._id)}
                  >
                    Delete
                  </button>
                  <Link to={`/update_teacher/${teacher._id}`}>
                    <button type="button" className="btn btn-success btn-sm mx-2">
                      Update
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this teacher?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(selectedTeacherId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
