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
  const dispatch = useDispatch();
  const navigation = useNavigate();


  const data = useSelector(state => state);
  console.log(data)

  useEffect(() => {

  })
  return (
    <>
      <div className="qr-generator">
        <AddSubject />
        <AddCourse/>
        <br />
        <br />
        <AddDivision/>
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