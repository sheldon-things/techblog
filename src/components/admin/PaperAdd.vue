<template>
    <div>
        <div id="vditor"></div>
    </div>
</template>

<script>
import Vditor from 'vditor';
import 'vditor/dist/index.css';
export default {
    name: 'PaperAdd',
    data() {
        return {
            editorContent: '',
            vditor: null,
        };
    },
    mounted() {
        this.initVditor();
    },
    methods: {
        initVditor() {
            this.vditor = new Vditor('vditor', {
                mode: 'sv', // 编辑器模式，可选值：'ir' (即时渲染), 'sv' (分屏预览), 'wysiwyg' (所见即所得)
                debug: true, // 开启调试模式
                cache: {
                    enable: false, // 关闭本地缓存
                },
                input: (text) => {
                    this.editorContent = text;
                },
            });
            this.vditor.setValue(this.editorContent);
        },
    },
    beforeDestroy() {
        if (this.vditor) {
            this.vditor.destroy();
        }
    },
};
</script>

<style scoped>
/* 这里可以添加一些自定义样式 */
</style>