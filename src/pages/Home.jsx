import React, { useState, useEffect } from "react";
import MemberItem from "../components/MemberItem";
import { Button, Space, Card, Row, Typography, Col, Divider, Image, Collapse } from 'antd';
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
      <img style={{ padding: 30, float: "center", width:"50%" }} src="logo.png" />
      <div className="buttons-list" id="buttons">
        <br />
        <Space direction = "vertical" align = "center" >
        <Link to={!authed ? "/login" : "/project"}>
          <Button type="primary" size={'large'} block={true}>{!authed ? "Login" : "Projects"}</Button>
        </Link>
        <br />
        <Link to={!authed ? "/register" : "/dataset"}>
          <Button type="primary" size={'large'} block={true}>{!authed ? "Register" : "Datasets"}</Button>
        </Link>
        <br />
        </Space>
      </div>
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
          <Title style={{fontSize: 24, padding: 20}}>Team Members</Title>
          <Row gutter={[16, 24]}>

            <Col span={4}>
              <Card cover={<Image alt="Joseph Lawler" src={mediaPrefix+"JosephLawler.jpg"} style={{padding:15}} preview={{mask: false}} />}>
                <Meta title="Joseph Lawler" description={<a href="mailto:josephlawler23@utexas.edu">josephlawler23@utexas.edu</a>} />
              </Card>
            </Col>

            <Col span={4}>
              <Card cover={<Image alt="Shawn Li" src={mediaPrefix+"ShawnLi.jpg"} style={{padding:15}} preview={{mask: false}} />}>
                <Meta title="Shawn Li" description={<a href="mailto:lixiaoxiong599@gmail.com">lixiaoxiong599@gmail.com</a>} />
              </Card>
            </Col>

            <Col span={4}>
              <Card cover={<Image alt="Sidharth Nair" src={mediaPrefix+"SidharthNair.png"} style={{padding:15}} preview={{mask: false}} />}>
                <Meta title="Sidharth Nair" description={<a href="mailto:sidnair@utexas.edu">sidnair@utexas.edu</a>} />
              </Card>
            </Col>  
                        
            <Col span={4}>
              <Card cover={<Image alt="Daniel Sosa" src={mediaPrefix+"DanielSosa.jpg"} style={{padding:15}} preview={{mask: false}} />}>
               <Meta title="Daniel Sosa" description={<a href="mailto:danielsosa521@utexas.edu">danielsosa521@utexas.edu</a>} />
              </Card>
            </Col>

            <Col span={4}>
              <Card cover={<Image alt="Prathik Srinivasan" src={mediaPrefix+"PrathikSrinivasan.jpg"} style={{padding:15}} preview={{mask: false}} />}>
                <Meta title="Prathik Srinivasan" description={<a href="mailto:prathik.srinivasan@utexas.edu">prathik.srinivasan@utexas.edu</a>} />
              </Card>
            </Col>

            <Col span={4}>
              <Card cover={<Image alt="Nick Taylor" src={mediaPrefix+"NickTaylor.jpg"} style={{padding:15}} preview={{mask: false}} />}>
                <Meta title="Nick Taylor" description={<a href="mailto:ngtaylor@utexas.edu">ngtaylor@utexas.edu</a>} />
              </Card>
            </Col>

          </Row>

      </div>
    </div>
  );
}
