import React from 'react'
import "./index.css"
import { Field, Formik } from 'formik'
import { Form } from 'formik'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { UpdateContext } from '../context/Context'
import { useContext } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Update_Todo = () => {
  const { title, desc } = useContext(UpdateContext);


  const params = useParams();
  const navigate = useNavigate()


  
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
            Title: title,
            Description: desc
          }}

          onSubmit={(values) => {
            const { Title, Description } = values

            axios({
              method: "put",
              url: `/updatenotes/${params.id}`,
              data: {
                Title,
                Description
              }
            })
              .then((res) => {
                navigate("/createTodo")
                toast.success(res.data.message, notify)
                
              })
              .catch((erorr) => {
                console.log(erorr)
              })

          }}
        >


          <Form className='border border-2 border-danger p-4 pb-lg-5 rounded-4'>
            <div>

              <h3 className='text-center p-4'> <span className='bi bi-pen'></span> Update Todos Here</h3>
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

    </div>
  )
}

export default Update_Todo