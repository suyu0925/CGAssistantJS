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
    log: console.log,
    logBack: util.promisify(cga.logBack),
    waitNPCDialog: util.promisify(cga.AsyncWaitNPCDialog),
    waitForNPC: util.promisify(cga.task.waitForNPC),
    getSettings: util.promisify(cga.gui.GetSettings),
    loadSettings: util.promisify(cga.gui.LoadSettings),
    delay: cga.delay,
    getTeamPlayers: cga.getTeamPlayers(),
    getTeamPosition: () => {
      const teamPlayers = cga.getTeamPlayers()
      if (!teamPlayers || teamPlayers.length === 0) {
        return 0
      }
      return teamPlayers.findIndex(p => p.name === cga.GetPlayerInfo().name)
    }
  }

  require('./sell')
  require('./prepare')
  require('./teamwork')
  require('./move')
  kof.item = require('./item')
  kof.battle = require('./battle')

  kof.walkList = async (list) => {
    const curIndex = list
      .map((node, index) => {
        if (node.length === 2 || node[2] == null) {
          if (index === 0) {
            return node
          } else {
            return [node[0], node[1], list[index - 1][2]]
          }
        } else {
          return node
        }
      })
      .findIndex(node => node[2] === cga.GetMapName())
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
      toMerchant: async () => {
        if (cga.GetMapName() !== '法兰城') {
          await kof.travel.falan.toStone('S')
        }
        await kof.walkList([[156, 123]])
      }
    }
  }

  kof.learnSkill = async (skillName) => {
    const skill = cga.findPlayerSkill(skillName)
    if (skill) {
      console.log(`已经拥有${skillName}技能。`)
      return
    }
  }

  // range 0 最大 1 最小格
  kof.sayWords = (words = '', color = 0, range = 1, size = 1) => {
    cga.SayWords(words, color, range, size)
  }

  // 防掉线，每分钟说一句话，返回一个dispose()函数，调用后取消
  kof.keepAlive = () => {
    const talk = () => {
      kof.sayWords()
    }
    kof.log(`开启说话防掉线`)
    const timeout = setTimeout(talk, 60 * 1000)
    return () => {
      clearTimeout(timeout)
    }
  }

  kof.walkRandomMaze = async (target_map, filter) => {
    return new Promise((resolve, reject) => {
      cga.walkRandomMaze(target_map, () => {
        resolve()
      }, filter)
    })
  }

  kof.isBattleJob = () => {
    const job = cga.GetPlayerInfo().job
    if (job.includes('猎人')) {
      return false
    }
    if (job.includes('弓箭手')) {
      return true
    }
    return false
  }

  return cga
})
