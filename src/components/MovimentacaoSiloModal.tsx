import React from 'react';
import { Modal, Form, Select, InputNumber, Button } from 'antd';

const { Option } = Select;

export const MovimentacaoSiloModal = ({ visible, onSubmit, silos = [], onCancel }: any) => {
  return (
    <Modal
      title={<div style={{ textAlign: 'center' }}>Registrar Entrada/Saida</div>} // Centraliza o título
      open={visible}
      style={{ alignSelf: 'center' }}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        onFinish={onSubmit}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name="tipo"
          label="Movimento"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="Entrada">Entrada</Option>
            <Option value="Saida">Saida</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="silo_id"
          label="Silo"
          rules={[{ required: true }]}
        >
          <Select
            options={Array.isArray(silos) ? silos.map((item: any) => ({
              label: item.nome,
              value: item.id,
            })) : []}
          />
        </Form.Item>
        <Form.Item
          name="quantidade"
          label="Peso (kg)"
          rules={[{ required: true }]}
        >
          <InputNumber decimalSeparator="," style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 24 }}
          style={{ textAlign: 'center' }}
        >
          <Button type="primary" htmlType="submit">
            Registrar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
