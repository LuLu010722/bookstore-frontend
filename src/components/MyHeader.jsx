import { faBookmark } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Tooltip, Typography, message } from "antd"
import { Header } from "antd/lib/layout/layout"
import { useEffect, useState } from "react"
import cookie from "react-cookies"
import { Link, useNavigate } from "react-router-dom"
import { logout, getUser } from "../services/UserServices"
import moment from "moment"
import swal from "sweetalert"

export default function MyHeader() {
  const [user, setUser] = useState(null)
  const userMode = cookie.load("user_mode")
  const currentMode = cookie.load("current_mode")
  const navigate = useNavigate()

  useEffect(async () => {
    const res = await getUser()
    setUser(res)
  }, [])

  const handleLogout = () => {
    logout().then((duration) => {
      const durationMoment = moment.duration(duration)
      const durationString =
        durationMoment.hours() +
        "时" +
        durationMoment.minutes() +
        "分" +
        durationMoment.seconds() +
        "秒。"
      message.info("登出成功，共计在线：" + durationString)
      cookie.remove("user_id")
      navigate("/login")
    })
  }

  return (
    <Header 
      style={{
        height: 48,
        backgroundColor: "grey",
        display: "flex",
        alignItems: "center",
        padding: "0 25%"
      }}
    >
      <FontAwesomeIcon icon={faBookmark} size="lg" color="white" />
      <div style={{ width: "16px" }} />
      <Typography.Title level={5} style={{ margin: 0, color: "white" }}>
        网上书店
      </Typography.Title>
      <div style={{ flexGrow: 1 }} />
      {!user ? (
        <Link to={"/login"}>
          <Typography.Title level={5} style={{ margin: 0, color: "white" }}>
            登录
          </Typography.Title>
        </Link>
      ) : (
        <Tooltip
          color="white"
          title={
            <div style={{ padding: 8 }}>
              <Button type="primary" onClick={handleLogout}>
                退出当前账户
              </Button>
            </div>
          }
        >
          <Typography.Title
            level={5}
            style={{ margin: 0, color: "white", cursor: "default" }}
          >
            {!!user && user.nickname}
          </Typography.Title>
        </Tooltip>
      )}
      <div style={{ width: "16px" }} />
      <Link to={"/signup"}>
        <Typography.Title level={5} style={{ margin: 0, color: "white" }}>
          注册
        </Typography.Title>
      </Link>
      {userMode === "admin" && (
        <>
          <div style={{ width: "16px" }} />
          <Typography.Title level={5} style={{ margin: 0, color: "white" }}>
            <div
              onClick={() => {
                if (currentMode === "admin") {
                  cookie.save("current_mode", "user")
                } else {
                  cookie.save("current_mode", "admin")
                }
              }}
            >
              {currentMode === "admin" ? (
                <Link style={{ color: "white" }} to="/home/list">
                  用户模式
                </Link>
              ) : (
                <Link style={{ color: "white" }} to="/admin/user">
                  管理员模式
                </Link>
              )}
            </div>
          </Typography.Title>
        </>
      )}
      {/*<div style={{width: "16px"}}/>*/}
      {/*{mode === "user" ? (*/}
      {/*    <Link to="/admin/user">*/}
      {/*        <Typography.Title level={5} style={{margin: 0, color: "white"}}>*/}
      {/*            管理员入口*/}
      {/*        </Typography.Title>*/}
      {/*    </Link>*/}
      {/*) : (*/}
      {/*    <Link to="/home/list">*/}
      {/*        <Typography.Title level={5} style={{margin: 0, color: "white"}}>*/}
      {/*            返回用户*/}
      {/*        </Typography.Title>*/}
      {/*    </Link>*/}
      {/*)}*/}
    </Header>
  )
}
