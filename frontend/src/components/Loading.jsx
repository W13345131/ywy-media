import React from 'react';

// 如果没有传值，就使用默认值：height = "100vh"
const Loading = ({ height = '100vh' }) => {
    return (
        <div className='flex items-center justify-center h-screen' style={{ height }}>
            {/* 加载动画,旋转动画 */}
            <div className='w-10 h-10 rounded-full border-3 border-purple-500 border-t-transparent animate-spin'>
            </div>
        </div>
    );
};

export default Loading;