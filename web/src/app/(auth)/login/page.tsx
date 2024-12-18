"use client";

import { Button, Form, Input } from "antd";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

const LoginPage = () => {
  return (
    <div className="flex flex-col w-full max-w-[20em]">
      <p className="text-[1.5em] font-semibold">Login</p>
      <div className="flex flex-col">
        <Form layout="vertical" onFinish={(values) => {
          axios.post("/api/users/login", values).then((res) => {
            toast.success("Logged in successfully");
            if(typeof window !== "undefined"){
              localStorage.setItem("token", res.data.token);
            }
            window.location.href = "/";
          }).catch((e) => {
            toast.error(e.response.data.message);
          });
        }}>
          <Form.Item label="Email" name={"email"}>
            <Input type="email" placeholder="hi@yassh.in" required />
          </Form.Item>
          <Form.Item label="Password" name={"password"}>
            <Input type="password" placeholder="Your-Secret-Password" required />
          </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            </Form.Item>
            <p><Link href={"/forgot-password"}>Forgot Password? </Link></p>
            <p>No Account? <Link href={"/register"}>Register now</Link></p>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;