import { Card, DatePicker, Empty, Form, List, Space, Typography } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getOrders } from "../services/OrderServices";
import { BookCard } from "./BookCard";
import MyDivider from "./MyDivider";

export default function OrderList() {
  const [orderGroups, setOrderGroups] = useState([]);

  useEffect(async () => {
    const groups = await getOrders();
    setOrderGroups(groups);
  }, []);

  const handleSearchDateRange = (range) => {
    if (!range[0] || !range[1]) return;
    const start = range[0];
    const end = range[1];

    if (end.diff(start) <= 0) return;

    getOrders().then((data) => {
      const newOrders = data.filter((order) => {
        const orderMoment = new moment(order.timeStamp);
        return start.diff(orderMoment) < 0 && end.diff(orderMoment) > 0;
      });
      setOrderGroups(newOrders);
    });
  };

  return (
    <div>
      <Typography.Title level={3}>我的订单</Typography.Title>
      <MyDivider />
      <Typography.Title level={4}>通过时间段筛选订单</Typography.Title>
      <Form>
        <Form.Item label="请选择时间段">
          <DatePicker.RangePicker onCalendarChange={handleSearchDateRange} />
        </Form.Item>
      </Form>
      <MyDivider />
      {orderGroups.length ? (
        <Space direction="vertical" style={{ display: "flex" }}>
          {!!orderGroups &&
            orderGroups.map((order) => {
              return (
                <Card
                  title={
                    <Typography.Title level={5}>
                      创建时间：
                      {moment(order.timeStamp).format("YYYY-MM-DD HH:mm:ss")}
                    </Typography.Title>
                  }
                >
                  <List
                    dataSource={order.orderItems}
                    grid={{ gutter: 10, column: 4 }}
                    renderItem={(item) => {
                      return (
                        <List.Item>
                          <BookCard book={item.book} />
                        </List.Item>
                      );
                    }}
                  />
                </Card>
              );
            })}
        </Space>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"暂无订单"} />
      )}
    </div>
  );
}
