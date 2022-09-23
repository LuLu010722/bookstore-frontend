import { Button, Checkbox, Form, Input } from "antd"
import cookie from "react-cookies"
import { Link, useNavigate } from "react-router-dom"
import swal from "sweetalert"
import styles from "../css/Login.module.css"
import { login } from "../services/UserServices"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { LockOutlined, UserOutlined } from "@ant-design/icons"

export default function LoginView() {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const handleSubmit = () => {
    form.validateFields().then(async () => {
      const { username, password } = form.getFieldsValue()

      const status = await login(username, password)
      switch (status) {
        case "LOGIN_FORBIDDEN":
          swal({
            icon: "error",
            title: "登录失败",
            text: "您的账号已经被禁用"
          })
          break
        case "LOGIN_ADMIN":
          swal({
            icon: "success",
            title: "管理员登录成功"
          }).then(() => {
            cookie.save("user_mode", "admin")
            cookie.save("current_mode", "admin")
            navigate("/admin/user")
          })
          break
        case "LOGIN_CUSTOMER":
          swal({
            icon: "success",
            title: "用户登录成功"
          }).then(() => {
            cookie.save("user_mode", "customer")
            navigate("/home/list")
          })
          break
        case "LOGIN_NOT_FOUND":
          swal({
            icon: "error",
            title: "登录失败",
            text: "未找到用户"
          })
          break
      }
    })
  }

  return (
    <div className={styles["root"]}>
      <div className={styles["wrapper"]}>
        <Form form={form} labelAlign="left" onFinish={handleSubmit}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>记住我</Checkbox>
            <Link to="/forget" style={{ float: "right" }}>
              忘记密码
            </Link>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              登录
            </Button>
          </Form.Item>
          <Form.Item>
            <Link to="/signup">没有账号？点此注册</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
