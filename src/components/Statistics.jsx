import { DatePicker, Divider, Table, Typography } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { getAllOrders } from "../services/OrderServices";
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
    getAllOrders().then((data) => {
      generateBooksWithAmount(data);
    });
  }, []);

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
      title: "数量",
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
      <Typography.Title level={3}>书籍数据</Typography.Title>
      <MyDivider />
      <DatePicker.RangePicker onCalendarChange={handleSearchDateRange} />
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

const UserStatistics = () => {
  const [users, setUsers] = useState([]);

  const generateUserWithConsumption = (orders) => {
    console.log(orders);
    const newUsersWithConsumption = orders
      .map((order) => {
        const totalMoney = order.orderItems.reduce((acc, cur) => {
          return acc + cur.price;
        }, 0);

        return {
          id: order.user.id,
          nickname: order.user.nickname,
          money: totalMoney,
        };
      })
      .reduce((acc, cur) => {
        const index = acc.findIndex((order) => {
          return order.id === cur.id;
        });

        if (index !== -1) {
          const newUser = {
            ...acc[index],
            money: acc[index].money + cur.money,
          };
          acc.splice(index, 1, newUser);
          return acc;
        } else {
          return [...acc, cur];
        }
      }, [])
      .map((item) => {
        return { ...item, money: item.money.toFixed(2) };
      });

    console.log(newUsersWithConsumption);
    setUsers(newUsersWithConsumption);
  };

  useEffect(() => {
    getAllOrders().then((data) => {
      generateUserWithConsumption(data);
    });
  }, []);

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
      generateUserWithConsumption(newOrders);
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "用户昵称",
      dataIndex: "nickname",
      key: "nickname",
    },
    {
      title: "总消费",
      dataIndex: "money",
      key: "money",
      sorter: (a, b) => {
        return a.money - b.money;
      },
    },
  ];

  return (
    <div>
      <Typography.Title level={3}>用户数据</Typography.Title>
      <MyDivider />
      <DatePicker.RangePicker onCalendarChange={handleSearchDateRange} />
      <MyDivider />
      <Table
        rowKey={(record) => record.id}
        dataSource={users}
        columns={columns}
        pagination={false}
        bordered
      />
    </div>
  );
};

export default function Statistics() {
  return (
    <div>
      <BookStatistics />
      <Divider />
      <UserStatistics />
    </div>
  );
}
