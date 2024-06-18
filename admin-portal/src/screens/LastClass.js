import React from 'react'
import { getData, fetchDataByQuery } from '../utils/api'
import { useDispatch, useSelector } from 'react-redux';

function LastClass() {
    const user = useSelector(state => state);
    console.log(user.auth.data, "user");
    const getlastClassAttendData = async () => {
        const data = await fetchDataByQuery('lastClassAttendData', { facultyId: user.auth.data.id })
    }
    getlastClassAttendData()
    return (
        <div>Show list of students having preset and absent</div>
    )
}

export default LastClass