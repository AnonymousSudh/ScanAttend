import React, { useState } from 'react';
import { PostData } from '../utils/api';

const AddCourse = () => {
  const [courseName, setCourseName] = useState('');

  const handleInputChange = (e) => {
    setCourseName(e.target.value);
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();

    // Prepare data to be sent to the backend
    const dataToSend = {
      name: courseName,
    };

    // Perform the fetch request to save data
    try {
      const response = await PostData('addCourse',{name: courseName});

      if (response.success) {
        // Handle success, show a success message or redirect
        console.log(response)
        setCourseName("")
        console.log('Course added successfully');

      } else {
        // Handle errors from the backend
        console.error('Failed to add course');
      }
    } catch (error) {
      // Handle fetch errors
      console.error('Error occurred:', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleAddCourse}>
        <div className="form-group">
          <label htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;