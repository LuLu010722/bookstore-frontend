import { Descriptions } from "antd";
import React from "react";

export default function AboutPage() {
  return (
    <Descriptions column={1}>
      <Descriptions.Item label="作者">卢天宇</Descriptions.Item>
      <Descriptions.Item label="学院">软件学院</Descriptions.Item>
      <Descriptions.Item label="年级">2020级</Descriptions.Item>
    </Descriptions>
  );
}
