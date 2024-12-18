"use client";

import { Button, Form, Input } from "antd";

const ForgotPasswordPage = () => {
  return (
    <div className="flex flex-col w-full max-w-[20em]">
      <p className="text-[1.5em] font-semibold">Forgot Password</p>
      <p className="text-red-600 font-bold">Not working yet</p>
      <div className="flex flex-col">
        <Form
          layout="vertical"
          onFinish={() => {
            // pass
          }}
        >
          <Form.Item label="Email">
            <Input type="email" placeholder="hi@yassh.in" required />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
