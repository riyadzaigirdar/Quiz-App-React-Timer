import axios from 'axios'
import { useState, useEffect } from 'react'


export const useFetchExam = () => {
    const [state, setState] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/exams")
            .then(res => {
                setState(res.data)
            })
            .catch(e => console.log(e.message))
    }, [])


    return state

}

export const calculateTimeLeft = () => {

    let difference = +new Date('2020-07-24T14:28:00') - +new Date();

    let timeLeft = {};
    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    }

    return timeLeft

}

