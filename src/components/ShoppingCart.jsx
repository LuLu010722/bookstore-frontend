import {
  Button,
  Collapse,
  Divider,
  message,
  Modal,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { useContext, useState } from "react";
import swal from "sweetalert";
import { createOrderByBookIds } from "../services/OrderServices";
import { AppContext } from "../views/HomeView";

export default function ShoppingCartPage() {
  const [loading, setLoading] = useState(false);
  const [modalVisable, setModalVisable] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);

  const [dataSource, setDataSource] = useContext(AppContext);

  const handleBuy = () => {
    if (selectedBooks.length === 0) {
      message.warn("请至少选择一本书");
      return;
    }
    setModalVisable(true);
  };

  const handleOk = async () => {
    setLoading(true);
    const bookIds = selectedBooks.map((book) => {
      return book.id;
    });
    console.log(bookIds);
    const res = await createOrderByBookIds(bookIds);
    if (res === "ORDER_ALL_OK") {
      await swal({
        title: "创建订单成功！",
        icon: "success",
      }).then(() => {
        const newDataSource = dataSource.filter((book) => {
          return !selectedBooks.some((selected) => {
            return selected.id === book.id;
          });
        });
        setDataSource(newDataSource);
        setSelectedBooks([]);
      });
    } else {
      await swal({
        title: "创建订单失败！",
        icon: "error",
      });
    }
    setLoading(false);
    setModalVisable(false);
  };

  const handleCansel = () => {
    setModalVisable(false);
  };

  const handleSelect = (keys, rows) => {
    const books = rows.reduce((prev, cur) => {
      return [...prev, cur];
    }, []);
    setSelectedBooks(books);
  };

  const columns = [
    {
      title: "书名",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <Tag type="primary" color={"red"}>
          {price}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        sticky
        bordered
        scroll={{ y: 240 }}
        pagination={{
          position: ["none", "none"],
        }}
        rowSelection={{
          type: "checkbox",
          onChange: handleSelect,
        }}
      />
      <Button type="primary" onClick={handleBuy} style={{ marginTop: "24px" }}>
        购买
      </Button>
      <Modal
        visible={modalVisable}
        onOk={handleOk}
        onCancel={handleCansel}
        closable={false}
        centered
        okText="确认"
        cancelText="取消"
        okButtonProps={{ loading: loading }}
      >
        <Typography.Title level={3}>订单列表</Typography.Title>
        <Space direction="vertical" style={{ display: "flex" }}>
          {selectedBooks.map((book, index) => {
            return (
              <Collapse key={index}>
                <Collapse.Panel header={book.title}>
                  作者：{book.author}
                  <br />
                  价格：{book.price}
                </Collapse.Panel>
              </Collapse>
            );
          })}
        </Space>
        <Divider />
        <Typography.Text>
          总金额：
          {selectedBooks
            .reduce((acc, cur) => {
              return acc + cur.price;
            }, 0)
            .toFixed(2)}
        </Typography.Text>
      </Modal>
    </div>
  );
}
