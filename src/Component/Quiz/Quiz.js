import React from 'react'
import { Link } from "react-router-dom";
import { Container, Card, Button, Badge } from 'react-bootstrap'
import { useFetchExam } from '../../Hook/hook'
function Quiz() {
    const exams = useFetchExam()



    return (
        <Container className="my-5">
            <h1>Exams</h1>
            {/* 1st exam */}

            {exams.length && exams.map((exam, index) =>
                <Card key={index} className="my-5">
                    <Card.Body>
                        <div className="d-flex justify-content-between mb-2">
                            <div>
                                <Card.Title>
                                    {exam.title} - {exam.date}
                                </Card.Title>
                                {exam.Badge.length && exam.Badge.map(badge =>
                                    <Badge key={badge} className="mr-2" variant="secondary">{badge}</Badge>
                                )}
                                <Card.Subtitle className="mt-2">
                                    {exam.description}
                                </Card.Subtitle>

                            </div>

                            <h5>{exam.teacher.name}</h5>

                        </div>
                        <Link to="exam/1"><Button size="md">Start</Button></Link>
                    </Card.Body>
                </Card>
            )}

        </Container>
    )
}

export default Quiz