import React, {useEffect, useState} from "react";
import {Table, Badge} from "reactstrap";
import axios from 'axios';
import dateFormat from 'dateformat';

function SessionTable() {

    const [sessions, setSessions] = useState([]);
    const [finalResult, setFinalResult] = useState("");

    useEffect(() => {
        let user = localStorage.getItem('user')
        const userParsed = JSON.parse(user);
        let userId = userParsed._id

        axios.post("http://localhost:3003/api/sessionAnswers/getSessionResultsOfUser", {userId: userId})
            .then(response2 => {
                const res2 = response2.data.SessionsResults

                let sessionResults = []
                let finalResultSessions = ""
                let totalSessionsCount = 0
                let depressiveSessionCount = 0
                for (let i = 0; i < res2.length; i++) {
                    for (let j = 0; j < res2[i].videos.length; j++) {
                        let video = res2[i].videos[j]
                        let sumResult = ""
                        if (video.audioResult === "Depressive" && video.videoResult === "Depressed") {
                            sumResult = "High"
                        } else if (video.audioResult === "Positive" && video.videoResult === "Positive") {
                            sumResult = "Low"
                        } else {
                            sumResult = "Medium"
                        }
                        if (sumResult === "High") {
                            depressiveSessionCount++;
                        }
                        totalSessionsCount++
                    }
                    sessionResults.push(res2[i])
                }
                if (depressiveSessionCount / totalSessionsCount * 100 > 75) {
                    finalResultSessions = "High"
                } else if (depressiveSessionCount / totalSessionsCount * 100 > 50) {
                    finalResultSessions = "Medium"
                } else {
                    finalResultSessions = "Low"
                }
                setSessions(sessionResults)
                setFinalResult(finalResultSessions)
            })
    }, []);

    return (
        <div>
            <Table size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Session Question</th>
                    <th>Results</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>

                {sessions.map((element, index) => {
                    console.log("ELEMENT",element)
                    let dataRow = "dataRow" +(index % 5)
                    let result = "High"
                    let style= "";
                    let data = element.date
                    if (element.videos[0]?.videoResult === "Depressed" &&
                        element.videos[0]?.audioResult === "Depressive") {
                        result = "High"
                        style = "danger"
                    } else if ((element.videos[0]?.videoResult === "Positive" &&
                            element.videos[0]?.audioResult === "Depressive") ||
                        (element.videos[0]?.videoResult === "Depressed" &&
                            element.videos[0]?.audioResult === "Positive")
                    ) {
                        result = "Medium"
                        style = "warning"
                    } else if (element.videos[0]?.videoResult === "Positive" &&
                        element.videos[0]?.audioResult === "Positive") {
                        result = "Low"
                        style = "info"
                    }
                    return (
                        <tr>
                            <th scope="row">{index+1}</th>
                            <td>{element.question}</td>
                            <td>
                                <Badge color={style}>{result}</Badge>
                            </td>
                            <td>{dateFormat(element.date, "mmmm dS, yyyy")}</td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </div>
    );
}

export default SessionTable;
