import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap modal components

export default function AllStudents() {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setShowDeleteModal(true);
  };

  const fetchUsers = async () => {
    try {
      setLoading(true); // Set loading to true when starting to fetch data
      const response = await axios.get('http://localhost:5000/student/');
      setUsers(response.data);
      setLoading(false); // Set loading to false when data is received
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/student/${selectedUserId}`);
      setDeleteSuccess(true);
      handleCloseDeleteModal();
      // Optional: Update the user list after deletion
      fetchUsers();
    } catch (error) {
      console.log('Error while deleting user:', error);
      setDeleteError(true);
      handleCloseDeleteModal();
    }
  };

  useEffect(() => {
    // Fetch all users when the component mounts
    fetchUsers();
  }, []); // The empty dependency array ensures that the effect runs only once on mount

  return (
    <div className="container my-2">
      <h2 className="text-center">All Students</h2>
      {loading ? (
        <div className="text-center mt-3">
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          {/* Delete Success Alert */}
          {deleteSuccess && (
            <div className="alert alert-success mt-3" role="alert">
              User deleted successfully!
            </div>
          )}

          {/* Delete Error Alert */}
          {deleteError && (
            <div className="alert alert-danger mt-3" role="alert">
              Error deleting user. Please try again.
            </div>
          )}

          <div className="row mt-4">
            {users?.map((user) => (
              <div className="col-md-4 mt-4" key={user._id}>
                <div className="card" style={{ backgroundColor: '#98c5db'}}>
                  <div className="card-body">
                    <h5 className="card-title">Name: {user.name}</h5>
                    <h6 className="card-subtitle text-body-secondary">Email: {user.email}</h6>
                    <p className="muted-text">Age: {user.age}</p>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleShowDeleteModal(user._id)}
                    >
                      Delete
                    </button>
                    <Link to={`/update_student/${user._id}`}>
                      <button type="button" className="btn btn-success mx-2">
                        Update
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
