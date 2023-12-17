import React from 'react'
import { Link } from 'react-router-dom'
import "./invalid.css"

const InvalidUser = () => {
  return (
    <div className='text-danger anvalid  h3'> <ins style={{textDecoration:'underline'}}> Invalid User/ password</ins><br/><br/>
      <Link to='/loginUser'>Back to/Login</Link>
    </div>
  )
}

export default InvalidUser