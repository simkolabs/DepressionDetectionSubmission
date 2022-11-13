import React, { useEffect } from "react";

// reactstrap components
// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

function Index() {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);

  return (
    <>
      <main>
        <div className="position-relative">
          {/* Hero for FREE version */}
          <section className="section section-hero section-shaped">
            {/* Background circles */}
            <div className="shape shape-style-1 shape-default">
              <span className="span-150" />
              <span className="span-50" />
              <span className="span-50" />
              <span className="span-75" />
              <span className="span-100" />
              <span className="span-75" />
              <span className="span-50" />
              <span className="span-100" />
              <span className="span-50" />
              <span className="span-100" />
            </div>
            <Container className="shape-container d-flex align-items-center ">
              <div className="col px-0">
                <Row className="align-items-center justify-content-center">
                  <Col className="text-center" lg="6">
                    <img
                      alt="..."
                      className="img-fluid"
                      src={require("assets/img/brand/white.png")}
                      style={{ width: "200px" }}
                    />
                    <p className="lead text-white">
                      Think positive & live positive <br />
                      life with happyness
                    </p>
                  </Col>
                </Row>
              </div>
              <div className="">
                <div className="row justify-content-center">
                  <Button
                    className="btn-icon mb-3 mb-sm-0"
                    color="github"
                    href="/session"
                    size="lg"
                    style={{ width: 300 }}
                  >
                    <span className="btn-inner--icon mr-1">
                      <i className="bx bx-notepad"></i>
                    </span>
                    <span className="btn-inner--text">
                      <span className="text-warning mr-1">On Time</span>
                      SESSION
                    </span>
                  </Button>
                </div>
                <div className="row justify-content-center mt-3">
                  <Button
                    className="btn-icon mb-3 mb-sm-0"
                    color="github"
                    href="/facebook-analysis"
                    size="lg"
                    style={{ width: 300 }}
                  >
                    <span className="btn-inner--icon mr-1">
                      <i className="bx bxl-facebook"></i>
                    </span>
                    <span className="btn-inner--text">
                      <span className="text-warning mr-1">face book</span>
                      analysis
                    </span>
                  </Button>
                </div>
                <div className="row justify-content-center mt-3">
                  <Button
                    className="btn-white btn-icon mb-3 mb-sm-0"
                    color="default"
                    href="/history"
                    size="lg"
                    style={{ width: 300 }}
                  >
                    <span className="btn-inner--icon mr-1">
                      <i className="bx bx-history"></i>
                    </span>
                    <span className="btn-inner--text">History</span>
                  </Button>
                </div>
                <div className="row justify-content-center mt-3">
                  <Button
                    className="btn-white btn-icon mb-3 mb-sm-0"
                    color="default"
                    href="/profile"
                    size="lg"
                    style={{ width: 300 }}
                  >
                    <span className="btn-inner--icon mr-1">
                      <i className="bx bx-user"></i>
                    </span>
                    <span className="btn-inner--text">User Profile</span>
                  </Button>
                </div>
              </div>
            </Container>
            {/* SVG separator */}

            <div className="separator separator-bottom separator-skew zindex-100">
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
        </div>
      </main>
    </>
  );
}

export default Index;
