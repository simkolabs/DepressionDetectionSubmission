import React, {useEffect, useState} from "react";
import { Table, Badge } from "reactstrap";
import axios from "axios";
import dateFormat from 'dateformat';

function SocialMediaTable() {

  const [posts,setPosts] = useState([]);
  const [finalResult,setFinalResult] = useState("");

  useEffect(() => {
    let user = localStorage.getItem('user')
    const userParsed = JSON.parse(user);
    let userId = userParsed._id

    axios.post("http://localhost:3003/api/fbPosts/getFacebookResults", {userId: userId})
        .then(response => {
          const res = response.data.Posts
          let depressiveFB = 0;
          let fbPosts = []
          for (let i = 0; i < res.length; i++) {
            fbPosts.push(res[i])
            if (res[i].result == "Depressive") {
              depressiveFB++;
            }
          }
          let fbPercentage = depressiveFB / res.length * 100;
          let fbResult = ""
          if (fbPercentage > 75) {
            fbResult = "High"
          } else if (fbPercentage > 50) {
            fbResult = "Medium"
          } else {
            fbResult = "Low"
          }
          setPosts(fbPosts)
            console.log("FB POSTS", fbPosts)
          setFinalResult(fbResult)
        })
  }, []);

  return (
    <div>
      <Table size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Analyis Time</th>
            <th>Results</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
        {posts.map((element,index)=>{
            let result = "";
            let style = "";
            if(element.result==="positive"){
                result = "Non Depressive";
                style = "info";
            }else{
                result = "Depressive";
                style = "warning";
            }
            return(
                <tr>
                    <th scope="row">{index+1}</th>
                    <td>{element.post}</td>
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

export default SocialMediaTable;
