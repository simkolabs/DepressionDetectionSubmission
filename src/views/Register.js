import React from "react";
import {Link} from "react-router-dom";
import {default as axios} from "axios";
import {Navigate} from "react-router-dom";
// reactstrap components
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
} from "reactstrap";

import Logo from "../assets/img/brand/white.png";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginDetails: {
                email: "",
                password: "",
                fullName: "",
                address: "",
                contactNo: "",
                confirmPassword: ""
            },
            reDirectToHomePage: false,
            error: '',
            isAdmin: false
        }
    }

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
    }

    register = (event) => {
        event.preventDefault();
        if (this.state.loginDetails.email === "" || this.state.loginDetails.password === "") {
            this.setState({error: "Please Fill all Required Fields"})
        } else {
            if (this.state.loginDetails.password === this.state.loginDetails.confirmPassword) {
                axios.post("http://localhost:3003/api/users/addUser", {
                    email: this.state.loginDetails.email,
                    password: this.state.loginDetails.password,
                    fullName: this.state.loginDetails.fullName,
                    address: this.state.loginDetails.address,
                    contactNo: this.state.loginDetails.contactNo
                }).then(response => {
                    const status = response.data.Status
                    const message = response.data.Message
                    if (status === "Successful") {
                        const data = response.data.User;
                        console.log(data)
                        localStorage.setItem('user', JSON.stringify(data))
                        this.setState({reDirectToHomePage: true})
                    } else {
                        this.setState({error: message})
                    }
                }).catch(err => {
                    console.log(err)
                    this.setState({error: err})
                });
            } else {
                this.setState({error: "Passwords are not matching"})
            }
        }
    }

    render() {
        if (this.state.reDirectToHomePage) {
            return <Navigate to="/home"/>
        } else {
            return (
                <>
                    <main ref="main">
                        <section className="section section-shaped section-lg">
                            <div className="shape shape-style-1 bg-gradient-info">
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                            </div>
                            <Container className="mt--6">
                                <div className="">
                                    <img src={Logo} alt="logo" width="200"/>
                                </div>
                                <Row className="justify-content-center">
                                    <Col lg="5">
                                        <Card className="bg-secondary shadow border-0">
                                            <div className="text-muted text-center mt-5">
                                                <h4>Create New Account </h4>
                                            </div>
                                            <CardBody className="px-lg-4 py-lg-4">
                                                <Form role="form" onSubmit={this.register}>
                                                    <FormGroup>
                                                        <InputGroup className="input-group-alternative mb-3">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="ni ni-hat-3"/>
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input
                                                                onChange={(e) =>
                                                                    this.setState({
                                                                        loginDetails: {
                                                                            ...this.state.loginDetails,
                                                                            fullName: e.target.value
                                                                        }
                                                                    })
                                                                }
                                                                value={this.state.loginDetails.fullName}
                                                                placeholder="Name"
                                                                type="text"
                                                            />
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <InputGroup className="input-group-alternative mb-3">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="ni ni-hat-3"/>
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input
                                                                onChange={(e) =>
                                                                    this.setState({
                                                                        loginDetails: {
                                                                            ...this.state.loginDetails,
                                                                            contactNo: e.target.value
                                                                        }
                                                                    })
                                                                }
                                                                value={this.state.loginDetails.contactNo}
                                                                placeholder="Contact No" type="number"
                                                            />
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <InputGroup className="input-group-alternative mb-3">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="ni ni-hat-3"/>
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input
                                                                onChange={(e) =>
                                                                    this.setState({
                                                                        loginDetails: {
                                                                            ...this.state.loginDetails,
                                                                            address: e.target.value
                                                                        }
                                                                    })
                                                                }
                                                                value={this.state.loginDetails.address}
                                                                placeholder="Address" type="text"
                                                            />
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <InputGroup className="input-group-alternative mb-3">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="ni ni-email-83"/>
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input
                                                                onChange={(e) =>
                                                                    this.setState({
                                                                        loginDetails: {
                                                                            ...this.state.loginDetails,
                                                                            email: e.target.value
                                                                        }
                                                                    })
                                                                }
                                                                value={this.state.loginDetails.email}
                                                                placeholder="Email" type="email"/>
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <InputGroup className="input-group-alternative">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="ni ni-lock-circle-open"/>
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input
                                                                onChange={(e) =>
                                                                    this.setState({
                                                                        loginDetails: {
                                                                            ...this.state.loginDetails,
                                                                            password: e.target.value
                                                                        }
                                                                    })
                                                                }
                                                                value={this.state.loginDetails.password}
                                                                placeholder="Password"
                                                                type="password"
                                                                autoComplete="off"
                                                            />
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <InputGroup className="input-group-alternative">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="ni ni-lock-circle-open"/>
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input
                                                                onChange={(e) =>
                                                                    this.setState({
                                                                        loginDetails: {
                                                                            ...this.state.loginDetails,
                                                                            confirmPassword: e.target.value
                                                                        }
                                                                    })
                                                                }
                                                                value={this.state.loginDetails.confirmPassword}
                                                                placeholder="Confirm Password"
                                                                type="password"
                                                                autoComplete="off"
                                                            />
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <Row className="my-4">
                                                        <Col xs="12">
                                                            <div
                                                                className="custom-control custom-control-alternative custom-checkbox">
                                                                <input
                                                                    className="custom-control-input"
                                                                    id="customCheckRegister"
                                                                    type="checkbox"
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    htmlFor="customCheckRegister"
                                                                >
                                <span>
                                  I agree with the{" "}
                                    <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                    Privacy Policy
                                  </a>
                                </span>
                                                                </label>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <div className="text-center">
                                                        <Button
                                                            className="mt-4"
                                                            color="primary"
                                                            type="button"
                                                            onClick={this.register}
                                                        >
                                                            Create account
                                                        </Button>
                                                    </div>
                                                </Form>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col className="text-center">
                                        <Link className="text-light" to="/login">
                                            <small>Sign In</small>
                                        </Link>
                                    </Col>
                                </Row>
                            </Container>
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
                    </main>
                </>
            );
        }
    }
}

export default Register;
