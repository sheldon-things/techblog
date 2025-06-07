<template>
    <div class="contact-form-container">
        <div class="form-wrapper">
            <h2>联系方式设置</h2>
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="邮箱">
                    <el-input v-model="form.email" />
                </el-form-item>

                <el-form-item label="电话">
                    <el-input v-model="form.phone" />
                </el-form-item>

                <el-form-item label="地址">
                    <el-input v-model="form.address" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                    <el-button @click="onReset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect, onMounted} from 'vue';
import { useContactStore } from '@/stores/contactStore';
import { ElNotification } from 'element-plus'

const contactStore = useContactStore();

// 表单数据，初始值从 store 中获取
const form = ref({
    email: contactStore.email || '',
    phone: contactStore.phone || '',
    address: contactStore.address || '',
});

// 监听表单变化并同步到 store
watchEffect(() => {
    contactStore.setContactInfo(form.value.email, form.value.phone, form.value.address);
});

onMounted(() => {
    // 从 store 中获取数据并更新表单
    form.value.email = contactStore.email;
    form.value.phone = contactStore.phone;
    form.value.address = contactStore.address;
});

const onSubmit = () => {
    // 校验表单数据
    if (!form.value.email || !form.value.phone || !form.value.address) {
        ElNotification({
            title: '保存失败',
            message: '请填写完整信息',
            type: 'error',
        })
        return;
    }
    ElNotification({
        title: '保存成功',
        message: '已成功修改个人联系方式',
        type: 'success',
    })
}

// 重置方法
const onReset = () => {
    form.value = {
        email: '',
        phone: '',
        address: '',
    };
};
</script>

<style scoped>
.contact-form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
    background-color: #f5f7fa;
}

.form-wrapper {
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 640px;
}

h2 {
    margin-bottom: 20px;
    font-weight: 600;
    color: #333;
}
</style>