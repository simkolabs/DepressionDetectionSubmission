import React, {useImperativeHandle,useEffect, useState, useRef,forwardRef,useCallback } from "react";
import Webcam from "react-webcam";
import axios from 'axios';
import {Navigate,useHistory} from "react-router-dom";
import {Oval} from "react-loader-spinner";
import fixWebmDuration from 'webm-duration-fix';

const VideoRoc = forwardRef((props,ref) => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [generatingResults,setGeneratingResults] =useState(false);

  const [audioQuestion, setAudioQuestion] = useState(
    "https://beardbarnmusicbucket.s3.amazonaws.com/The+Wild+Horse"
  );

  useImperativeHandle(ref, () => ({
    childFunction1() {
      console.log(props.session)
      handleDownload();
    }
  }));

  const [isPlay, setIsPlay] = useState(false);
  const [isRecord, setIsRecord] = useState(false);
  const [audio, setAudio] = useState(false);

  const playAudio = () => {
    audioElm.current.play();
    setIsPlay(true);
    setAudio(true);
    handleStartCaptureClick();
  };

  const PlayNextQuestion = () => {
    setIsPlay(false);
    handleStopCaptureClick();
  };
  const audioElm = useRef();


  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = React.useCallback(async () => {
    let user = localStorage.getItem('user')
    const userParsed = JSON.parse(user);
    console.log("USER Video ", userParsed._id)
    let userId = userParsed._id;

    let session = localStorage.getItem('SelectedSession')
    const sessionParsed = JSON.parse(session);
    console.log("Session Vuido", sessionParsed.Session._id)
    let sessionId = sessionParsed.Session._id
    if (recordedChunks) {

      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const fixBlob = await fixWebmDuration(blob);
      const videoFile = new File([fixBlob],
          "data", { type: "video/webm" })

      console.log("VIDEO FILE", videoFile)
      const formData = new FormData();
      formData.append("user", userId);
      formData.append("session", sessionId);
      formData.append("videos", videoFile);
      formData.append("videos", videoFile);
      console.log("Fprm Data", videoFile)
      setGeneratingResults(true)

      // axios.post('http://localhost:3003/api/sessionAnswers/addSessionAnswer', formData)
      //     .then(response => {
      //       console.log("SUCCESS VIDEOP", response.data)
      //       localStorage.setItem("VideoResult", JSON.stringify(response.data))
      //       setGeneratingResults(false)
      //       props.navigateToFinal();
      //     })
      //     .catch(err => {
      //       console.log("Video Error", err)
      //     })
    }
  }, [recordedChunks]);

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
  }else {
    return (
        <>
          {!isPlay ? (
              <div className="bg-dark" style={{width: 250, height: 175}}></div>
          ) : (
              <Webcam audio={true} ref={webcamRef} width="250px"/>
          )}

          {/* {capturing ? (
        <button onClick={handleStopCaptureClick}>Stop Capture</button>
      ) : (
        <button onClick={handleStartCaptureClick}>Start Capture</button>
      )}
      {recordedChunks.length > 0 && (
        <button onClick={handleDownload}>Download</button>
      )} */}
          <audio src={audioQuestion} ref={audioElm}/>
          <div className="">
            <div className="mt-2">
              <div>
                <button
                    className="btn btn-primary btn-sm me-1 px-2 mx-2"
                    onClick={playAudio}
                >
                  <i className="feather-lg" data-feather="play"></i>{" "}
                  <span className="align-middle"> Start</span>
                </button>

                <button
                    className="btn btn-danger border btn-sm px-2 mx-2"
                    onClick={PlayNextQuestion}
                >
                  <i className="feather-lg" data-feather="pause"></i>
                  <span className="align-middle"> Stop</span>{" "}
                </button>
                {isPlay && (
                    <span>
                <i class="bx bxs-music bx-burst fs-4 ms-2 text-primary"></i>
              </span>
                )}
              </div>
            </div>
          </div>
        </>
    );
  }
});

export default VideoRoc;
