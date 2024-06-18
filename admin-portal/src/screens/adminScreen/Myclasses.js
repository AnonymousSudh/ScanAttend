import React, { useState, memo } from 'react';
import { Paper, Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { PostData } from '../../utils/api';
import '../../styles/myClasses.css';
import { useDispatch, useSelector } from 'react-redux';

const Myclasses = memo(() => {
    const [date, setDate] = useState('');
    const [lectures, setLectures] = useState([]);
    const user = useSelector(state => state);
    console.log(user.auth.data, "user");
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await PostData('getMyLecture', {
                FacultyId: user.auth.data.id, // 
                Date: date
            });
            console.log(response, "response")
            setLectures(response.data);
        } catch (error) {
            console.error('Error occurred:', error);
        }
    }

    return (
        <div className='MyClassMainView'>
            <div className='dateSection'></div>
            <div className='chartSection'>
                <div>
                    <form onSubmit={handleSubmit} className='dateSelection'>
                        <div className="dateDiv">

                            <label>
                                Select a Date:
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </label>
                            <div className="butt">

                                <button type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                    <h2>Lectures:</h2>
                    {lectures.length > 0 ? (
                        <Paper elevation={3} className='lectureTable'>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Course</TableCell>
                                        <TableCell>Division</TableCell>
                                        <TableCell>Subject</TableCell>
                                        <TableCell>Subject Code</TableCell>
                                        <TableCell>Lecture Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {lectures.map((lecture, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{lecture.course_name}</TableCell>
                                            <TableCell>{lecture.division}</TableCell>
                                            <TableCell>{lecture.subject_name}</TableCell>
                                            <TableCell>{lecture.subjectCode}</TableCell>
                                            <TableCell>{new Date(lecture.lectureDate).toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>
                        </Paper>
                    ) : (
                        <Typography>No lectures found for the selected date.</Typography>
                    )}
                </div>
            </div>
        </div>
    );
});

export default Myclasses;
