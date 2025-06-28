import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function UploadFile() {
  const [programName, setProgramName] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmissionStatus(null);
    try {
      const response = await fetch('http://localhost:5000/api/updatefile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          programName: programName, // Corrected line: using the state variable directly
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Server Response:', data);
      setSubmissionStatus('success');
      // Reset form fields after successful submission

      setProgramName('');

    } catch (error) {
      console.error('Error:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <section id="schoolApplications" className="container mt-5">
      <h2>UploadFile</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="program" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id=""
            name="Name"
            value={programName}
            onChange={(e) => setProgramName(e.target.value)}
            required
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>

        {submissionStatus === 'success' && (
          <div className="col-12 mt-3 text-success">
           uploaded successfully!
          </div>
        )}

        {submissionStatus === 'error' && (
          <div className="col-12 mt-3 text-danger">
            upload failed. Please try again.
          </div>
        )}
      </form>
    </section>
  );
}

export default UploadFile;