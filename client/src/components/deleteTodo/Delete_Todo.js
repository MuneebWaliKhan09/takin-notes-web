import React from 'react'
import { Link } from 'react-router-dom'
const Delete_Todo = () => {
  return (
    <div>
      <h3 className='text-danger text-center p-4'> Notes Deleted Succesfully</h3>
      <div className='text-center'>

       <Link  to='/createTodo'>Back to Notes</Link>
      </div>
    </div>
  )
}

export default Delete_Todo