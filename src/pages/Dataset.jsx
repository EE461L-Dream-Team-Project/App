import { PageHeader, Table } from "antd";
import React from "react";
import { DownloadOutlined } from "@ant-design/icons";
export default function Dataset() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "50%",
      key: "description",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Published On",
      dataIndex: "published",
      key: "published",
    },
    {
      title: "Download",
      dataIndex: "download",
      key: "download",
      render: (_, item) => (
        <a href={item.link} target="_blank">
          Download <DownloadOutlined />
        </a>
      ),
    },
  ];

  const dataSource = [
    {
      name: "Abdominal and Direct Fetal ECG Database",
      description:
        "The research material included in the Abdominal and Direct Fetal Electrocardiogram Database contains multichannel fetal electrocardiogram (FECG) recordings obtained from 5 different women in labor, between 38 and 41 weeks of gestation. The recordings were acquired in the Department of Obstetrics at the Medical University of Silesia, by means of the KOMPOREL system for acquisition and analysis of fetal electrocardiogram (ITAM Institute, Zabrze, Poland). Each recording comprises four differential signals acquired from maternal abdomen and the reference direct fetal electrocardiogram registered from the fetal head.",
      size: "14.6Mb",
      published: "Aug. 9, 2012",
      link: "https://physionet.org/static/published-projects/adfecgdb/abdominal-and-direct-fetal-ecg-database-1.0.0.zip",
    },
    {
      name: "AF Termination Challenge Database",
      description:
        "This database of two-channel ECG recordings has been created for use in the Computers in Cardiology Challenge 2004, an open competition with the goal of developing automated methods for predicting spontaneous termination of atrial fibrillation (AF). See the challenge announcement for information about the competition.",
      size: "2.4Mb",
      published: "April 11, 2004",
      link: "https://physionet.org/static/published-projects/aftdb/af-termination-challenge-database-1.0.0.zip",
    },
    {
      name: "A Pressure Map Dataset for In-bed Posture Classification",
      description:
        "In this project, we collected in-bed posture pressure data from multiple adult participants using two different types of pressure sensing mats. To the best of our knowledge, our dataset, PmatData is the first publicly-available dataset of pressure sensor data which includes various sleeping postures. ",
      size: "102.3Mb",
      published: "Sept. 28, 2017",
      link: "https://physionet.org/static/published-projects/pmd/a-pressure-map-dataset-for-in-bed-posture-classification-1.0.0.zip",
    },
  ];
  return (
    <>
      <PageHeader title="Datasets">
        <Table columns={columns} dataSource={dataSource} />
      </PageHeader>
    </>
  );
}
