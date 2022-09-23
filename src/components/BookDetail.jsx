import { Button, Descriptions, message, Space, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getBook } from "../services/BookServices";
import { AppContext } from "../views/HomeView";

const { Title, Paragraph } = Typography;

export default function BookDetailPage() {
  const location = useLocation();
  const [book, setBook] = useState(null);
  const [cart, setCart] = useContext(AppContext);
  const arr = location.search.slice(1).split("&");

  let params = {};
  for (let item of arr) {
    const pair = item.split("=");
    params[pair[0]] = pair[1];
  }

  const handleAddCart = () => {
    const isExist = cart.find((cartBook) => {
      return cartBook.id === book.id;
    });

    if (isExist) {
      message.warn("已经将这本书添加到购物车了哦，请不要重复添加");
      return;
    }
    message.success(
      "添加成功，请查看购物车，如需购买多本，请在购物车中设置数量"
    );
    setCart([...cart, { ...book, key: book.id }]);
  };

  useEffect(async () => {
    const data = await getBook(params.id);
    setBook(data);
  }, []);

  return (
    <>
      {!!book && (
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <img width={200} src={book.imgUrl} alt="can't resolve picture" />
          <div style={{ minWidth: 16 }} />
          <div>
            <Descriptions title={book.title}>
              <Descriptions.Item label="作者" span={3}>
                {book.author}
              </Descriptions.Item>
              <Descriptions.Item label="简介" span={3}>
                {book.description}
              </Descriptions.Item>
              <Descriptions.Item label="价格" span={1}>
                {book.price}
              </Descriptions.Item>
              <Descriptions.Item label="ISBN编号" span={1}>
                {book.isbn}
              </Descriptions.Item>
              <Descriptions.Item label="库存" span={1}>
                {book.remaining}
              </Descriptions.Item>
              <Descriptions.Item>
                <Space>
                  {/* <Button onClick={handleBuy}>购买</Button> */}
                  <Button type="primary" onClick={handleAddCart}>
                    加入购物车
                  </Button>
                </Space>
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      )}
    </>
  );
}
