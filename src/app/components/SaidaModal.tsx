import { Modal, Form, Input, Select, InputNumber } from 'antd';

const { Option } = Select;

export const SaidaModal = ({ visible, onSubmit, onCancel }: any) => (
  <Modal title="Registrar Saida" visible={visible} onCancel={onCancel} footer={null}>
    <Form onFinish={onSubmit}>
      <Form.Item name="silo" label="Silo" rules={[{ required: true }]}>
        <Select>
          <Option value="Silo 1">Silo 1</Option>
          <Option value="Silo 2">Silo 2</Option>
        </Select>
      </Form.Item>
      <Form.Item name="peso" label="Peso (kg)" rules={[{ required: true }]}>
        <InputNumber decimalSeparator=',' />
      </Form.Item>
      <Form.Item>
        <button type="submit">Registrar</button>
      </Form.Item>
    </Form>
  </Modal>
);
