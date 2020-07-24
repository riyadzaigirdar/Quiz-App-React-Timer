import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { calculateTimeLeft } from '../../Hook/hook'
let answerPaper = []


function Exam() {
    const [timeup, setTimeUp] = useState({ status: false })
    const [check, setCheck] = useState(true)
    const [exam, setExam] = useState(null)
    const [questions, setQuestions] = useState([])
    const [currentQues, SetCurrentQuestion] = useState(null)
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
    const [result, setResult] = useState(0)

    const { id } = useParams()

    const url = `http://localhost:5000/exams?id=${id}`
    useEffect(() => {
        axios.get(url)
            .then(res => {
                setExam(res.data[0])
                setQuestions(res.data[0].Questions)
                SetCurrentQuestion(res.data[0].Questions[0])
            })
    }, [url])

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());

        }, 1000);
        // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
    });


    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span key={interval}>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });



    function submitAnswer(e) {
        const newAnswer = e.target.value
        if ((answerPaper.map(object => object.id)).includes(currentQues.id)) {
            answerPaper.forEach((object, index) => {
                if (object.question === currentQues.id) {
                    answerPaper.splice(index, 1, { question: currentQues.id, answer: newAnswer })
                }
            })
        } else {
            answerPaper.push({ question: currentQues.id, answer: newAnswer })
        }

    }

    function suffle(e) {
        const value = e.target.textContent
        if (value === 'Next') {
            let question = questions.map(ques => {
                if (ques.id === currentQues.id + 1) {
                    return ques
                }
            })

            question.forEach(ques => {
                if (ques) {
                    SetCurrentQuestion(ques)
                }
            })

        } else {
            let question = questions.map(ques => {
                if (ques.id === currentQues.id - 1) {
                    return ques
                }
            })

            question.forEach(ques => {
                if (ques) {
                    SetCurrentQuestion(ques)
                }
            })
        }
    }

    function countResult(answer) {
        let i = 0
        questions.forEach(question => {
            answer.forEach(answer => {
                if (question.id === answer.question) {
                    if (question.correct === answer.answer) {
                        i += 1
                    }
                }
            })
        })
        return i
    }


    return (
        <Container className="my-5">
            {timeup.status && <h1>your result {timeup.marks}</h1>}
            {!timeup.status && <Row>
                <Col md={8} sm={12}>
                    <Card className="p-4">
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <p>ques {currentQues && currentQues.id} of {questions.length}</p>
                                <div>
                                    {timerComponents.length ? timerComponents : setTimeUp({ status: true, marks: countResult(answerPaper) })}
                                </div>
                            </div>
                            <Card.Title className="justify-self-center">
                                {currentQues && currentQues.title}
                            </Card.Title>
                            <Form onClick={submitAnswer}>
                                {currentQues && currentQues.options.map((option, i) => {
                                    if ((answerPaper.map(object => object.answer)).includes(option)) {
                                        return (
                                            <Form.Check
                                                type="radio"
                                                key={i}
                                                label={option}
                                                checked={true}
                                                defaultChecked={false}
                                                value={option}
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios1"
                                            />
                                        )

                                    } else {
                                        return (
                                            <Form.Check
                                                type="radio"
                                                key={i}
                                                label={option}
                                                value={option}

                                                defaultChecked={false}
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios1"
                                            />
                                        )
                                    }

                                })}

                            </Form>


                        </Card.Body>
                        <div className="d-flex">
                            {currentQues &&
                                (currentQues.id !== 1) &&
                                <Button className="mr-2" onClick={suffle} variant="warning">Previous</Button>
                            }
                            <Button className="mr-2" onClick={suffle} variant="success">Next</Button>
                            <Button variant="danger">Finish</Button>
                        </div>
                    </Card>
                </Col>
                <Col md={4} sm={12}>
                    <Container>
                        {questions.map((question, index) => {
                            return (
                                <Card className="my-2" key={index} onClick={() => SetCurrentQuestion(question)}>
                                    <Card.Body>
                                        <Card.Title>
                                            {question.id} - {question.title}
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </Container>

                </Col>
            </Row>}

        </Container>
    )
}

export default Exam