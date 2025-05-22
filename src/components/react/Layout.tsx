import { Toaster } from 'react-hot-toast';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ style: { background: '#111', color: '#39ff14' } }} />
      {children}
    </>
  );
}
