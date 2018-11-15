const diskService = require('./disk.service')

const events = {
  READ_DIR: async (callId, path) => {
    try {
      const serviceOutput = await diskService.readDir(callId, path)
      return serviceOutput
    } catch (e) {
      console.log('[ERROR]|fileEvents|readDir| ', e)
    }
  },
  READ_FILE: async (callId, path) => {
    try {
      const serviceOutput = await diskService.readFile(callId, path)
      return serviceOutput
    } catch (e) {
      console.log('[ERROR]|fileEvents|READ_FILE|', e)
    }
  },
  WRITE_FILE: async (callId, config) => {
    try {
      const serviceOutput = await diskService.writeFile(
        callId,
        config.path,
        config.filename,
        config.filetype,
        config.data
      )
      return serviceOutput
    } catch (e) {
      console.log('[ERROR]|fileEvents|WRITE_FILE|', e)
    }
  },
  REMOVE_FILE: async (callId, path) => {
    try {
      const serviceOutput = await diskService.removeFile(callId, path)
      return serviceOutput
    } catch (e) {
      console.log('[ERROR]|fileEvents|REMOVE_FILE|', e)
    }
  },
  CREATE_DIR: async (callId, path) => {
    try {
      const serviceOutput = await diskService.createDir(callId, path)
      return serviceOutput
    } catch (e) {
      console.log('[ERROR]|fileEvents|CREATE_DIR|', e)
    }
  },
  REMOVE_DIR: async (callId, path) => {
    try {
      const serviceOutput = await diskService.removeDir(callId, path)
      return serviceOutput
    } catch (e) {
      console.log('[ERROR]|fileEvents|REMOVE_DIR|', e)
    }
  }
}

module.exports = events
