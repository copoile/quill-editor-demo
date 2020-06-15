<template>
  <div class="editor-wrap">
    <button id="toolbar-img" style="display:none" @click="toolbarImgClick" />
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
import { imgUpload } from '@/api/file.js'
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
                  // 点击事件转移到按钮
                  document.querySelector('#toolbar-img').click()
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
    // 图片工具栏点击事件
    toolbarImgClick() {
      alert('自定义图片点击事件')
      // 上传图片
      imgUpload().then(res => {
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
