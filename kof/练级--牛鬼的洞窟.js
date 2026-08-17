require(process.env.CGA_DIR_PATH_UTF8 + '/kof/common').then(async () => {
  await kof.battle.loadSettings('牛鬼的洞窟')

  await kof.prepare()

  if (cga.GetMapName() !== '法兰城') {
    await kof.travel.falan.toStone('E')
  }

  // 组队
  await kof.teamup(TeamLeader, 247, 88)

  if (cga.GetPlayerInfo().name !== kof.getDefaultTeamLoader()) {
    return
  }

  // 从法兰城出发
  await kof.walkList([
    [281, 88, '芙蕾雅']
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
})
