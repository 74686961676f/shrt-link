import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n';
import { Loader2Icon } from 'lucide-react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense
    fallback={<div className='fixed inset-0 flex items-center justify-center'><Loader2Icon className='animate-spin'/></div>}
    >
      <App />
    </Suspense>
  </StrictMode>,
)
