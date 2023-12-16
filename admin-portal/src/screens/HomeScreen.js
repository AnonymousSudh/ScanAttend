import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import QRCode from 'qrcode.react';
import '../styles/Home.css'

function HomeScreen() {
  const [qrData, setQRData] = useState('');
  const [showQR, setShowQR] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const subject = 'java';
  const semester = 3;
  const Faculty = 'Rgg'
  const data = useSelector(state => state);
  console.log(data)

  const generateQRCode = () => {
    // Replace 'YOUR_DATA_HERE' with the data you want to encode in the QR code
    const data =
      `
      subject:${subject},
      semester:${semester},
      faculty:${Faculty};`

    setQRData(data);
    setShowQR(true);
  };


  useEffect(() => {

  })
  return (
    <>
      <div className="qr-generator">
        <button onClick={generateQRCode}>Generate QR Code</button>
        {showQR && (
          <div className="qr-code">
            <QRCode value={qrData} />
          </div>
        )}
      </div>
    </>
  )
}

export default HomeScreen