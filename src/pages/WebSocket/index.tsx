import React, { useRef, useMemo, useState } from 'react';
import { Button, Input } from 'antd';
import { useSocket } from './hook';
import { ReadyState, ReadyStateMap, initOpen, startRecordr, stopRecordr } from './utils';
import { src } from './url';

export default () => {
  const messageHistory = useRef<any[]>([]);
  const [value, setValue] = useState('');

  const { clientId, sessionId, readyState, sendMessage, latestMessage, disconnect, connect } =
    useSocket({
      clientId,
      sessionId,
      onOpen(event, instance) {
        const msg = initOpen(clientId, sessionId);
        instance.send(msg);
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

    if (msgObj) {
      console.log('==最新的消息: ====>', msgObj);
    }

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
            clientId,
            sessionId,
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

      <Button
        onClick={() => {
          startRecordr();
        }}
      >
        开始录音
      </Button>
      <Button
        onClick={() => {
          stopRecordr((base64ring) => {
            console.log('停止录音', base64ring);
            const obj = {
              commandId: '200100',
              clientId,
              sessionId,
              jsonContent: {
                message: base64ring.split(',')[1],
              },
            };
            const audio = document.querySelector('#audio');
            audio.src = base64ring;
            // audio?.play?.();
            sendMessage(JSON.stringify(obj));
          });
        }}
      >
        停止录音
      </Button>

      <hr />
      <audio controls id="audio" src={src}></audio>
      <hr />

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
