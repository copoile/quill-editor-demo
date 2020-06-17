module.exports = [
  // 文件上传
  {
    url: '/file/upload',
    type: 'post',
    response: config => {
      return {
        code: 200,
        data: 'https://poile-img.nos-eastchina1.126.net/1591855130727.jpg'
      }
    }
  },

  // 测试
  {
    url: '/test',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: 'ok'
      }
    }
  }
]
