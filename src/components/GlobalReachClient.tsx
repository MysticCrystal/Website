'use client';

import dynamic from 'next/dynamic';

const GlobalReach = dynamic(() => import('@/components/GlobalReach'), {
  ssr: false,
});

export default GlobalReach;
