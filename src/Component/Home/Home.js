import React from 'react'
import { Link } from "react-router-dom";
import style from './Home.module.css'
import logo from './logo.png'
import { Button } from 'react-bootstrap'

function Home() {
    return (
        <section className={style.homeSection}>
            <div className={style.container}>
                <img className={style.image} src={logo} alt="Not available"></img>
                <h1>Take A Quiz</h1>
                <Link to='/quiz' > <Button className="mt-2" variant="success" size='lg'>Go To Quiz Page</Button></Link>
                <div className="d-flex mt-4">
                    <Link to='/register' > <Button className="mr-4" variant="warning" size='lg'>Register</Button></Link>
                    <Link to='/login' > <Button variant="danger" size='lg'>Login</Button></Link>
                </div>
            </div>
        </section>

    )
}

export default Home