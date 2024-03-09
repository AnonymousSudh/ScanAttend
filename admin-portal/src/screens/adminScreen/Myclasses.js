import React, { useState } from 'react'
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import '../../styles/myClasses.css'

function Myclasses() {
    const [date, setDate] = useState('');
    const [response, setResponse] = useState('');
    const [value, setValue] = React.useState(dayjs('2022-04-17'));

    const handleSubmit = () => {

    }
    return (
        <>
            <div className='dateSection'></div>
            <div className='chartSection'>
                <div>
                    <form onSubmit={handleSubmit} className='dateSelection'>
                        <label>
                            Select a Date:
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                    {response && (
                        <div>
                            <h2>Response from Backend:</h2>
                            <p>{response}</p>
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}

export default Myclasses