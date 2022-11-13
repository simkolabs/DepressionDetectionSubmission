import React, {useEffect} from "react";
import { Table, Badge } from "reactstrap";

function CaptionsTable(props) {

  useEffect(() => {
  console.log("POSTS FROM PARENT ",props.posts)
  });

  return (
    <div>
      <Table size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Captions</th>
            <th>Results</th>
          </tr>
        </thead>
        <tbody>
        {props.posts.map((element,index)=>{
          let result ="";
          let style ="";
          if(element.result==="positive"){
            result="Non Depressive";
            style ="success"
          }else{
            result =" Depressive"
            style="danger"
          }
          return(
              <tr>
                <th scope="row">{index+1}</th>
                <td>{element.post}</td>
                <td>
                  <Badge color={style}>{result}</Badge>
                </td>
              </tr>
          )
        })}
        </tbody>
      </Table>
    </div>
  );
}

export default CaptionsTable;
