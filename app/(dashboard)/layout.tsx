import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import type React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-screen bg-background'>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Header />
        <main className='flex-1 overflow-y-auto p-6'>{children}</main>
      </div>
    </div>
  );
}
