import React, { useState, useEffect } from "react"

import LinkTo from "../../routes/LinkTo";

// axios api
import { axiosAPI, errorLog } from "../../APIs/BaseAPI";


const trafficLightId = (danger) => {
  console.log(danger);
  if (danger === -1) return "undetermined";
  else if (danger < 0.3) return "normal";
  else if (danger < 0.7) return "warning";
  else return "dangerous"
}


const EachMailAnalysis = (props) => {

  // show mail analysis info
  const mailId = window.location.pathname.split("/").at(-1);
  const mappingFlagAndComment = { 0: "미확인", 1: "정상", 2: "광고", 3: "사용자 설정 악성", 4: "관리자 설정 악성",
  5: "필터링 정책 악성", 6: "필터링 정책 악성", 7: "필터링 정책 악성" };
  const [analysisData, setAnalysisData] = useState("");  


  useEffect(() => {
    if (document.referrer.split("/").at(-1) === LinkTo.gatherEmails.split("/").at(-1)) {
      axiosAPI.get(`/api/admin/mail/${mailId}`)
      .then(response => {
        let data = {};
        let temp = [];
        for (const urlOrName of response.data["files"].split(" ")) {
          if (urlOrName.at(0) === "/") {
            temp.push(decodeURIComponent(decodeURI(urlOrName.split("/").at(-1)).replace(/%2B/g, " ")));
          }
          else {
            temp.push(urlOrName);
          }
        }
        data["fileName"] = temp;
        data["dangers"] = response.data["dangers"].split(" ");
        data["spamFlag"] = mappingFlagAndComment[response.data["spamFlag"]];
        data["dangerURL"] = response.data["dangerURL"];
  
        console.log(data);
        setAnalysisData(data);
      })
      .catch(error => {
        alert(`메일 정보를 받아오지 못했습니다.`);
        errorLog(error);
      })
    }
  },[])


  return (
    <React.Fragment>
      <div className="each-mail-analysis-wrapper">
        <div className="header">
          <h3>메일 분석 요약</h3>
        </div>
        
        {analysisData === "" ?
        "":
        <React.Fragment>
          <div className="flag-classification d-flex">
            <span>{analysisData["spamFlag"]}</span>
            <span>메일</span>
          </div>

          <br/>

          <div className="short-URL-inclusion d-flex">
            <span>단축 URL 포함 여부&nbsp;</span>
            {analysisData["dangerURL"] ?
            <span><b>있음</b></span> :
            <span><b>없음</b></span>}
          </div>

          <br/>
          
          <div className="attachments-list">
            <ul>
              {analysisData["fileName"][0] !== "null" && analysisData["fileName"][0] !== "" ?
              analysisData["fileName"].map((value, index) => {
                return (
                  <li className="d-flex">
                    <div className="attachment-file-name-wrapper">
                      {value}
                    </div>
                    <div>
                      <b>
                        {parseInt(analysisData["dangers"][index]) !== -1 ?
                        `${(parseFloat(analysisData["dangers"][index]) * 100).toFixed(2)}%` :
                        "0%"}
                      </b>
                    </div>
                    <div className="mail-traffic-light" id={trafficLightId(parseFloat(analysisData["dangers"][index]))} />
                  </li>
                )
              })
              :
              ""}
            </ul>
          </div>
        </React.Fragment>
        }
      </div>
    </React.Fragment>
  )
}

export default EachMailAnalysis