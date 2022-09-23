import { DatePicker, Form, Table, Typography } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { getOrders } from "../services/OrderServices";
import MyDivider from "./MyDivider";

const BookStatistics = () => {
  const [books, setBooks] = useState([]);

  const generateBooksWithAmount = (orders) => {
    const flatOrderItems = orders
      .flatMap((order) => {
        return order.orderItems;
      })
      .map((item) => {
        return item.book;
      });
    console.log(flatOrderItems);
    const newBooksWithAmount = flatOrderItems.reduce((acc, cur) => {
      const index = acc.findIndex((book) => {
        return book.title === cur.title;
      });
      if (index !== -1) {
        const newBook = { ...acc[index], amount: acc[index].amount + 1 };
        acc.splice(index, 1, newBook);
        return acc;
      } else {
        return [...acc, { id: cur.id, title: cur.title, amount: 1 }];
      }
    }, []);
    console.log(newBooksWithAmount);

    setBooks(newBooksWithAmount);
  };

  useEffect(() => {
    getOrders().then((data) => {
      generateBooksWithAmount(data);
    });
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
      generateBooksWithAmount(newOrders);
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "书名",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "购买数量",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => {
        console.log(a, b);
        return a.amount - b.amount;
      },
    },
  ];
  return (
    <div>
      <Typography.Title level={3}>我的书籍数据</Typography.Title>
      <MyDivider />
      <Form>
        <Form.Item label="请选择时间段">
          <DatePicker.RangePicker onCalendarChange={handleSearchDateRange} />
        </Form.Item>
      </Form>
      <MyDivider />
      <Table
        rowKey={(record) => record.id}
        pagination={false}
        columns={columns}
        dataSource={books}
        bordered
      />
    </div>
  );
};

export default function MyStatistics() {
  return (
    <div>
      <BookStatistics />
    </div>
  );
}
