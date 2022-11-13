import React, {useEffect, useState} from "react";

// reactstrap components
import { Card, CardBody, Container, Row, Col, Badge } from "reactstrap";

// core components
import Navbar from "components/Navbars/Index";
import SimpleFooter from "components/Footers/SimpleFooter";

import GiphyHi from "../assets/img/theme/giphy-hi-left.gif";
import Greeting from "../assets/img/theme/greeting-removebg.png";

function OnTimeSessionResult() {

  const [finalResult,setFinalResult] = useState(0);
  const [style,setStyle] = useState("");

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    let result = localStorage.getItem("FacebookFinalResult")
    result = JSON.parse(result)
    result = Math.round(result)
    console.log("Result",result)
    setFinalResult(result);
    if(finalResult >50){
      setStyle("warning")
    }else{
      setStyle("primary")
    }
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <div className="position-relative">
          {/* shape Hero */}
          <section className="section section-lg section-shaped pb-250">
            <div className="shape shape-style-1 shape-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="py-lg-md d-flex ">
              <div className="col px-0">
                <Row>
                  <Col>
                    <h1 className="display-3 text-white">Analysis Result</h1>
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
                        <Row>
                          <Col>
                            <h5 className="text-success ">
                              Hi dear, You are in{" "}
                              <Badge color={style}>{finalResult}%</Badge> Level !
                            </h5>
                            <h5 className="text-primary mt-5">
                              {" "}
                              Explation about the label
                            </h5>

                            <h6 className="mt-4">
                              <Badge color="primary">Normal</Badge> You are in
                              good mental health, Please continue your good
                              habits in your life.
                            </h6>

                            <h6 className="mt-4">
                              <Badge color="warning">Normal</Badge> You are more
                              like to suffer from depression, Please meet a
                              doctor and take the necessaty consultatins.
                            </h6>
                          </Col>
                          <Col
                            style={{
                              backgroundImage: `url(${GiphyHi})`,
                              height: "200px",
                              marginTop: "50px",
                              fontSize: "50px",
                              marginRight: "-950px",
                              backgroundSize: "contain",
                              backgroundRepeat: "no-repeat",
                            }}
                          >
                            <img
                              src={Greeting}
                              alt="DontWorryImg"
                              style={{
                                width: 300,
                                marginLeft: "-200px",
                                marginTop: "-115px",
                              }}
                            />
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
}

export default OnTimeSessionResult;
