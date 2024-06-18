import { useRef } from 'react';
import { BASE_WS_URL, generateRandomString } from './utils';
import { useWebSocket } from 'ahooks';
import type { Options } from 'ahooks/lib/useWebSocket';

export function useSocket({
  clientId,
  sessionId,
  ...opts
}: Options & { clientId: string; sessionId: string } = {}) {
  const wsUrlRef = useRef(`${BASE_WS_URL}?clientId=${clientId}&sessionId=${sessionId}`);
  const ret = useWebSocket(wsUrlRef.current, { manual: true, ...opts });
  return ret;
}

export function useSessionid() {
  const idRef = useRef({
    clientId: generateRandomString(),
    sessionId: generateRandomString(),
  });
  return idRef.current;
}
