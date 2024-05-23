import React from 'react'
import AddCourse from '../../components/AddCourse'
import AddSubject from '../../components/AddSubject'
import LogoutButton from '../../components/LogoutButton'
import AssignSubjectsToFaculty from './AssignSubjectsToFaculty'
import AddDivision from '../../components/AddDivision'

function AdminHome() {
  return (
    <>
      <br />
      <AddCourse />
      <br />
      <AddDivision />
      <br />
      <br />
      <AddSubject />
      <br />
      <br />
      <AssignSubjectsToFaculty />
      <br />
      <LogoutButton />
    </>
  )
}

export default AdminHome