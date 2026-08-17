module.exports.goHunt = async (name) => {
  await kof.battle.loadSettings(name)

  if (name === '哈洞') {
    if (kof.getTeamPosition() === 0) {
      // 出发去哈洞
      await kof.walkList([
        [281, 88, '芙蕾雅'],
        [672, 223, '哈巴鲁东边洞穴 地下1楼'],
      ])

      // 原地遇敌
      kof.goHunt()
    }
  } else if (name === '牛鬼的洞窟') {
    if (kof.getTeamPosition() === 0) {
      // 从法兰城出发
      await kof.walkList([
        [281, 88, '芙蕾雅'],
        [665, 184, '牛鬼的洞穴'],
        [16, 10, '牛鬼的洞窟1楼'],
      ])

      while (true) {
        try {
          await kof.walkRandomMaze(null)
        } catch (err) {
          // ignore error
          kof.log(`walkRandomMaze throw ${err}`)
        }

        if (cga.GetMapName() === '牛鬼的洞窟10楼') {
          // 到底了
          break
        }
      }

      // 原地遇敌
      kof.goHunt()
    }
  }
}
