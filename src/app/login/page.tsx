'use client';

import LoginBox from '@/components/loginBox';
import React from 'react';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <LoginBox />
    </div>
  );
};

export default LoginPage;
