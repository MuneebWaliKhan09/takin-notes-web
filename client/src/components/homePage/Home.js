import React, { useEffect } from 'react'
import '../index-todos/index.css'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';

const Home = () => {

    const [cookies] = useCookies();
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.UserCokie === undefined) {
            navigate('/loginUser')
        }

    },[cookies.UserCokie])




    return (
        <div>

            <div className='text-lg-center p-3 h2 mb-0 head bg-danger text-white'>
                <span className='bi bi-pen-fill text-white'></span>  Welcome To Todos App
            </div>
            <section className='bg d-flex justify-content-center align-items-center'>
                <button className='text'> <Link to='/createTodo' className='text-decoration-none'>Get Started</Link></button>
            </section>
        </div>
    )
}

export default Home