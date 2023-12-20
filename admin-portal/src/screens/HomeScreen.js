import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import QRCode from 'qrcode.react';
import LogoutButton from '../components/LogoutButton';
import '../styles/Home.css'
import AddSubject from '../components/AddSubject';
import GenerateQR from '../components/GenerateQR';
import AddDivision from '../components/AddDivision';
import AddCourse from '../components/AddCourse';

function HomeScreen() {
  const [qrData, setQRData] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [userData, setUserData] = useState({});

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const user = useSelector(state => state.data);


  const data = useSelector(state => state);
  console.log(data)

  useEffect(() => {
    setUserData(user);

  }, [])
  return (
    <>
      <div className="qr-generator">

        <h1>{userData.firstName + " " + userData.lastName}</h1>
        <AddSubject />
        <AddCourse />
        <br />
        <br />
        <AddDivision />
        <br />
        {/* <button onClick={generateQRCode} className='generateQRbutton'>Generate QR Code</button>
        {showQR && (
          <div className="qr-code">
            <QRCode value={qrData} />
          </div>
        )} */}
        <br />
        <GenerateQR />
        <br />
        <br />
        <br />
        <LogoutButton redirectTo="/signup" />
      </div>
    </>
  )
}

export default HomeScreen