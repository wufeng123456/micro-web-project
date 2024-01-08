const childProcess = require('child_process')
const path = require('path')

const projectPaths = [
  {
    name: path.resolve(__dirname, '../main')
  },
  {
    name: path.resolve(__dirname, '../react16')
  },
  {
    name: path.resolve(__dirname, '../vue3')
  }
]

projectPaths.forEach(pathInfo => {
  childProcess.spawn(`cd ${pathInfo.name} && npm i && npm run start`, { stdio: 'inherit', shell: true })
})
