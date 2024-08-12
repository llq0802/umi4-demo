import React, { useState } from 'react';
import { Flex, Button, Modal, Drawer, Typography, Tag } from 'antd';

const { Text, Link } = Typography;

export default function Antd() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Text code>Ant Design (code)</Text>
      <Text code>Ant Design (code)</Text>
      <Text keyboard>Ant Design (code)</Text>
      <Tag>Ant Design (code)</Tag>

      <Flex wrap gap={16}>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>

        {/* <Drawer title="Basic Drawer" onClose={handleCancel} open={isModalOpen}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer> */}
      </Flex>
    </div>
  );
}
