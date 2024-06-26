import React, { useEffect, useState } from 'react'
import '../styles/addSubject.css';
import { PostData, getData } from '../utils/api';
function AddSubject() {
    const [successMessage, setSuccessMessage] = useState('');
    const [courses, setCourse] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        subjectCode: '',
        totalHours: '',
        courseId: '',
        semester: 1, // Default value for semester dropdown
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        console.log(name)
        console.log(value);
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        if (!formData.name || !formData.subjectCode || !formData.totalHours || !formData.courseId) {
            setSuccessMessage('Please Fill All Field');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
            return;
        }

        try {
            const response = await PostData('addCourseAndSubject', formData)
            // console.log("response AddSubject ", response)
            if (response.success) {
                setSuccessMessage('Data saved successfully');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            }

            else {
                setSuccessMessage(response.error);
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            }
        } catch (error) {
            // Handle fetch errors
            console.error('Error occurred:', error);
        }
    };
    useEffect(() => {
        const fetchAllCourse = async () => {
            const response = await getData('getAllCourse')
            setCourse(response.data);
        }
        fetchAllCourse();
    }, [])
    return (
        <div className="formontaineraddSubject">
            <form className='subjectForm'>
                <div className="form-group">
                    <label htmlFor="name">Subject Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="code">Subject Code:</label>
                    <input
                        type="text"
                        id="subjectCode"
                        name="subjectCode"
                        placeholder='Add Subject Code'
                        value={formData.subjectCode}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="course">Course:</label>
                    <select
                        id="course"
                        name="courseId"
                        value={formData.courseId}
                        onChange={handleChange}
                    >
                        <option value="">Select Course</option>
                        {courses.map((val) => (
                            <option key={val.id} value={val.id}>
                                {val.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="totalHours">Total Hours:</label>
                    <input
                        type="number"
                        id="totalHours"
                        name="totalHours"
                        value={formData.totalHours}
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
            </form>
            {successMessage && <p className="success-msg">{successMessage}</p>}
            <button onClick={handleSubmit} className='saveCourseAddSubject'>Add Subject </button>
        </div>
    )
}

export default AddSubject