// src/stores/contactStore.js
import { defineStore } from 'pinia';

export const useContactStore = defineStore('contact', {
    state: () => ({
        email: '1666955239@qq.com',      // 邮箱
        phone: '192-xxxx-8283',      // 电话
        address: '福建省厦门市集美区 厦门理工学院',    // 地址
    }),
    actions: {
        // 设置联系信息的 action
        setContactInfo(email, phone, address) {
            this.email = email;
            this.phone = phone;
            this.address = address;
        }
    },
    getters: {
        // 可选：获取完整联系信息的 getter
        contactInfo: (state) => ({
            email: state.email,
            phone: state.phone,
            address: state.address,
        }),
    },
});