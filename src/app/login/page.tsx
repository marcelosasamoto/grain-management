"use client";

import { useState } from "react";
import { Button, Form, Input, message, Typography } from "antd";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { NextRequest } from "next/server";

const { Title } = Typography;

const LoginPage = (req:NextRequest) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/"; // Página padrão se não houver callbackUrl


  const handleLogin = async (values: { email: string; senha: string }) => {
    setLoading(true);
    const { email, senha } = values;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        senha,
      });

      if (res?.error) {
        message.error("Credenciais inválidas. Por favor, tente novamente.");
      } else {
        message.success("Login bem-sucedido!");
        router.push(callbackUrl); // Substitua pelo caminho desejado após o login
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      message.error("Ocorreu um erro ao processar o login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div
        style={{
          maxWidth: 400,
          width: "100%",
          padding: "20px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          backgroundColor: "white",
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          Login
        </Title>
        <Form
          name="login-form"
          layout="vertical"
          onFinish={handleLogin}
          initialValues={{ email: "", senha: "" }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Por favor, insira seu email!" },
              { type: "email", message: "Por favor, insira um email válido!" },
            ]}
          >
            <Input placeholder="Digite seu email" />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="senha"
            rules={[{ required: true, message: "Por favor, insira sua senha!" }]}
          >
            <Input.Password placeholder="Digite sua senha" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
