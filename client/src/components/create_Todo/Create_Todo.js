import React, { useEffect, useState } from 'react'
import "./index.css"
import { Field, Formik } from 'formik'
import { Form } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { UpdateContext } from '../context/Context'
import { useContext } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify'
const Create_Todo = () => {

  const { fetchData } = useContext(UpdateContext);
  const [todos, setTodos] = useState([])
  const navigate = useNavigate()

  const [cookies] = useCookies();

  useEffect(() => {
    if (cookies.UserCokie === undefined) {
      navigate('/loginUser')
    }

  },[navigate, cookies.UserCokie])



  useEffect(() => {
    axios({
      method: "get",
      url: "/allnotes",
    })
      .then((res) => {
        setTodos(res.data)
        // console.log(res.data)

      })
      .catch((erorr) => {
        console.log(erorr)
      })
  }, [])


  const handleDelete = (_id) => {
    console.log(_id)

    axios.delete(`/deletenotes/${_id}`)
      .then((res) => {
        // Update the products list after successful deletion
        setTodos(todos.filter((item) => item._id !== _id));
        navigate('/deleteNotes')
        toast.success(res.data.message, notify)
      }).catch(() => {
        alert("not deleted the product")
      });


  }


  const notify = {

    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",


  };



  return (
    <div>
      <div className='container col-5  p-4'>
        <Formik
          initialValues={{
            Title: "",
            Description: ""
          }}

          onSubmit={(values) => {
            const { Title, Description } = values

            axios({
              method: "post",
              url: " /addnotes",
              data: {
                Title,
                Description
              }
            })
              .then((res) => {
                console.log(res.data)
                toast.success(res.data.messsage, notify)
                setTimeout(() => {

                  window.location.reload();
                }, 2000)
              })
              .catch((erorr) => {
                console.log(erorr)
              })

          }}
        >


          <Form className='border border-2 border-danger p-4 pb-lg-5 rounded-4'>
            <div>

              <h3 className='text-center p-4'> <span className='bi bi-pen'></span> Create Todos Here</h3>
            </div>
            <br />
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
              <Field type="text" className="form-control" name='Title' />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
              <Field className="form-control p-4" type='text' name='Description' />
            </div>

            <div className='mt-lg-5'>
              <button className='btn btn-dark w-100'>Add Notes</button>
            </div>


          </Form>

        </Formik>

      </div>

      <div className=' mt-lg-5 p-1'>

        <table className='table table-hover border border-2'>
          <tr className='textRow1  '>
            {/* <th className='text-danger p-2'>Id</th> */}
            <th className=' p-2 pb-5 mb-4 text2'>Title</th>
            <th className=' p-2 pb-5 mb-4 text2'> Description</th>
          </tr>

          <tbody>

            {
              todos.map((items) => (

                <tr key={items._id} className='textRow2 m-3'>

                  {/* <td>{items._id}</td> */}
                  <td className='text3Title'>{items.Title}</td>
                  <td className='text3Desc'>{items.Description}</td>
                  <td>

                    <Link className='p-2' onClick={() => fetchData(items.Title, items.Description)} to={"/updateTodo/" + items._id}>
                      <span className='bi bi-pen btn btn-warning mb-2 mt-2' title='Update Text'></span>
                    </Link>


                    <Link className='p-2' onClick={() => handleDelete(items._id)}>
                      <span className='bi bi-trash btn btn-danger mb-2 mt-2' title='Remove Text'></span>
                    </Link>
                  </td>



                </tr>

              ))
            }
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Create_Todo