import { Layout, Menu, Space } from "antd";
import { createContext, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import About from "../components/About";
import BookDetail from "../components/BookDetail";
import BookList from "../components/BookList";
import MyFooter from "../components/MyFooter";
import MyHeader from "../components/MyHeader";
import MyStatistics from "../components/MyStatistics";
import OrderList from "../components/OrderList";
import ShoppingCart from "../components/ShoppingCart";
import styles from "../css/HomeView.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCartArrowDown,
  faList,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

const { Item } = Menu;
const { Content, Footer, Sider } = Layout;
export const AppContext = createContext({});

export default function HomeView(props) {
  const ShoppingCartData = useState([]);
  const navigate = useNavigate();

  const handleSiderClick = (path) => {
    navigate("/home/" + path);
  };

  return (
    <AppContext.Provider value={ShoppingCartData}>
      <Layout className={styles["total-layout"]}>
        <MyHeader />
        <Content className={styles["middle-content"]}>
          <Layout
            className={`${styles["site-layout-background"]} ${styles["middle-layout"]}`}
          >
            <Sider
              className={`${styles["site-layout-background"]} ${styles["sider"]}`}
              width={120}
            >
              <Menu
                mode="inline"
                style={{ height: "100%" }}
                defaultSelectedKeys={["shudan"]}
              >
                <Item key="list" onClick={() => handleSiderClick("list")}>
                  <Space>
                    <FontAwesomeIcon icon={faList} />
                    书架
                  </Space>
                </Item>
                <Item key="cart" onClick={() => handleSiderClick("cart")}>
                  <Space>
                    <FontAwesomeIcon icon={faShoppingCart} />
                    购物车
                  </Space>
                </Item>
                <Item key="order" onClick={() => handleSiderClick("order")}>
                  <Space>
                    <FontAwesomeIcon icon={faCartArrowDown} />
                    我的订单
                  </Space>
                </Item>
                <Item
                  key="userStatistics"
                  onClick={() => handleSiderClick("user-statistics")}
                >
                  <Space>
                    <FontAwesomeIcon icon={faBook} />
                    我的书籍
                  </Space>
                </Item>
                <Item key="about" onClick={() => handleSiderClick("about")}>
                  <Space>
                    <FontAwesomeIcon icon={faCircleQuestion} />
                    关于
                  </Space>
                </Item>
              </Menu>
            </Sider>
            <Content className={styles["main-content"]}>
              <Routes>
                <Route path="/list" element={<BookList />} />
                <Route path="/detail" element={<BookDetail />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/order" element={<OrderList />} />
                <Route path="/user-statistics" element={<MyStatistics />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Content>
          </Layout>
        </Content>
        <MyFooter />
      </Layout>
    </AppContext.Provider>
  );
}
