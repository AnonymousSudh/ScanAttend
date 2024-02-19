import React, { useEffect, useState } from 'react'
// import { PostData, getData } from '../utils/api';
import { PostData, getData } from '../../utils/api';
import { useSelector } from 'react-redux';


// import './Form.css'; 

function AssignSubjectsToFaculty() {

    // State variables for form fields

    var [courses, setCourses] = useState([]);
    var [selectedCourse, setSelectedCourse] = useState({});
    var [semester, setSemester] = useState([]);
    var [selectedSemester, setSelectedSemester] = useState('');

    var [subjects, setSubjects] = useState([]);
    var [selectedSubject, setSelectedSubject] = useState({});

    var [divisions, setDivisions] = useState([]);
    var [selectedDivision, setSelectedDivision] = useState('');
    var [selectedDivisionValue, setSelectedDivisionValue] = useState('');

    var [faculty, setFaculty] = useState([]);


    const [userData, setUserData] = useState({});
    const user = useSelector(state => state.data);
    console.log("user", user)

    const clearForm = () => {
        setSelectedCourse({});
        setSelectedSemester('');
        setSelectedSubject({});
        setSelectedDivision('');
        setSelectedDivisionValue('')
    }


    const handleSemesterChange = async (e) => {
        const subjectId = e.target.value;
        setSelectedSemester(subjectId);
    };
    // const handleSubjectChange = async (e) => {
    //     const subjectId = e.target.value;
    //     setSelectedSubject(subjectId);
    // };



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

        const fetchFaculty = () => {
            

        }
        fetchFaculty()
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
        <div className="form-containerr">
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
                <div className="form-group">
                    <label htmlFor="selectFaculty">Select Faculty:</label>
                    <select
                        id="selectFaculty"
                        value={faculty}
                        onChange={(e) => setFaculty(e.target.value)}
                        required
                    >
                        <option value="">Select Faculty</option>
                        <option value="FacultyA">Faculty A</option>
                        <option value="FacultyB">Faculty B</option>
                        <option value="Facultyc">Faculty C</option>
                    </select>
                </div>
            </form>
            <button type="submit">Submit</button>
        </div>
    );

}

export default AssignSubjectsToFaculty