import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    clerkId: { type: String, unique: true },
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
    // 用户个人简介（Clerk 不提供，默认空，可由用户后续填写）
    bio: {
        type: String,
        default: '',
    },
    // 用户个人头像
    profile_picture: {
        type: String,
        default: '',
    },
    // 用户封面照片
    cover_photo: {
        type: String,
        default: '',
    },
    // 用户位置
    location: {
        type: String,
        default: '',
    },
    // 用户粉丝
    followers: {
        type: [String],
        default: [],
    },
    // 用户关注
    following: {
        type: [String],
        default: [],
    },
    // 用户好友
    connections: {
        type: [String],
        default: [],
    },
}, { timestamps: true }) // timestamps: true 表示自动添加创建时间和更新时间

const User = mongoose.model('User', userSchema) // 创建用户模型

export default User // 导出用户模型