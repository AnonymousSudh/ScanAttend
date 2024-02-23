import React from 'react'
import AddCourse from '../../components/AddCourse'
import AddSubject from '../../components/AddSubject'
import LogoutButton from '../../components/LogoutButton'


function AdminHome() {
  return (
    <>
      <br />
      <br />
      <br />

      <AddCourse />
      <br />
      <br />
      <AddSubject />
      <br />
      <br />
      <LogoutButton />
    </>
  )
}

export default AdminHome