import React, { Suspense } from 'react';
import type { FC, ReactNode } from 'react';

import { useRef, useEffect } from 'react';

const Repeater: FC<{
  mode: 'visible' | 'hidden';
  children: ReactNode;
}> = (props) => {
  // props
  const { mode, children } = props;
  // refs
  const resolveRef = useRef<() => void>();
  // methods
  const resolvePromise = () => {
    if (resolveRef.current) {
      resolveRef.current();
      resolveRef.current = void 0;
    }
  };

  resolvePromise();

  useEffect(() => resolvePromise, []);

  if (mode === 'hidden') {
    throw new Promise<void>((resolve) => (resolveRef.current = resolve));
  }
  return <>{children}</>;
};

export const Offscreen: FC<{
  mode: 'visible' | 'hidden';
  children: ReactNode;
}> = (props) => {
  const { mode, children } = props;
  return (
    <Suspense>
      <Repeater mode={mode}>{children}</Repeater>
    </Suspense>
  );
};
