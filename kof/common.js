const util = require('util')

module.exports = new Promise(resolve => {
  const cga = require(process.env.CGA_DIR_PATH_UTF8 + '/cgaapi')(() => setTimeout(() => resolve(cga), 0));
}).then(cga => {
  global.cga = cga
  global.kof = {}

  kof.walkList = list => new Promise((resolve, reject) => {
    try {
      cga.walkList(list, err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    } catch (err) {
      reject(err)
    }
  })

  kof.walkList2 = util.promisify(cga.walkList)

  kof.waitNPCDialog = util.promisify(cga.AsyncWaitNPCDialog)

  kof.learnSkill = async (skillName) => {
    const skill = cga.findPlayerSkill(skillName)
    if (skill) {
      console.log(`�Ѿ�ӵ��${skillName}���ܡ�`)
      return
    }
  }

  return cga
})
