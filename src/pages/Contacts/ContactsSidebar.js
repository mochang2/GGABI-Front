import React from "react"
import { withRouter } from "react-router-dom"

// scroll
import { Link } from "react-scroll"

// design
import { Col } from "reactstrap"



const ContactsSidebar = (props) => {
  return (
    <React.Fragment>
      {props.contactsData["ㄱ"].length !== 0 ? <Col><Link to="ㄱ" spy={true}>ㄱ</Link></Col> : ""}
      {props.contactsData["ㄴ"].length !== 0 ? <Col><Link to="ㄴ" spy={true}>ㄴ</Link></Col> : ""}
      {props.contactsData["ㄷ"].length !== 0 ? <Col><Link to="ㄷ" spy={true}>ㄷ</Link></Col> : ""}
      {props.contactsData["ㄹ"].length !== 0 ? <Col><Link to="ㄹ" spy={true}>ㄹ</Link></Col> : ""}
      {props.contactsData["ㅁ"].length !== 0 ? <Col><Link to="ㅁ" spy={true}>ㅁ</Link></Col> : ""}
      {props.contactsData["ㅂ"].length !== 0 ? <Col><Link to="ㅂ" spy={true}>ㅂ</Link></Col> : ""}
      {props.contactsData["ㅅ"].length !== 0 ? <Col><Link to="ㅅ" spy={true}>ㅅ</Link></Col> : ""}
      {props.contactsData["ㅇ"].length !== 0 ? <Col><Link to="ㅇ" spy={true}>ㅇ</Link></Col> : ""}
      {props.contactsData["ㅈ"].length !== 0 ? <Col><Link to="ㅈ" spy={true}>ㅈ</Link></Col> : ""}
      {props.contactsData["ㅊ"].length !== 0 ? <Col><Link to="ㅊ" spy={true}>ㅊ</Link></Col> : ""}
      {props.contactsData["ㅋ"].length !== 0 ? <Col><Link to="ㅋ" spy={true}>ㅋ</Link></Col> : ""}
      {props.contactsData["ㅌ"].length !== 0 ? <Col><Link to="ㅌ" spy={true}>ㅌ</Link></Col> : ""}
      {props.contactsData["ㅍ"].length !== 0 ? <Col><Link to="ㅍ" spy={true}>ㅍ</Link></Col> : ""}
      {props.contactsData["ㅎ"].length !== 0 ? <Col><Link to="ㅎ" spy={true}>ㅎ</Link></Col> : ""}
      {props.contactsData["A"].length !== 0 ? <Col><Link to="A" spy={true}>A</Link></Col> : ""}
      {props.contactsData["B"].length !== 0 ? <Col><Link to="B" spy={true}>B</Link></Col> : ""}
      {props.contactsData["C"].length !== 0 ? <Col><Link to="C" spy={true}>C</Link></Col> : ""}
      {props.contactsData["D"].length !== 0 ? <Col><Link to="D" spy={true}>D</Link></Col> : ""}
      {props.contactsData["E"].length !== 0 ? <Col><Link to="E" spy={true}>E</Link></Col> : ""}
      {props.contactsData["F"].length !== 0 ? <Col><Link to="F" spy={true}>F</Link></Col> : ""}
      {props.contactsData["G"].length !== 0 ? <Col><Link to="G" spy={true}>G</Link></Col> : ""}
      {props.contactsData["H"].length !== 0 ? <Col><Link to="H" spy={true}>H</Link></Col> : ""}
      {props.contactsData["I"].length !== 0 ? <Col><Link to="I" spy={true}>&nbsp;I</Link></Col> : ""}
      {props.contactsData["J"].length !== 0 ? <Col><Link to="J" spy={true}>&nbsp;J</Link></Col> : ""}
      {props.contactsData["K"].length !== 0 ? <Col><Link to="K" spy={true}>K</Link></Col> : ""}
      {props.contactsData["L"].length !== 0 ? <Col><Link to="L" spy={true}>L</Link></Col> : ""}
      {props.contactsData["M"].length !== 0 ? <Col><Link to="M" spy={true}>M</Link></Col> : ""}
      {props.contactsData["N"].length !== 0 ? <Col><Link to="N" spy={true}>N</Link></Col> : ""}
      {props.contactsData["O"].length !== 0 ? <Col><Link to="O" spy={true}>O</Link></Col> : ""}
      {props.contactsData["P"].length !== 0 ? <Col><Link to="P" spy={true}>P</Link></Col> : ""}
      {props.contactsData["Q"].length !== 0 ? <Col><Link to="Q" spy={true}>Q</Link></Col> : ""}
      {props.contactsData["R"].length !== 0 ? <Col><Link to="R" spy={true}>R</Link></Col> : ""}
      {props.contactsData["S"].length !== 0 ? <Col><Link to="S" spy={true}>S</Link></Col> : ""}
      {props.contactsData["T"].length !== 0 ? <Col><Link to="T" spy={true}>T</Link></Col> : ""}
      {props.contactsData["U"].length !== 0 ? <Col><Link to="U" spy={true}>U</Link></Col> : ""}
      {props.contactsData["V"].length !== 0 ? <Col><Link to="V" spy={true}>V</Link></Col> : ""}
      {props.contactsData["W"].length !== 0 ? <Col><Link to="W" spy={true}>W</Link></Col> : ""}
      {props.contactsData["X"].length !== 0 ? <Col><Link to="X" spy={true}>X</Link></Col> : ""}
      {props.contactsData["Y"].length !== 0 ? <Col><Link to="Y" spy={true}>Y</Link></Col> : ""}
      {props.contactsData["Z"].length !== 0 ? <Col><Link to="Z" spy={true}>Z</Link></Col> : ""}
      {props.contactsData["#"].length !== 0 ? <Col><Link to="#" spy={true}>#</Link></Col> : ""}
    </React.Fragment>
  )
}

export default withRouter(ContactsSidebar)
