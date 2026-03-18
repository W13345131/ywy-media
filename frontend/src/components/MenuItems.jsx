import React from 'react';
import { menuItemsData } from '../assets/assets';
// NavLink：react-router-dom 提供的组件，用于创建导航链接，并能自动判断当前是否激活
import { NavLink } from 'react-router-dom';


// setSidebarOpen用于点击菜单时 关闭侧边栏（通常用于移动端 sidebar）
const MenuItems = ({ setSidebarOpen }) => {
    return (
        // space-y-1：垂直间距为1
        <div className='px-6 text-gray-600 space-y-1 font-medium'>
            {
                // 遍历菜单配置数组
                // to：导航链接的地址
                // label：导航链接的文本
                // Icon：导航链接的图标
                menuItemsData.map(({ to, label, Icon }) => (
                    <NavLink
                      // key：用于唯一标识每个导航链接
                      key={to}
                      // to：导航链接的地址
                      to={to}
                      // end：作用：防止 / 匹配所有路径
                      end={to === '/'}
                      onClick={() => setSidebarOpen(false)}
                      // isActive：作用：判断当前是否激活
                      className={({ isActive }) => `px-3.5 py-2 flex items-center gap-3 rounded-xl
                      ${
                        // 如果当前是激活状态，高亮显示
                        // 否则：鼠标悬停时显示灰色背景
                        isActive ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50'
                      }`}
                    >
                        <Icon className='w-5 h-5' />
                        {label}
                    </NavLink>
                ))}
        </div>
    );
};

export default MenuItems;