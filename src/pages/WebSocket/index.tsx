import React, { useRef, useMemo, useState } from 'react';
import { Button, Input } from 'antd';
import { useSessionid, useSocket } from './hook';

enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

const ReadyStateMap = {
  [ReadyState.Connecting]: '连接中',
  [ReadyState.Open]: '连接成功',
  [ReadyState.Closing]: '连接关闭中',
  [ReadyState.Closed]: '连接已关闭或连接失败',
};

export default () => {
  const messageHistory = useRef<any[]>([]);
  const [value, setValue] = useState('');
  const { clientId, sessionId } = useSessionid();
  const { readyState, sendMessage, latestMessage, disconnect, connect } = useSocket({
    clientId,
    sessionId,
    onOpen(event, instance) {
      const obj = {
        commandId: '100001',
        clientId: clientId,
        sessionId: sessionId,
        jsonContent: {
          clientId: clientId,
          sessionId: sessionId,
          digitalHumanId: 'b86863a244e24f18be79502fa685842a',
          scenarioId: null,
          customerServiceId: null,
          clientVideoUrl: 'rtsp://10.128.22.20:5544/49c88a90ad6e4238a663ef948db16f5a',
          hasVirtualImage: false,
          clientType: 'AI_ASSISTANT',
          clientSystemType: 'WINDOWS',
          videoSize: null,
          clientName: 'DESKTOP-UVP2VO8-YC',
          visibility: 'VISIBLE',
          greeting: 'GREET',
          staFbxMode: 'BVH',
          userId: null,
          serverAddress: '10.128.165.14:8082',
          deviceType: 'PC',
          version: null,
          token: null,
          dcsCmsIp: null,
          dcsCmsPort: 0,
          dcsEssIp: null,
          dcsEssPort: 0,
          dcsUserName: null,
          dcsPasswd: null,
          dcsDeviceId: null,
          deviceId: null,
          osVersion: 'Microsoft Windows NT 6.2.9200.0',
        },
      };
      const msg = JSON.stringify(obj);
      instance.send(msg);
      // sendMessage(msg);
    },
    onMessage(message) {
      // console.log('从服务端接受到的消息：',JSON.parse(message?.data);
    },
    onError(event, instance) {
      console.log('WebSocket连接发生错误：', event);
    },
  });

  messageHistory.current = useMemo(() => {
    const msgObj = latestMessage?.data ? JSON.parse(latestMessage?.data) : void 0;
    console.log('==msgObj====>', msgObj);
    return messageHistory.current.concat(msgObj);
  }, [latestMessage]);

  return (
    <div style={{ padding: 24 }}>
      {/* disconnect */}
      <Button
        onClick={() => disconnect && disconnect()}
        disabled={readyState !== ReadyState.Open}
        style={{ marginRight: 8 }}
      >
        ❌ disconnect
      </Button>

      {/* connect */}
      <Button
        onClick={() => connect && connect()}
        disabled={readyState === ReadyState.Open}
        type="primary"
      >
        {readyState === ReadyState.Connecting ? 'connecting' : '📞 connect'}
      </Button>

      <div style={{ marginTop: 8 }}>连接状态: {ReadyStateMap[readyState]}</div>

      <Input.TextArea
        placeholder="请输入发送的消息"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {/* send message */}
      <Button
        onClick={() => {
          const msg = {
            commandId: '200001',
            clientId: clientId,
            sessionId: sessionId,
            jsonContent: { message: value },
          };
          sendMessage(JSON.stringify(msg));
          setValue('');
        }}
        disabled={readyState !== ReadyState.Open}
        style={{ marginRight: 8, marginTop: 8, marginBottom: 16 }}
      >
        ✉️ send
      </Button>

      <div style={{ marginTop: 8 }}>
        <p>消息列表: </p>
        {/* {messageHistory.current.map((message, index) => (
          <p key={index} style={{ wordWrap: 'break-word' }}>
            {message?.data}
          </p>
        ))} */}
      </div>
    </div>
  );
};
