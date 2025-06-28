import React, { useState } from 'react';

const CreateFolder = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');
  const [gender, setGender] = useState(''); // New state for gender
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRegistrationStatus(null);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/Createfolder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          dob: age ? new Date(Date.now() - age * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : null,
          gender,
          contact,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setRegistrationStatus(`registered successfully!user ID: ${data.patientId}`);
        setName('');
        setAge('');
        setGender('');
        setContact('');
      } else {
        setErrorMessage(data.message || 'Failed to register.');
      }
    } catch (error) {
      console.error('Error registering patient:', error);
      setErrorMessage('An unexpected error occurred.');
    }
  };

  return (
    <div className="create-folder-container">
      <h2>Create Folder</h2>

      <form onSubmit={handleSubmit} className="patient-form">
        <div className="form-group">
          <label htmlFor="name">Folder  Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter patient name"
            required
          />
        </div>
      </form>

      {registrationStatus && (
        <div className="alert alert-success mt-3">{registrationStatus}</div>
      )}

      {errorMessage && (
        <div className="alert alert-danger mt-3">{errorMessage}</div>
      )}
    </div>
  );
};

export default CreateFolder;