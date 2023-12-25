import React, { useState, useEffect } from 'react'
import '../styles/addCourse.css';
import { PostData, getData } from '../utils/api';
function AddDivision() {
    const [successMessage, setSuccessMessage] = useState('');
    const [course, setCourse] = useState([])
    const [courseID, setCourseID] = useState([])
    const [formData, setFormData] = useState({
        year: '',
        courseId: '',
        division: '',
        semester: '1', // Default value for semester dropdown
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        return
        // Fetch POST request to send data to the backend
        try {
            const response = await PostData('addDivision', formData)
            console.log(response)
            if (response.success) {
                setSuccessMessage('Data saved successfully');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            }

            else {
                // Handle errors from the backend
                console.error('Failed to save data');
            }
        } catch (error) {
            // Handle fetch errors
            console.error('Error occurred:', error);
        }
    };

    useEffect(() => {

        // setUserData(user);
        const getCourse = async () => {
            try {
                const response = await getData('getAllCourse')
                // console.log(response)
                if (response.success) {
                    setCourse(response.data);
                } else {
                    console.error('Failed to fetch courses');
                }
            } catch (error) {
                console.error('Error occurred while fetching courses:', error);
            }
        };

        getCourse();
    }, []);
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="course">Select Course:</label>
                    <select
                        id="course"
                        value={course.id}
                        onChange={(e) => {
                            setFormData({ ...formData, courseId: e.target.value });
                        }}
                    >
                        <option value="">Select Course</option>
                        {course.map((val) => (
                            <option key={val.id} value={val.id} data-id={val.id} data-name={val.name}>
                                {val.name}
                            </option>
                        ))}
                    </select>
                </div>
                {/* <div className="form-group">
                    <label htmlFor="code">Course:</label>
                    <input
                        type="text"
                        id="stream"
                        name="stream"
                        value={formData.stream}
                        onChange={handleChange}
                    />
                </div> */}
                <div className="form-group">
                    <label htmlFor="name">Year:</label>
                    <input
                        type="text"
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                    />
                </div>


                <div className="form-group">
                    <label htmlFor="semester">Semester:</label>
                    <select
                        id="semester"
                        name="semester"
                        value={formData.semester}
                        onChange={handleChange}
                    >
                        {[1, 2, 3, 4, 5, 6].map((semester) => (
                            <option key={semester} value={semester}>
                                Semester {semester}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="code">Divison:</label>
                    <input
                        type="text"
                        id="division"
                        name="division"
                        value={formData.division}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className='saveCourse'>Add Division</button>
                {successMessage && <p className="success-msg">{successMessage}</p>}
            </form>
        </div>
    )
}

export default AddDivision