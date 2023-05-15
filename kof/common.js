const util = require('util')

const isInBank = () => {
  const mapIndex = cga.GetMapIndex()
  return mapIndex.index3 === 1121
}

const isInEastHospital = () => {
  const mapIndex = cga.GetMapIndex()
  return mapIndex.index3 === 1112
}

const isNext = (a, b) => {
  return (a.x === b.x && Math.abs(a.y - b.y) === 1)
    || (a.y === b.y && Math.abs(a.x - b.x) === 1)
}

module.exports = new Promise(resolve => {
  const cga = require(process.env.CGA_DIR_PATH_UTF8 + '/cgaapi')(() => setTimeout(() => resolve(cga), 0));
}).then(cga => {
  global.cga = cga
  global.kof = {
    isInBank,
    logBack: util.promisify(cga.logBack),
    waitNPCDialog: util.promisify(cga.AsyncWaitNPCDialog),
    waitForNPC: util.promisify(cga.task.waitForNPC),
    getSettings: util.promisify(cga.gui.GetSettings),
    loadSettings: util.promisify(cga.gui.LoadSettings),
  }

  kof.walkList = async (list) => {
    const curIndex = list
      .map((node, index) => {
        if (node.length === 2) {
          return [node[0], node[1], list[index - 1][2]]
        } else {
          return node
        }
      }).findIndex(node => node[2] === cga.GetMapName())
    const trimList = curIndex === -1
      ? list
      : list.slice(curIndex + 1)
    await util.promisify(cga.walkList)(trimList)
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
    if (isNext(cga.GetMapXY(), { x: npc.xpos, y: npc.ypos })) {
      return npc
    }
    // TODO: 需要判断是否可到达
    await kof.walkList([[npc.xpos, npc.ypos + 1]])
    return npc
  }

  kof.talkToNPC = async (npcName) => {
    const npc = await kof.moveToNPC(npcName)
    cga.TurnTo(npc.xpos, npc.ypos)
  }

  /**
   * 是否需要补给
   * @param {boolean} allPet 是否检查所有宠物
   * @returns {boolean}
   */
  kof.needSupply = (allPet) => {
    const playerInfo = cga.GetPlayerInfo()
    const playerNeedSupply = playerInfo.hp < playerInfo.maxhp || playerInfo.mp < playerInfo.maxmp
    const petIds = allPet ? [0, 1, 2, 3, 4] : [playerInfo.petid]
    const petNeedSupply = petIds.some(petId => {
      if (petId === -1) {
        return false
      }
      const pet = cga.GetPetInfo(petId)
      return pet.hp < pet.maxhp || pet.mp < pet.maxmp
    })
    return playerNeedSupply || petNeedSupply
  }

  return cga
})
