import React, {useEffect, useState} from "react";

// reactstrap components
import { Card, Container, Row, Col } from "reactstrap";

// core components
import Navbar from "components/Navbars/Index";
import SimpleFooter from "components/Footers/SimpleFooter.js";

function Profile() {

  const [user,setUser] = useState({});

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    let user = localStorage.getItem('user')
    const userParsed = JSON.parse(user);
    setUser(userParsed)
  }, []);

  return (
    <>
      <Navbar />
      <main className="profile">
        <section className="section-profile-cover section-shaped my-0">
          {/* Circles background */}
          <div className="shape shape-style-1 shape-default alpha-4">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
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
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
        <section className="section mt--100">
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle mt--7"
                          src={require("assets/img/theme/team-4-800x800.jpg")}
                          width="200"
                        />
                      </a>
                    </div>
                  </Col>
                  <Col
                    className="order-lg-3 text-lg-right align-self-lg-center"
                    lg="4"
                  >
                    <div className="card-profile-actions py-4 mt-lg-0"></div>
                  </Col>
                  <Col className="order-lg-1" lg="4"></Col>
                </Row>
                <div className="text-center my-5">
                  <h3>
                    {user.fullName}{" "}
                  </h3>
                  <div className="h6 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {user.address}
                  </div>
                  <div className="h6 mt-5">
                    <i className="ni business_briefcase-24 mr-2" />
                    {user.email}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    {user.contactNo}
                  </div>
                </div>
              </div>
            </Card>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
}

export default Profile;
