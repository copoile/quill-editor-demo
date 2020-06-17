<template>
  <div class="editor-wrap">
    <!-- 隐藏的文件上传inpput -->
    <input
      id="img-input"
      type="file"
      accept="image/*"
      style="display:none"
      @change="handleFile"
    >
    <quill-editor ref="editor" v-model="content" :options="editorOption" />
    <h2>效果展示</h2>
    <!-- 效果展示，这里需要包裹两个div并加上对于的class -->
    <div class="quill-editor">
      <div class="ql-container ql-snow">
        <div class="ql-editor" v-html="content" />
      </div>
    </div>
  </div>
</template>

<script>
import Quill from 'quill'
import { toolbarOptions, ImageFormat } from './config.js'
import ImageResize from 'quill-image-resize-module'
import '@/assets/quill-emoji/quill-emoji.js'
Quill.register('modules/imageResize', ImageResize)
Quill.register(ImageFormat, true)
import { uploadFile } from '@/api/file.js'
export default {
  name: 'Editor',
  data() {
    return {
      content: '',
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              // 表情符
              emoji: function() {},
              image: function(value) {
                if (value) {
                  // 点击事件转移到隐藏的input
                  document.querySelector('#img-input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          },
          imageResize: {
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          },
          'emoji-toolbar': true,
          'emoji-shortname': true
        },
        placeholder: '请输入内容......'
      }
    }
  },
  computed: {
    editor() {
      return this.$refs.editor.quill
    }
  },
  methods: {
    // 文件上传input选定文件事件
    handleFile(e) {
      const $target = e.target || e.srcElement
      const file = $target.files[0]
      uploadFile(file).then(res => {
        // 获取光标位置
        const length = this.editor.getSelection().index
        // 插入图片
        this.editor.insertEmbed(length, 'image', res.data)
        // 调整光标到最后
        this.editor.setSelection(length + 1)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-wrap {
  height: 100%;
  width: 900px;
  margin: 50px auto;
  /* 文本区高度根据需求修改 */
  >>> .ql-editor {
    height: 400px;
  }
}
</style>
