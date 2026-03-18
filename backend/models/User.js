import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    // 用户ID
    _id: {
        type: String,
        required: true,
    },
    // 用户邮箱
    email: {
        type: String,
        required: true,
    },
    // 用户全名
    full_name: {
        type: String,
        required: true,
    },
    // 用户名
    username: {
        type: String,
        required: true,
    },
    // 用户个人简介
    bio: {
        type: String,
        required: true,
    },
    // 用户个人头像
    profile_picture: {
        type: String,
        required: true,
    },
    // 用户封面照片
    cover_photo: {
        type: String,
        required: true,
    },
    // 用户位置
    location: {
        type: String,
        required: true,
    },
    // 用户粉丝
    followers: {
        type: [String],
        required: true,
    },
    // 用户关注
    following: {
        type: [String],
        required: true,
    },
    // 用户好友
    connections: {
        type: [String],
        required: true,
    },
}, { timestamps: true }) // timestamps: true 表示自动添加创建时间和更新时间

const User = mongoose.model('User', userSchema) // 创建用户模型

export default User // 导出用户模型