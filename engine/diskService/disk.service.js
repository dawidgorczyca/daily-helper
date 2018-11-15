
const { promisify } = require('util')
const fs = require('fs')
const removeDir = require('rmrf')

const readDir = promisify(fs.readdir)
const createDir = promisify(fs.mkdir)
const removeFile = promisify(fs.unlink)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const service = {
  readDir: async (callId, path) => {
    try {
      const output = await readDir(`${path}`)
      return {
        log: '[DEV]diskService|readDir|SUCCESS',
        callId,
        output
      }
    } catch (e) {
      return {
        log: `[DEV]diskService|readDir|FAILURE|${e}`,
        callId
      }
    }
  },
  readFile: async (callId, path) => {
    try {
      const output = await readFile(`${path}`)
      return {
        log: '[DEV]diskService|readFile|SUCCESS',
        callId,
        output
      }
    } catch (e) {
      return {
        log: `[DEV]diskService|readFile|FAILURE|${e}`,
        callId
      }
    }
  },
  writeFile: async (callId, path, filename, filetype, data) => {
    try {
      const method = await writeFile(`${path}/${filename}.${filetype}`, data)
      return {
        log: '[DEV]diskService|writeFile|SUCCESS',
        callId
      }
    } catch (e) {
      return {
        log: `[DEV]diskService|readDir|FAILURE|${e}`,
        callId
      }
    }
  },
  removeFile: async (callId, path) => {
    try {
      const output = await removeFile(`${path}`)
      return {
        log: '[DEV]diskService|removeFile|SUCCESS',
        callId,
        output
      }
    } catch (e) {
      return {
        log: `[DEV]diskService|removeFile|FAILURE|${e}`,
        callId
      }
    }
  },
  createDir: async (callId, path) => {
    try {
      const output = await createDir(`${path}`)
      return {
        log: '[DEV]diskService|createDir|SUCCESS',
        callId,
        output
      }
    } catch (e) {
      return {
        log: `[DEV]diskService|createDir|FAILURE|${e}`,
        callId
      }
    }
  },
  removeDir: async (callId, path) => {
    try {
      const output = await removeDir(`${path}`)
      return {
        log: '[DEV]diskService|removeDir|SUCCESS',
        callId,
        output
      }
    } catch (e) {
      return {
        log: `[DEV]diskService|removeDir|FAILURE|${e}`,
        callId
      }
    }
  }
}

module.exports = service
