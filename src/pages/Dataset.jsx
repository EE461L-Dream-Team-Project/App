import { PageHeader, Table, message } from "antd";
import React, { useState, useEffect } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { get } from "../request";
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

  const [datasets, setDatsets] = useState([]);
  const fetchDatasets = async () => {
    const datasets = await get("/datasets");
    setDatsets(datasets.data);
  };

  useEffect(() => {
    // fetch existing Datsets when entering Datasets Page
    fetchDatasets();
  }, []);
  


  return (
    <>
      <PageHeader title="Datasets">
        <Table columns={columns} dataSource={datasets} />
      </PageHeader>
    </>
  );
}
