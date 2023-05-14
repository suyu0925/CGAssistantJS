const util = require('util')

const isInBank = () => {
  const mapIndex = cga.GetMapIndex()
  return mapIndex.index3 === 1121
}

const isInEastHospital = () => {
  const mapIndex = cga.GetMapIndex()
  return mapIndex.index3 === 1112
}

module.exports = new Promise(resolve => {
  const cga = require(process.env.CGA_DIR_PATH_UTF8 + '/cgaapi')(() => setTimeout(() => resolve(cga), 0));
}).then(cga => {
  global.cga = cga
  global.kof = {
    isInBank,
    walkList: util.promisify(cga.walkList),
    logBack: util.promisify(cga.logBack),
    waitNPCDialog: util.promisify(cga.AsyncWaitNPCDialog),
    waitForNPC: util.promisify(cga.task.waitForNPC),
    getSettings: util.promisify(cga.gui.GetSettings),
    loadSettings: util.promisify(cga.gui.LoadSettings),
  }

  kof.travel = {
    falan: {
      toStone: util.promisify(cga.travel.falan.toStone), // 参数1：传送石名称，有效参数：E1 S1 W1 E2 S2 W2 M1(道具-市场1楼) M3(道具-市场3楼
      toEastHospital: async () => {
        if (isInEastHospital()) {
          return
        }
        await util.promisify(cga.travel.falan.toEastHospital)()
      },
      toBank: util.promisify(cga.travel.falan.toBank),
      toCastle: util.promisify(cga.travel.falan.toCastle),
    }
  }

  kof.learnSkill = async (skillName) => {
    const skill = cga.findPlayerSkill(skillName)
    if (skill) {
      console.log(`已经拥有${skillName}技能。`)
      return
    }
  }

  kof.moveToNPC = async (npcName) => {
    const npc = cga.findNPC(npcName)
    if (!npc) {
      throw new Error(`未找到NPC${npcName}`)
    }
    await kof.walkList([[npc.xpos, npc.ypos + 1]])
    return npc
  }

  kof.talkToNPC = async (npcName) => {
    const npc = await kof.moveToNPC(npcName)
    cga.TurnTo(npc.xpos, npc.ypos)
  }

  kof.needSupply = () => {
    const playerInfo = cga.GetPlayerInfo()
    const playerNeedSupply = playerInfo.hp < playerInfo.maxhp || playerInfo.mp < playerInfo.maxmp
    return playerNeedSupply
  }

  return cga
})
