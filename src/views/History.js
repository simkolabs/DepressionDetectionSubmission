import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classnames from "classnames";

// reactstrap components
import {
  Nav,
  Card,
  CardBody,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import Navbar from "components/Navbars/Index";
import SimpleFooter from "components/Footers/SimpleFooter";
import SessionTable from "components/UI/SessionTable";
import SocialMediaTable from "components/UI/SocialMediaTable";

import GiphyHi from "../assets/img/theme/giphy-hi-left.gif";
import DontWorryImg from "../assets/img/theme/dont_worry-removebg.png";

function History() {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
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
            <Container className="py-lg-md d-flex">
              <div className="col px-0">
                <Row>
                  <Col lg="6">
                    <h1 className="display-3 text-white">History</h1>
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
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <Row>
                          <Col>
                            <Nav tabs>
                              <NavItem>
                                <NavLink
                                  className={classnames({
                                    active: activeTab === "1",
                                  })}
                                  onClick={() => {
                                    toggle("1");
                                  }}
                                >
                                  Session
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                  className={classnames({
                                    active: activeTab === "2",
                                  })}
                                  onClick={() => {
                                    toggle("2");
                                  }}
                                >
                                  Social Media
                                </NavLink>
                              </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab}>
                              <TabPane tabId="1">
                                <Row>
                                  <Col sm="12" className="mt-5">
                                    <SessionTable />
                                  </Col>
                                </Row>
                              </TabPane>
                              <TabPane tabId="2">
                                <Row>
                                  <Col sm="12" className="mt-5">
                                    <SocialMediaTable />
                                  </Col>
                                </Row>
                              </TabPane>
                            </TabContent>
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
                              src={DontWorryImg}
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

export default History;
