import React, { useState } from 'react';

// Dashboard component (formerly CreateFolder): Allows users to create a new folder.
// The component has been renamed from 'CreateFolder' to 'Dashboard' as requested.
// Its internal functionality, which is to handle folder creation, remains unchanged.
const Dashboard = () => {
  // State for the folder name input
  const [name, setName] = useState('');
  // State for displaying success messages to the user
  const [registrationStatus, setRegistrationStatus] = useState('');
  // State for displaying error messages to the user
  const [errorMessage, setErrorMessage] = useState('');

  // Handles the form submission for creating a folder
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (page reload)

    // Clear any previous status or error messages
    setRegistrationStatus('');
    setErrorMessage('');

    try {
      // --- Simulated API Call ---
      // In a real application, you would send this request to your backend server
      // to create a new folder entry in your database or file system.
      // The URL below is a placeholder. Replace with your actual backend endpoint.
      const response = await fetch('https://api.example.com/folders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send only the folder name in the request body
        body: JSON.stringify({
          folderName: name, // The key 'folderName' is an example, use what your API expects
        }),
      });

      // Simulate a network delay to mimic real API interaction
      await new Promise(resolve => setTimeout(resolve, 500));

      // Simulate an error response for demonstration purposes:
      // If the user types 'error' as the folder name, simulate a failure.
      if (name.toLowerCase() === 'error') {
        throw new Error('Simulated network error or server issue. Try a different name.');
      }

      // Check if the response was successful (HTTP status code 2xx)
      if (response.ok) {
        // Attempt to parse the response JSON.
        // In a real scenario, this might contain the new folder's ID or metadata.
        // The 'data' constant was removed as it was assigned but never used.
        await response.json().catch(() => ({})); // Handle cases where response might not be JSON
        setRegistrationStatus(`Folder '${name}' created successfully!`);
        setName(''); // Clear the input field on success
      } else {
        // If the server returned an error status (e.g., 400, 500), parse the error message
        const errorData = await response.json().catch(() => ({})); // Handle non-JSON error responses
        setErrorMessage(errorData.message || 'Failed to create folder. Please try again.');
      }
    } catch (error) {
      // Catch any network errors or errors thrown during the simulated process
      console.error('Error creating folder:', error);
      setErrorMessage(`An unexpected error occurred: ${error.message}`);
    }
  };

  return (
    <div className="create-folder-container p-6 bg-white rounded-lg shadow-md">
      {/* The heading still reflects the form's purpose: creating a folder */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create New Folder</h2>

      {/* Display success message if registrationStatus is set */}
      {registrationStatus && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{registrationStatus}</span>
        </div>
      )}

      {/* Display error message if errorMessage is set */}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Folder Name:</label>
          <input
            type="text"
            id="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter folder name"
            required // Make the input field mandatory
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Folder
        </button>
      </form>
    </div>
  );
};

// Placeholder for UploadFile component:
// This component provides a basic UI for file uploads.
// Actual file handling logic (e.g., interacting with a backend for uploads) would be added here.
const UploadFile = () => {
  return (
    <div className="upload-file-container p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upload New File</h2>
      <p className="text-gray-600 mb-4">Drag and drop your files here, or click to browse.</p>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center text-gray-500 hover:border-blue-400 transition duration-200 ease-in-out cursor-pointer">


        <p className="mt-2">Select a file to upload</p>
        {/* Hidden file input that can be triggered by clicking the div */}
        <input type="file" className="hidden" />
      </div>
    </div>
  );
};


// Main App component: Orchestrates the different views of the Simplified Drive.
export default function App() {
  // State to manage which content view is currently active ('home', 'createFolder', 'uploadFile')
  const [activeView, setActiveView] = useState('home');

  // Helper function to render content based on the activeView state
  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
              Welcome to My Drive
            </h2>

            {/* Action Buttons: Create Folder & Upload File */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                // When clicked, sets the active view to 'createFolder' (now rendered by Dashboard component)
                onClick={() => setActiveView('createFolder')}
                className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg text-xl font-semibold shadow-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
              >
                {/* Folder Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 0 00-2 2z" />
                </svg>
                Create Folder
              </button>
              <button
                // When clicked, sets the active view to 'uploadFile'
                onClick={() => setActiveView('uploadFile')}
                className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg text-xl font-semibold shadow-md hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
              >
                {/* Upload Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload File
              </button>
            </div>

            {/* Placeholder for file/folder listing */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">My Files and Folders</h3>
            </div>
          </>
        );
      case 'createFolder':
        return <Dashboard />;
      case 'uploadFile':
        return <UploadFile />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      {/* Header Bar */}
      <header className="bg-blue-600 shadow-md p-4 md:p-6 rounded-b-xl">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Logo/App Name - Clickable to return to home view */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight bg-blue-700 px-6 py-3 rounded-lg shadow-inner cursor-pointer"
                onClick={() => setActiveView('home')}>
              Simplified Drive
            </h1>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-3 md:gap-6">
            <button
              onClick={() => setActiveView('home')} // Home button functionality
              className="text-white hover:text-blue-200 text-lg md:text-xl font-medium transition duration-300 bg-transparent border-none cursor-pointer"
            >
              Home
            </button>
            <button className="bg-blue-500 text-white px-5 py-2 rounded-full text-lg md:text-xl font-semibold shadow-lg hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105">
              Sign Up
            </button>
            <button className="bg-blue-500 text-white px-5 py-2 rounded-full text-lg md:text-xl font-semibold shadow-lg hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105">
              Sign In
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area: Renders the active view */}
      <main className="container mx-auto p-4 md:p-8 mt-8">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-10">
          {renderContent()} {/* Dynamically render the content based on activeView */}
        </div>
      </main>
    </div>
  );
}
export { Dashboard, UploadFile, App};