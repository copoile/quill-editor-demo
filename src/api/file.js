import service from '@/utils/request.js'

/**
 * 上传文件
 * @param {*} file
 */
export function uploadFile(file) {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  const param = new FormData()
  param.append('file', file)
  return service.post('/file/upload', param, config)
}
