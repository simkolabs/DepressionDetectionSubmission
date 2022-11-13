/*eslint-disable*/
import React from "react";
// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

function SimpleFooter() {
  return (
    <>
      <footer className=" footer">
        <Container>
          <Row className=" align-items-center justify-content-md-between">
            <Col md="6">
              <div className=" copyright">
                © {new Date().getFullYear()} <a href="#">iDep</a>.
              </div>
            </Col>
            <Col md="6">
              <Nav className=" nav-footer justify-content-end">
                <NavItem>
                  <NavLink href="#" target="_blank">
                    iDep
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default SimpleFooter;
