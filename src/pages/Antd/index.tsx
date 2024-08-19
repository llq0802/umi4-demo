import React, { useState } from 'react';
import { Flex, Button, Modal, Drawer, Typography, Tag, Popover } from 'antd';

const { Text, Link } = Typography;

const content = (
  <div
    style={{
      width: 92,
    }}
  >
    <p>Content</p>
    <p>Content</p>
  </div>
);

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
    <div style={{ position: 'relative' }}>
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

        <Popover
          placement="bottom"
          content={content}
          arrow={false}
          open
          color="red"
          align={{
            // offset: [0, 10],
            // offset: ['0%', '-50%'],
            targetOffset: ['0%', '50%'],
          }}
          // getPopupContainer={(triggerNode) => triggerNode?.parentNode}
        >
          <Button
            style={{
              position: 'relative',
              zIndex: 9999,
            }}
            type="primary"
          >
            Hover me
          </Button>
        </Popover>

        {/* <Drawer title="Basic Drawer" onClose={handleCancel} open={isModalOpen}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer> */}
      </Flex>
    </div>
  );
}
