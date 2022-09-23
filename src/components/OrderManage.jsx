import { Card, DatePicker, Form, Input, List, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { getAllOrders } from "../services/OrderServices";
import { BookCard } from "./BookCard";
import MyDivider from "./MyDivider";
import moment from "moment";

export default function OrderManage() {
  const [orders, setOrders] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    getAllOrders().then((data) => {
      console.log(data);
      setOrders(data);
    });
  }, []);

  const handleSearchTitle = () => {
    const keyword = form.getFieldValue("keyword");

    if (!keyword) {
      getAllOrders().then((data) => {
        setOrders(data);
      });
      return;
    }

    getAllOrders().then((data) => {
      const newOrders = data.filter((order) => {
        return order.orderItems.some((orderItem) => {
          return orderItem.book.title.search(keyword) !== -1;
        });
      });
      console.log(newOrders);
      setOrders(newOrders);
    });
  };

  const handleSearchDateRange = (range) => {
    if (!range[0] || !range[1]) return;
    const start = range[0];
    const end = range[1];

    if (end.diff(start) <= 0) return;
    getAllOrders().then((data) => {
      const newOrders = data.filter((order) => {
        const orderMoment = new moment(order.timeStamp);
        return start.diff(orderMoment) < 0 && end.diff(orderMoment) > 0;
      });

      setOrders(newOrders);
    });
  };

  return (
    <div>
      <Typography.Title level={3}>订单管理</Typography.Title>
      <MyDivider />
      <Typography.Title level={4}>搜索</Typography.Title>
      <Form form={form}>
        <Form.Item name="keyword">
          <Input placeholder="请输入书名" onPressEnter={handleSearchTitle} />
        </Form.Item>
        <Form.Item name="range">
          <DatePicker.RangePicker onCalendarChange={handleSearchDateRange} />
        </Form.Item>
      </Form>
      <MyDivider />
      <Space style={{ width: "100%" }} direction="vertical">
        {orders.map((order, index) => {
          return (
            <Card
              title={
                <Typography.Title level={5}>
                  创建时间：
                  {moment(order.timeStamp).format("YYYY-MM-DD HH:mm:ss")}
                  ，用户名：{order.user.username}
                </Typography.Title>
              }
              key={index}
            >
              <List
                dataSource={order.orderItems}
                grid={{ grid: 10, column: 4 }}
                renderItem={(orderItem) => {
                  return (
                    <List.Item>
                      <BookCard book={orderItem.book} />
                    </List.Item>
                  );
                }}
              />
            </Card>
          );
        })}
      </Space>
    </div>
  );
}
