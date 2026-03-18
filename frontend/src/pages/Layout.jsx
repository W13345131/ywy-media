import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { X, Menu } from 'lucide-react';
import { dummyUserData } from '../assets/assets';
import Loading from '../components/Loading';



// 提供统一的页面布局（Sidebar + 内容区 + 移动端菜单按钮），并通过 Outlet 渲染子页面
const Layout = () => {

    const user = dummyUserData;

    const [sidebarOpen, setSidebarOpen] = useState(false);



    // 如果用户存在 → 显示页面
    // 如果没有用户 → 显示 loading
    return user ? (
        <div className='w-full flex h-screen'>
            {/* 引入侧边栏 */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className='flex-1 bg-slate-50'>
                {/* Outlet 作用：渲染子路由 */}
                <Outlet />
            </div>
            {
                // 如果侧边栏打开 → 显示 X 图标
                // sm:hidden 屏幕 ≥ 640px 时隐藏
                sidebarOpen ?
                // absolute 作用：绝对定位，相对于父元素定位
                <X className='absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden' onClick={() => setSidebarOpen(false)} />
                :
                // 如果侧边栏关闭 → 显示 Menu 图标
                <Menu className='absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden' onClick={() => setSidebarOpen(true)} />
            }
        </div>
    ) : (
        <Loading />
    );
};

export default Layout;