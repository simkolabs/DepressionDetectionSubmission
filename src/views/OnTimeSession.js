import React, { useEffect, useState, useRef } from "react";

// reactstrap components
import {
  Table,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Label,
  Button,
} from "reactstrap";

// core components
import Navbar from "components/Navbars/Index";
import SimpleFooter from "components/Footers/SimpleFooter";

import VideoRoc2 from "components/UI/VideoRoc2";
import axios from 'axios';
import {Navigate} from "react-router-dom";
import { Oval } from  'react-loader-spinner'


function OnTimeSession() {
  /*eslint-disable*/
  const [querstions, setQuerstions] = useState([]);
  const childRef = useRef(null);
  const [answer, setAnswer] = useState([]);
  const [selectedSession,setSelectedSession] = useState("");
  const [userId,setUserId] = useState("");
  const [generatingResults,setGeneratingResults] =useState(false);
  const [reDirectToResults,setReDirectToResults] = useState(false);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);

  useEffect(() => {
    let user = localStorage.getItem('user')
    const userParsed = JSON.parse(user);
    console.log("USER",userParsed._id)
    setUserId(userParsed._id)
    axios.post("http://localhost:3003/api/sessionAnswers/getSessionsOfUser",{userId:user._id})
        .then(response => {
          const sessions = response.data.SessionsOfUser

          let newSessions = []
          for (let i = 0; i < sessions.length; i++) {
            newSessions.push(sessions[i])
          }

          setQuerstions(sessions);
          console.log("QUESTIONS",querstions)
        })
  }, []);

  const submit = () => {
    childRef.current.childFunction1();
  }

  const navigateToFinal = () => {
    console.log("Navigating to final results")
    setReDirectToResults(true)
  }


  if(generatingResults){
    return (
        <div className="loader">
          <h1 className="loaderTitle">Analysing the video</h1>
          <Oval
              height={"20%"}
              width={"20%"}
              color="#EA2027"
              wrapperStyle={{
                marginLeft:"45%",
              }}
              wrapperClass=""
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#636e72"
              strokeWidth={1}
              strokeWidthSecondary={2}
          />
        </div>
    )
  }else if(reDirectToResults){
    return <Navigate to="/session-result"/>
  }else {
    return (
        <>
          <Navbar/>
          <main>
            <div className="position-relative">
              {/* shape Hero */}
              <section className="section section-lg section-shaped pb-250">
                <div className="shape shape-style-1 shape-default">
                  <span/>
                  <span/>
                  <span/>
                  <span/>
                  <span/>
                  <span/>
                  <span/>
                  <span/>
                  <span/>
                </div>
                <Container className="py-lg-md d-flex">
                  <div className="col px-0">
                    <Row>
                      <Col lg="6">
                        <h1 className="display-3 text-white">On Time Session</h1>
                      </Col>
                    </Row>
                  </div>
                </Container>
                {/* SVG separator */}
                <div className="separator separator-bottom separator-skew">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                      version="1.1"
                      viewBox="0 0 2560 100"
                      x="0"
                      y="0"
                  >
                    <polygon
                        className="fill-white"
                        points="2560 0 2560 100 0 100"
                    />
                  </svg>
                </div>
              </section>
              {/* 1st Hero Variation */}
            </div>
            <section className="section section-lg pt-lg-0 mt--200">
              <Container>
                <Row className="justify-content-center">
                  <Col lg="12">
                    <Row className="row-grid">
                      <Col>
                        <Card className="shadow border-0">
                          <CardBody className="py-5">
                            <Label>Questions</Label>

                            <div className="mt-3">
                              <div>
                                <Table size="sm">
                                  <tbody>
                                  {querstions.map((que, index) => {
                                    return (
                                        <tr key={index}>
                                          <th scope="row">{index + 1}</th>
                                          <td>{que.Session.question}</td>
                                          <td>
                                            <Button size="sm" color="warning" onClick={() => {
                                              localStorage.setItem("SelectedSession",JSON.stringify(que))
                                              setSelectedSession(que)
                                            }}>
                                              select
                                            </Button>
                                          </td>
                                        </tr>
                                    )
                                  })}
                                  </tbody>
                                </Table>
                              </div>
                            </div>

                            <div className="mt-5">
                              <h4>Rocording</h4>
                              <Row className="ml-1 mt-3">
                                <Col>
                                  <VideoRoc2 ref={childRef} navigateToFinal={navigateToFinal}/>
                                </Col>
                                <Col>
                                  <Table size="sm">
                                    <tbody>
                                    {answer.map((que, index) => (
                                        <tr
                                            key={index}
                                            className="justify-content-center"
                                        >
                                          <td>{que.question}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                  </Table>
                                  <div className="text-center mt-5">
                                    <Button
                                        // href="/session-result"
                                        color="success" onClick={submit}>
                                      Submit
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </section>
          </main>
          <SimpleFooter/>
        </>
    );
  }
}

export default OnTimeSession;
