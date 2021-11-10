import React from "react";
import MemberItem from "../components/MemberItem";
import {List, Button, Space, Card, Carousel} from 'antd';
import {Link} from 'react-router-dom';
import "./css/Home.css"

export default function Home() {
  const mediaPrefix = "/media/members/"
  const {Meta} = Card;
  return (
    <div>
      {" "}
      <img style={{height: 150, float: "center" }} src="logo.png" />
      <br />
      <div className="buttons-list" id="buttons">
        <br />
        <Space direction = "vertical" align = "center" >
        <Link to="/Login">
          <Button type="primary" size={'large'} block={true}>Login</Button>
        </Link>
        <br />
        <Link to="/Register">
          <Button type="primary" size={'large'} block={true}>Register</Button>
        </Link>
        </Space>
      </div>
      <div className="member-carousel" id="members-carousel">
        <Carousel dotPosition="top" autoplay>
          <div>
          <Card style={{height:500, width: 200 }} cover={<img alt="Shawn Li" src={mediaPrefix+"ShawnLi.jpg"} style={{height:200, width:200}}/>}>
            <Meta title="Shawn Li" description="description" />
          </Card>
          </div>
          <div>
          <Card style={{height:500, width: 300 }} cover={<img alt="Sidharth Nair" src={mediaPrefix+"SidharthNair.jpg"} style={{height:200, width:200}}/>}>
            <Meta title="Sidharth Nair" description="description" />
          </Card>
          </div>
          <div>
          <Card style={{height:500, width: 300 }} cover={<img alt="Prathik Srinivasan" src={mediaPrefix+"PrathikSrinivasan.jpg"} />}>
            <Meta title="Prathik Srinivasan" description="description" />
          </Card>
          </div>
          <div>
          <Card style={{height:500, width: 300 }} cover={<img alt="Nick Taylor" src={mediaPrefix+"NickTaylor.jpg"} />}>
            <Meta title="Nick Taylor" description="description" />
          </Card>
          </div>
          <div>
          <Card style={{height:500, width: 300 }} cover={<img alt="Joseph Lawler" src={mediaPrefix+"JosephLawler.jpg"} />}>
            <Meta title="Joseph Lawler" description="description" />
          </Card>
          </div>
          <div>
          <Card style={{height:500, width: 300 }} cover={<img alt="Daniel Sosa" src={mediaPrefix+"DanielSosa.jpg"} />}>
            <Meta title="Daniel Sosa" description="description" />
          </Card>
          </div>
        </Carousel>
      </div>
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
