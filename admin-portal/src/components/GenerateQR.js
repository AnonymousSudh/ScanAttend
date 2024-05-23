import React, { useState, useEffect } from 'react'
import { PostData, getData } from '../utils/api';
import QRCode from 'qrcode.react';
import { useSelector } from 'react-redux';
import "../styles/generateQR.css"

function GenerateQR() {

    var [courses, setCourses] = useState([]);
    var [selectedCourse, setSelectedCourse] = useState({});
    var [semester, setSemester] = useState([]);
    var [selectedSemester, setSelectedSemester] = useState('');

    var [subjects, setSubjects] = useState([]);
    var [selectedSubject, setSelectedSubject] = useState({});

    var [divisions, setDivisions] = useState([]);
    var [selectedDivision, setSelectedDivision] = useState('');
    var [selectedDivisionValue, setSelectedDivisionValue] = useState('');

    const [qrData, setQRData] = useState('');
    const [showQR, setShowQR] = useState(false);
    const [userData, setUserData] = useState({});
    const user = useSelector(state => state);
    console.log("user", user)

    const clearForm = () => {
        setSelectedCourse({});
        setSelectedSemester('');
        setSelectedSubject({});
        setSelectedDivision('');
        setSelectedDivisionValue('')
        setShowQR(false)
    }


    // const handleCourseChange = async (e) => {
    //     const courseId = e.target.value;
    //     console.log(courseId)
    //     setSelectedCourse(courseId);
    // };

    const handleSemesterChange = async (e) => {
        const subjectId = e.target.value;
        setSelectedSemester(subjectId);
    };
    // const handleSubjectChange = async (e) => {
    //     const subjectId = e.target.value;
    //     setSelectedSubject(subjectId);
    // };

    const generateQRCode = async () => {

        console.log(selectedSubject)
        console.log(selectedSemester)
        console.log(selectedDivision)
        console.log(selectedDivisionValue)
        console.log(selectedCourse)

        if (!selectedCourse) {
            alert("Select Course")
            return;
        }
        if (!selectedSemester) {
            alert("Select semester")
            return;
        }
        if (!selectedSubject) {
            alert("Select Subject")
            return;
        }
        if (!selectedDivision) {
            alert("Select Division")
            return;
        }
        if (!selectedDivisionValue) {
            alert("Select Division Value")
            return;
        }

        const lectureDate = {
            facultyId: userData.id || 50,
            courseId: selectedCourse.id,
            divisionId: selectedDivision,
            subjectId: selectedSubject.id
        }
        console.log(lectureDate)
        const result = await PostData('createLecture', lectureDate)
        const lectureId = result.data.id
        console.log("Lecture result", result);
        console.log("lecture id ", lectureId)
        if (result.success) {
            console.log(result.data);
            // data.lectureId = result.id;
            const data =
                ` course:${selectedCourse.name},
                    subject:${selectedSubject.name},
                    semester:${selectedSemester},
                    division:${selectedDivisionValue},
                    faculty:${userData.firstName + " " + userData.lastName},
                    facultyId:${userData.id},
                    subjectId:${selectedSubject.id},
                    divisionId:${selectedDivision},
                    courseId:${selectedCourse.id},
                    lectureId:${lectureId}        
                    `
            setQRData(data);
            setShowQR(true);
            scrollToBottom();
        } else {
            console.error('Failed to fetch subjects');
        }


    };

    const handleCourseChange = (e) => {
        const selectedIndex = e.target.selectedIndex;
        const selectedCourseId = e.target.options[selectedIndex].getAttribute('data-id');
        const selectedCourseName = e.target.options[selectedIndex].getAttribute('data-name');

        setSelectedCourse({ id: selectedCourseId, name: selectedCourseName });
    };
    const handleSubjectChange = (e) => {
        const selectedIndex = e.target.selectedIndex;
        const selectedSubjectId = e.target.options[selectedIndex].getAttribute('data-id');
        const selectedSubjectName = e.target.options[selectedIndex].getAttribute('data-name');

        console.log(selectedSubjectId);
        console.log(selectedSubjectName);
        setSelectedSubject({ id: selectedSubjectId, name: selectedSubjectName });
    };
    const handleDivisonChange = (e) => {
        const selectedIndex = e.target.selectedIndex;
        const selectedDivisionId = e.target.options[selectedIndex].getAttribute('data-id');
        const selectedDivisionName = e.target.options[selectedIndex].getAttribute('data-name');
        console.log(selectedDivisionId, selectedDivisionName)
        setSelectedDivision(selectedDivisionId)
        setSelectedDivisionValue(selectedDivisionName);
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
    const scrollToBottom = () => {
        console.log("to bottom")
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth' // Optional smooth scrolling
        })
    };


    useEffect(() => {
        const fetchSubject = async () => {
            try {
                // console.log(selectedSemester);
                const subject = await PostData('getSubjectandDivisonOfCourse', { courseId: selectedCourse.id, semester: selectedSemester });
                console.log(subject.data.divisionData)
                console.log(subject)
                // return
                if (subject.success) {
                    setSubjects(subject?.data?.subjectData);
                    setDivisions(subject?.data?.divisionData)
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
                // console.log(selectedCourse);
                // return
                const semester = await PostData('getSemesterOfCourse', { course: selectedCourse.id });
                // const response = await PostData('addCourse', course)
                // console.log(semester)
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

        fetchSemester();
    }, [selectedCourse])

    useEffect(() => {

        setUserData(user.auth.data);
        const getCourse = async () => {
            try {
                const response = await getData('getAllCourse')
                // console.log(response)
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
        <div className="generateQRDiv" >

            <div className="form_container">

                <div>

                    <form className="form">
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
                                value={selectedSemester}
                                onChange={handleSemesterChange}
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
                                value={selectedSubject.id}
                            >
                                <option value="">Select Subject</option>
                                {subjects.map((subject) => (
                                    <option key={subject.id} value={subject.id} data-id={subject.id} data-name={subject.name}>
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
                                onChange={handleDivisonChange}
                            >
                                <option value="">Select Division</option>
                                {divisions.map((division) => (
                                    <option key={division.id} value={division.id} data-id={division.id} data-name={division.division}>
                                        {division.division}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </form>
                    <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", marginTop: "15px" }}>

                        <button onClick={generateQRCode} className='generateQRbutton'>Generate QR Code</button>
                        <button onClick={clearForm} className='generateQRbutton'>Clear</button>
                    </div>
                </div>
                <div >


                    <br />
                    {showQR && (
                        <div className="qr">
                            <QRCode value={qrData}
                                size={400}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default GenerateQR