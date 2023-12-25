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
    const [selectedSubject, setSelectedSubject] = useState({});

    const [divisions, setDivisions] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState('');
    const [selectedDivisionValue, setSelectedDivisionValue] = useState('');

    const [qrData, setQRData] = useState('');
    const [showQR, setShowQR] = useState(false);
    const [userData, setUserData] = useState({});
    const user = useSelector(state => state.data);



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

    const generateQRCode = async () => {

        console.log(selectedSubject)
        console.log(selectedSemester)
        console.log(selectedDivision)
        console.log(selectedDivisionValue)
        // return
        const data =
            `
          course:${selectedCourse.name},
          subject:${selectedSubject.name},
          semester:${selectedSemester},
          division:${selectedDivisionValue},
          faculty:${userData.firstName + " " + userData.lastName}`

        const lectureDate = {
            facultyId: userData.id || 50,
            courseId: selectedCourse.id,
            divisionId: selectedDivision,
            subjectId: selectedSubject.id
        }
        console.log(lectureDate)

        const result = await PostData('createLecture', lectureDate)
        console.log(result)
        if (result.success) {
            console.log(result.data);
            // data.lectureId = result.id;
            const data =
                ` course:${selectedCourse.name},
                    subject:${selectedSubject.name},
                    semester:${selectedSemester},
                    division:${selectedDivisionValue},
                    faculty:${userData.firstName + " " + userData.lastName},
                    lectureId:${result.data.id}`
            setQRData(data);
            setShowQR(true);
            // setSubjects(subject?.data?.subjectData);
            // setDivisions(subject?.data?.divisionData)
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
    const handelSubjectChange = (e) => {
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

    useEffect(() => {
        const fetchSubject = async () => {
            try {
                // console.log(selectedSemester);
                const subject = await PostData('getSubjectandDivisonOfCourse', { courseId: selectedCourse.id, semester: selectedSemester });
                // console.log(subject.data.divisionData)
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

        setUserData(user);
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
                        onChange={handelSubjectChange}
                        value={selectedSubject}
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