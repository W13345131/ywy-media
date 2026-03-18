import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/react'


// 获取环境变量
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// 如果环境变量不存在，抛出错误
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}


createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    {/* BrowserRouter 作用：路由器，用于管理应用程序的导航 */}
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </ClerkProvider>,
)
