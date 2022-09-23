import { Button, Form, Input, message } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import styles from "../css/Login.module.css";
import { register } from "../services/UserServices";

export default function Signup() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const { nickname, username, password, confirm, email } =
      form.getFieldsValue();
    if (password !== confirm) {
      message.error("两次密码输入不一致");
      return;
    }
    const status = await register({ nickname, username, password, email });

    switch (status) {
      case "REGISTER_ALL_OK":
        swal({
          title: "注册成功！",
          icon: "success",
        }).then(() => {
          navigate("/login");
        });
        break;
      case "REGISTER_DUPLICATE":
        message.warn("对不起，用户已存在");
        break;
      default:
        break;
    }
  };
  return (
    <div className={styles["root"]}>
      <div className={styles["wrapper"]}>
        <Form form={form} labelAlign="left" onFinish={handleSubmit}>
          <Form.Item
            name="nickname"
            rules={[{ required: true, message: "请设置昵称" }]}
          >
            <Input placeholder="请设置昵称" />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请设置用户名" }]}
          >
            <Input placeholder="请设置用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请设置密码" }]}
          >
            <Input.Password placeholder="请设置密码" />
          </Form.Item>
          <Form.Item
            name="confirm"
            rules={[{ required: true, message: "请再次输入密码" }]}
          >
            <Input.Password placeholder="请再次确认您设置的密码" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, type: "email", message: "请输入您的邮箱地址" },
            ]}
          >
            <Input placeholder="请填写邮箱地址" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              确认
            </Button>
          </Form.Item>
        </Form>
        <Link to="/login">已有账号，点击登录</Link>
      </div>
    </div>
  );
}
