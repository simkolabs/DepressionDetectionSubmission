import React, {useEffect, useState} from "react";

// reactstrap components
import {
    Input,
    Card,
    CardBody,
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Button,
    Badge,
} from "reactstrap";

// core components
import Navbar from "components/Navbars/Index";
import SimpleFooter from "components/Footers/SimpleFooter";
import CaptionsTable from "components/UI/CaptionsTable";
import {Link} from "react-router-dom";
import FacebookLogin from 'react-facebook-login';

import axios from 'axios';

function FaceBookAnalysis() {

    const [accessToken, setAccessToken] = useState("");
    const [userId, setUserId] = useState("");
    const [posts, setPosts] = useState([]);
    const [id, setId] = useState("");
    const [reDirectToHome, setReDirectToHome] = useState(false)

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        let user = localStorage.getItem('user')
        const userParsed = JSON.parse(user);
        setUserId(userParsed._id)
    }, []);

    const componentClicked = (data )=> {

    }
    const responseFacebook = (response) => {
        setAccessToken(response.accessToken)
        setId(response.id)
        let posts = [];
        axios.get("https://graph.facebook.com/v14.0/" + id + "/posts?access_token=" + accessToken)
            .then(async res => {
                let countOfPosts = 0;
                let countOfDepressive =0;
                for (let i = 0; i < res.data.data.length; i++) {
                    let element = res.data.data[i]
                    if (element.message != null) {
                        const response = await axios.post(
                            'http://127.0.0.1:8000/text/',
                            '',
                            {
                                params: {
                                    'message': element.message
                                },
                                headers: {
                                    'accept': 'application/json',
                                    'content-type': 'application/x-www-form-urlencoded'
                                }
                            }
                        );
                        posts.push({
                            "post": element.message,
                            "result": response.data
                        })
                        countOfPosts = countOfPosts+1;
                        if(response.data === "depressive"){
                            countOfDepressive = countOfDepressive +1;
                        }
                        axios.post('http://localhost:3003/api/fbPosts/saveFacebookPost', {
                            "userId": userId,
                            "post": element.message,
                            "result": response.data
                        })
                            .then(response => {
                                console.log(response)
                            })
                    }
                }
                setPosts(posts)
                localStorage.setItem("FacebookFinalResult",JSON.stringify(countOfDepressive/countOfPosts*100))
                console.log("POSTS", posts)
            })
            .catch(error => {
                console.log(error)
            })

    }

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
                                        <h1 className="display-3 text-white">Face Book Analysis</h1>
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
                                                <Form className="">
                                                    <FormGroup>
                                                        <Label>Face Book ID</Label>
                                                        <div className="d-flex flex-row">
                                                            <Input
                                                                id="exampleEmail"
                                                                name="fb"
                                                                placeholder="enter your face book ID"
                                                                type="text"
                                                                size="sm"
                                                            />
                                                            <FacebookLogin
                                                                appId="735493277533052"
                                                                autoLoad={true}
                                                                fields="name,email,picture"
                                                                onClick={componentClicked}
                                                                callback={responseFacebook}
                                                                className="facebookLoginButton"
                                                            />
                                                            {/*<Button*/}
                                                            {/*    color="primary"*/}
                                                            {/*    size="sm"*/}
                                                            {/*    className="col-3 ml-4"*/}
                                                            {/*>*/}
                                                            {/*    <span>Login with Face Book</span>*/}
                                                            {/*</Button>*/}
                                                        </div>
                                                    </FormGroup>{" "}
                                                </Form>

                                                <div className="mt-5">
                                                    <CaptionsTable posts={posts}/>
                                                </div>

                                                <div className="mt-5">
                                                    <div className="row">
                                                        <div className="col-1"/>
                                                        <div
                                                            className="bg-success mr-3"
                                                            style={{width: 20, borderRadius: 4}}
                                                        />
                                                        <Badge color="success">Positive visons</Badge>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-1"/>
                                                        <div
                                                            className="bg-danger mr-3"
                                                            style={{width: 20, borderRadius: 4}}
                                                        />
                                                        <Badge color="danger">
                                                            worthlessness, hoplessness or guilt visons
                                                        </Badge>
                                                        <div className="col">
                                                            <Link
                                                                className="text-underline"
                                                                to="/facebook-result"
                                                            >
                                                                Show Final Resulet{" "}
                                                                <i className="bx bx-chevrons-right bx-fade-left ml-2"></i>
                                                            </Link>
                                                        </div>
                                                    </div>
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

export default FaceBookAnalysis;
