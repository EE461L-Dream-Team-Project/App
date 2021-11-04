import React from "react";
import MemberItem from "../components/MemberItem";
import "./css/Home.css"

export default function Home() {
  const mediaPrefix = "/media/members/"
  return (
    <div>
      {" "}
      <img style={{ with: 20, height: 50, float: "left" }} src="logo.png" />
      <br/>
      <br/>
      <br/>
      <div className="member-list" id="members">
        <ul id="name-list">
          <li><MemberItem name="Shawn Li"
                          source={mediaPrefix+"ShawnLi.jpg"}/></li>
          <li><MemberItem name="Sidharth Nair"
                          source={mediaPrefix+"SidharthNair.jpg"}/></li>
          <li><MemberItem name="Prathik Srinivasan"
                          source={mediaPrefix+"PrathikSrinivasan.jpg"}/></li>
          <li><MemberItem name="Nick Taylor"
                          source={mediaPrefix+"NickTaylor.jpg"}/></li>
          <li><MemberItem name="Joseph Lawler"
                          source={mediaPrefix+"JosephLawler.jpg"}/></li>
          <li><MemberItem name="Daniel Sosa" 
                          source={mediaPrefix+"DanielSosa.jpg"}/></li>
        </ul>
      </div>
    </div>
  );
}
