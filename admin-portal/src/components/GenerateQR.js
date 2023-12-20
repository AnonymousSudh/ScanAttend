import React, { useState, useEffect } from 'react'
import { PostData, getData } from '../utils/api';
import QRCode from 'qrcode.react';
import { useSelector } from 'react-redux';


function GenerateQR() {

    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState({});
    const [semester, setSemester] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState('');

    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [divisions, setDivisions] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState('');
    const [qrData, setQRData] = useState('');
    const [showQR, setShowQR] = useState(false);
    const userData = useSelector(state => state.data);
    console.log(userData)

    // const handleCourseChange = async (e) => {
    //     const courseId = e.target.value;
    //     console.log(courseId)
    //     setSelectedCourse(courseId);
    // };

    const handleSemesterChange = async (e) => {
        const subjectId = e.target.value;
        setSelectedSemester(subjectId);
    };
    const handleSubjectChange = async (e) => {
        const subjectId = e.target.value;
        setSelectedSubject(subjectId);
    };

    const generateQRCode = () => {
        // Replace 'YOUR_DATA_HERE' with the data you want to encode in the QR code
        const data =
            `
          course:${selectedCourse.name},
          subject:${selectedSubject},
          division:${selectedDivision},
          semester:${2},
          faculty:${userData.firstName + userData.lastName}`

        setQRData(data);
        setShowQR(true);
        console.log()
        const lectureDate = {
            facultyId: userData.id,
            courseId: selectedCourse.id
            // divisionId:
        }
        console.log(lectureDate)
        // const createLecture = PostData('createLecture',)

    };
    const handleCourseChange = (e) => {
        const selectedIndex = e.target.selectedIndex;
        const selectedCourseId = e.target.options[selectedIndex].getAttribute('data-id');
        const selectedCourseName = e.target.options[selectedIndex].getAttribute('data-name');

        setSelectedCourse({ id: selectedCourseId, name: selectedCourseName });
    };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     // Prepare data to be sent to the backend
    //     const dataToSend = {
    //         courseId: selectedCourse,
    //         subjectId: selectedSubject,
    //         divisionId: selectedDivision,
    //     };

    //     // Perform the fetch request to save data
    //     try {
    //         const response = await fetch('YOUR_BACKEND_API_ENDPOINT', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(dataToSend),
    //         });

    //         if (response.ok) {
    //             // Handle success, show a success message or redirect
    //             console.log('Data saved successfully');
    //         } else {
    //             // Handle errors from the backend
    //             console.error('Failed to save data');
    //         }
    //     } catch (error) {
    //         // Handle fetch errors
    //         console.error('Error occurred:', error);
    //     }
    // };
    


  
      // run when semester changes
    
      useEffect(() => {
        const fetchSubject = async () => {
            try {
                console.log(selectedSemester);
                const subject = await PostData('getSubjectOfCourse', { courseId: selectedCourse.id,semester:selectedSemester });
                // console.log(subject)
                // return
                if (subject.success) {
                    setSubjects(subject.data);
                    // setDivisions(response.data.divisonData)
                } else {
                    console.error('Failed to fetch subjects');
                }
            } catch (error) {
                console.error('Error occurred while fetching subjects:', error);
            }

        };
        fetchSubject();
    }, [selectedSemester]);
// when course Changes
    useEffect(() => {
        const fetchSemester = async () => {
            try {
                console.log(selectedCourse);
                // return
                const semester = await PostData('getSemesterOfCourse', { course: selectedCourse.id });
                // const response = await PostData('addCourse', course)
                console.log(semester)
                if (semester.success) {
                    setSemester(semester.data);
                    // setDivisions(response.data.divisonData)
                } else {
                    console.error('Failed to fetch subjects');
                }
            } catch (error) {
                console.error('Error occurred while fetching subjects:', error);
            }

        };
        const fetchDivision = async () => {
            try {
                console.log(selectedCourse)
                const response = await PostData('getDivisioon', { course: selectedCourse });
                // const response = await PostData('addCourse', course)
                console.log(response)
                if (response.success) {
                    setSubjects(response.data);
                } else {
                    console.error('Failed to fetch subjects');
                }
            } catch (error) {
                console.error('Error occurred while fetching subjects:', error);
            }

        }
        fetchSemester();
    }, [selectedCourse])

    useEffect(() => {
        // Fetch courses data when the component mounts
        const getCourse = async () => {
            try {
                const response = await getData('getCourse')
                console.log(response)
                if (response.success) {
                    setCourses(response.data);
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
            <form>
                <div className="form-group">
                    <label htmlFor="course">Select Course:</label>
                    <select
                        id="course"
                        value={selectedCourse.id}
                        onChange={handleCourseChange}
                    >
                        <option value="">Select Course</option>
                        {courses.map((val) => (
                            <option key={val.id} value={val.id} data-id={val.id} data-name={val.name}>
                                {val.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Select Semester:</label>
                    <select
                        id="subject"
                        onChange={handleSemesterChange}
                        value={selectedSemester}
                    >
                        <option value="">Select Semester</option>
                        {semester.map((val) => (
                            <option key={val.semester} value={val.semester}>
                                {val.semester}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Select Subject:</label>
                    <select
                        id="subject"
                        onChange={handleSubjectChange}
                        value={selectedSubject}
                    >
                        <option value="">Select Subject</option>
                        {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                                {subject.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="division">Select Division:</label>
                    <select
                        id="division"
                        value={selectedDivision}
                        onChange={(e) => setSelectedDivision(e.target.value)}
                    >
                        <option value="">Select Division</option>
                        {divisions.map((division) => (
                            <option key={division} value={division}>
                                {division}
                            </option>
                        ))}
                    </select>
                </div>
            </form>

            <button onClick={generateQRCode} className='generateQRbutton'>Generate QR Code</button>
            <br />
            {showQR && (
                <div className="qr-code">
                    <QRCode value={qrData} />
                </div>
            )}
        </div>
    )
}

export default GenerateQR