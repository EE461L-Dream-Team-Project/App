import React, { useState, useEffect } from "react";
import MemberItem from "../components/MemberItem";
import {List, Button, Space, Card, Carousel, Row, Typography, Col, Divider, BackTop, Collapse} from 'antd';
import {Link} from 'react-router-dom';
import "./css/Home.css"
import { get } from '../request';

export default function Home() {
  const mediaPrefix = "/media/members/"
  const {Meta} = Card;
  const {Title} = Typography;
  const {Panel} = Collapse;
  
  const desc1 =`Projecture is a web application that allows users to interact with 
  a Hardware-as-a-Service (HaaS) platform to reserve available resources and download
  datasets from published sources.`;

  const desc2 =`Once you have created an account and logged in, you may use the 
  'Project' page to create new projects and view created projects, as well as search for 
  specific projects by their id.`

  const desc3 =`Once you have created an account and logged in, you may use the 
  'Datasets' page to download data from published sources. Each dataset contains a 
  description of the data as well as an indication of the size of the dataset.`

  const [authed, setAuth] = useState(null); //placeholder for something that would make the login/register buttons not render if logged in


  const getAuth = async () => {
    const res = await get("/is_logged_in");
    setAuth(res.data.bool);
  };

  useEffect(() => {
    // fetch existing projects when entering Project Page
    getAuth();
  }, []);

  return (
    <div>
      {" "}
      <img style={{height: 150, float: "center" }} src="logo.png" />
      <br />
      {!authed &&
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
        <br />
        </Space>
      </div>
      }

      <br />
      <Divider />
      <br />

      <div className="project-description" id="project-description"> 
        <Collapse>
          <Panel header="What is Projecture?" key="1">
            <p>{desc1}</p>
          </Panel>
          <Panel header="How to use the 'Projects' page" key="2">
            <p>{desc2}</p>
          </Panel>
          <Panel header="How to use the 'Datasets' page" key="3">
            <p>{desc3}</p>
          </Panel>
        </Collapse>
      </div>

      <br />
      <Divider />
      <br />

      <div className="member-list" id="members-list" style={{justifyContent:"center", alignItems:"center"}}>
          <Title>Team Members:</Title>
          <Row gutter={[16, 24]}>

            <Col span={4}>
              <Card cover={<img alt="Joseph Lawler" src={mediaPrefix+"JosephLawler.jpg"} style={{padding:15}}/>}>
                <Meta title="Joseph Lawler" description="description" />
              </Card>
            </Col>

            <Col span={4}>
              <Card cover={<img alt="Shawn Li" src={mediaPrefix+"ShawnLi.jpg"} style={{padding:15}}/>}>
                <Meta title="Shawn Li" description="description" />
              </Card>
            </Col>

            <Col span={4}>
              <Card cover={<img alt="Sidharth Nair" src={mediaPrefix+"SidharthNair.jpg"} style={{padding:15}}/>}>
                <Meta title="Sidharth Nair" description="description" />
              </Card>
            </Col>  
                        
            <Col span={4}>
              <Card cover={<img alt="Daniel Sosa" src={mediaPrefix+"DanielSosa.jpg"} style={{padding:15}}/>}>
               <Meta title="Daniel Sosa" description="description" />
              </Card>
            </Col>

            <Col span={4}>
              <Card cover={<img alt="Prathik Srinivasan" src={mediaPrefix+"PrathikSrinivasan.jpg"} style={{padding:15}}/>}>
                <Meta title="Prathik Srinivasan" description="description" />
              </Card>
            </Col>

            <Col span={4}>
              <Card cover={<img alt="Nick Taylor" src={mediaPrefix+"NickTaylor.jpg"} style={{padding:15}}/>}>
                <Meta title="Nick Taylor" description="description" />
              </Card>
            </Col>

          </Row>

      </div>
    </div>
  );
}
