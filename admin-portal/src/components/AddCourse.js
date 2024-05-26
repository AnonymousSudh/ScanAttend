import React, { useState } from 'react';
import { PostData } from '../utils/api';

const AddCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    // if (e.target.value.includes(' ')) {
    //   setSuccessMessage("White Space not allowed");
    //   setTimeout(() => {
    //     setSuccessMessage('');
    //   }, 3000);
    //   return
    // }
    setCourseName(e.target.value);
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {

      if (!courseName) {
        setSuccessMessage("Please Enter Course Name");
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
        return
      }
      const response = await PostData('addCourse', { name: courseName });

      console.log("response of add course", response)
      if (response.success) {
        // Handle success, show a success message or redirect
        console.log(response)
        setCourseName("")
        setSuccessMessage('Data saved successfully');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        setCourseName("")
        setSuccessMessage(response.error);
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
        console.error('Failed to add course');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleAddCourse} className='formcourse'>
        <div className="form-groupss">
          <label htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add Course</button>
        {successMessage ?? <p className="success-msg">{successMessage}</p>}
      </form>
    </div>
  );
};

export default AddCourse;