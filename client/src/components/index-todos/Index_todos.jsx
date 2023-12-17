import React from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import './index.css'
import Create_Todo from '../create_Todo/Create_Todo'
import Home from '../homePage/Home'
import Update_Todo from '../Update_Todo/Update_Todo'
import Delete_Todo from '../deleteTodo/Delete_Todo'
import Register from '../Register/Register'
import Login from '../Login/Login'
import InvalidUser from '../invalidUser/InvalidUser'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify';

const Index_todos = () => {
    const [cookie, setCokies, RemoveCokies] = useCookies();

    const Logout = () => {
        RemoveCokies("UserCokie");
        localStorage.removeItem('usersDataToken');
        sessionStorage.removeItem("UserName")
        toast.success("LogOut Done !", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        })



    };



    return (
        <div>
            <BrowserRouter>
                <header className='d-flex justify-content-between p-3 pe-4 ps-4  bg-warning align-items-center'>
                    <div>
                        <h2><Link className='text-decoration-none text-white' to='/home'>Notes App</Link></h2>
                    </div>
                    <nav className='d-flex gap-4'>

                        {
                            sessionStorage.getItem("UserName") ? (

                                <><Link onClick={Logout} to='/loginUser' className='btn btn-primary'>
                                    <span className='bi bi-person'></span> Logout
                                </Link>

                                    <Link className='btn text-light'>
                                        <span className='bi bi-person-fill text-dark'></span> {sessionStorage.getItem("UserName")}
                                    </Link></>
                            ) : (

                                <><Link to='/registerUser' className='btn btn-primary'>
                                    <span className='bi bi-person-add'></span> Register
                                </Link>

                                    <Link className='btn text-light'>
                                        <span className='bi bi-person-fill text-dark'></span> {sessionStorage.getItem("UserName")}
                                    </Link></>
                            )


                        }

                    </nav>
                </header>

                <div>


                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/createTodo' element={<Create_Todo />} />
                        <Route path='/updateTodo/:id' element={<Update_Todo />} />
                        <Route path='/deleteNotes' element={<Delete_Todo />} />
                        <Route path='/registerUser' element={<Register />} />
                        <Route path='/loginUser' element={<Login />} />
                        <Route path='/invalidUser' element={<InvalidUser />} />

                    </Routes>
                </div>

            </BrowserRouter>

        </div>
    )
}

export default Index_todos