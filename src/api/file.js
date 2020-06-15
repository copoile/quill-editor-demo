/**
 * @description 模拟上传接口
 */
export function imgUpload() {
  return new Promise((resolve, reject) => {
    try {
      const res = { data: 'https://poile-img.nos-eastchina1.126.net/1591855130727.jpg' }
      resolve(res)
    } catch (e) {
      reject('上传失败')
    }
  })
}
