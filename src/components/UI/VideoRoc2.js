import React, {useImperativeHandle, useEffect, useState, useRef, forwardRef, useCallback} from "react";
import Webcam from "react-webcam";
import axios from 'axios';
import {Navigate, useHistory} from "react-router-dom";
import {Oval} from "react-loader-spinner";
import fixWebmDuration from 'webm-duration-fix';
import ReactPlayer from 'react-player';
import {ReactMediaRecorder} from "react-media-recorder";

const VideoRoc2 = forwardRef((props, ref) => {
    const [generatingResults, setGeneratingResults] = useState(false);
    const mimeType = 'video/webm\;codecs=vp9';
    const blobSlice = [];
    const [videos, setVideos] = useState([]);
    const [recordingStatus, setRecordingStatus] = useState("");
    const [recording,setRecording] = useState(false);

    useImperativeHandle(ref, () => ({
        childFunction1() {
            answerSubmit();
        }
    }));

    const answerSubmit = async () => {
        let user = localStorage.getItem('user')
        const userParsed = JSON.parse(user);
        console.log("USER Video ", userParsed._id)
        let userId = userParsed._id;

        let session = localStorage.getItem('SelectedSession')
        const sessionParsed = JSON.parse(session);
        console.log("Session Vuido", sessionParsed.Session._id)
        let sessionId = sessionParsed.Session._id

        if (videos.length === 0) {
            console.log("There are no recordings.")
        } else {
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            const formData = new FormData();
            formData.append("user", userId);
            formData.append("session", sessionId);
            formData.append("videos", videos[0]);
            for (let i = 0; i < videos.length; i++) {
                formData.append("videos", videos[i]);
            }
            setGeneratingResults(true)
            axios.post('http://localhost:3003/api/sessionAnswers/addSessionAnswer', formData)
                .then(response => {
                    console.log(response.data)
                    localStorage.setItem("VideoResult", JSON.stringify(response.data))
                    setGeneratingResults(false)
                    props.navigateToFinal();
                })

        }
    }

    if (generatingResults) {
        return (
            <div className="loader">
                <Oval
                    height={"20%"}
                    width={"20%"}
                    color="#EA2027"
                    wrapperStyle={{
                        marginLeft: "45%",
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
    } else {
        return (
            <ReactMediaRecorder
                video
                render={({status, startRecording, stopRecording, mediaBlobUrl}) => (
                    <div className="session_page_main_body">
                        <div className="session_page_answers">
                            <div className="session_page_answer_video">
                                <div className="session_page_record_button_container">
                                    <div className='session_page_recording_status'>
                                        <h7>{recordingStatus}</h7>
                                    </div>
                                    <div className="mt-2">
                                        <div>
                                            <button
                                                className="btn btn-primary btn-sm me-1 px-2 mx-2"
                                                onClick={
                                                    () => {
                                                        setRecording(true)
                                                        startRecording();
                                                    }
                                                }
                                            >
                                                <i className="feather-lg" data-feather="play"></i>{" "}
                                                <span className="align-middle"> Start</span>
                                            </button>

                                            <button
                                                className="btn btn-danger border btn-sm px-2 mx-2"
                                                onClick={async () => {
                                                    setRecording(false)
                                                    stopRecording()
                                                }}
                                            >
                                                <i className="feather-lg" data-feather="pause"></i>
                                                <span className="align-middle"> Stop</span>{" "}
                                            </button>

                                            {recording?
                                                <span>
                                                    <i className="bx bxs-music bx-burst fs-4 ms-2 text-primary"></i>
                                                </span>
                                                :
                                                <div></div>
                                            }

                                        </div>
                                    </div>
                                    {/*<div*/}
                                    {/*    className="session_page_answer_button"*/}
                                    {/*    onClick={*/}
                                    {/*        () => {*/}
                                    {/*            startRecording();*/}
                                    {/*        }*/}
                                    {/*    }*/}
                                    {/*>*/}
                                    {/*    <h7>Start</h7>*/}
                                    {/*</div>*/}
                                    {/*<div*/}
                                    {/*    className="session_page_stop_answer_button"*/}
                                    {/*    onClick={async () => {*/}
                                    {/*        stopRecording()*/}
                                    {/*    }}*/}
                                    {/*>*/}
                                    {/*    <h7>Stop</h7>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                ondataavailable={(event) => {
                    blobSlice.push(event.data);
                }}
                onStart={
                    () => {
                        // this.setState({
                        //     recordingStatus: "Started answering for question " + (this.state.videos.length + 1)
                        // })
                    }
                }
                onStop={
                    async (blobUrl, blob) => {


                        console.log("Blob URL", blobUrl);
                        const videoBlob = await fetch(blobUrl).then(r => r.blob());
                        const fixBlob = await fixWebmDuration(blob);
                        const videoFile = new File([fixBlob],
                            "data", {type: "video/webm"})
                        let videosCopy = []
                        let i = 0;
                        videosCopy[i] = videoFile
                        setVideos(videosCopy)
                    }
                }
            />
        );
    }
});

export default VideoRoc2;
