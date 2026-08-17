
require(process.env.CGA_DIR_PATH_UTF8 + '/kof/common').then(async () => {
  await kof.prepare()

  await kof.battle.loadSettings('灵堂')

  if (cga.GetMapName() !== '法兰城') {
    await kof.travel.falan.toStone('S')
  }

  await kof.walkList([
    [100, 100, '法兰城'],
    [153, 100, '里谢里雅堡'],
    [47, 85, '召唤之间'],
    [27, 8, '回廊'],
    [23, 19, '灵堂'],
    [9, 9],
  ])

  await kof.waitForNPC('士兵伊岱鲁')

  await kof.talkToNPC('士兵伊岱鲁')
  let dlg = await kof.waitNPCDialog()
  console.log(dlg)
  cga.ClickNPCDialog(4, -1) // 点击：是

  dlg = await kof.waitNPCDialog()
  console.log(dlg)
  cga.ClickNPCDialog(1, 0) // 点击：确定

  // 等切图
  await kof.delay(3000)

  // 组队
  if (!kof.isInTeam()) {
    if (cga.GetPlayerInfo().name === kof.getDefaultTeamLoader()) {
      await kof.walkList[[16, 3]]
      await kof.buildTeam()
    } else {
      await kof.enterTeam(kof.getDefaultTeamLoader())

      // 组员可以退出脚本了
      return
    }
  }

  if (cga.GetPlayerInfo().name === kof.getDefaultTeamLoader()) {
    // 进入迷宫
    await kof.walkList([
      [15, 18, '城内的地下迷宫地下1楼'],
    ])

    // 走随机迷宫到最底层
    while (true) {
      try {
        await kof.walkRandomMaze(null)
      } catch (err) {
        // ignore error
        kof.log(`walkRandomMaze throw ${err}`)
      }
      if (kof.isInDeepestFloorOfLingtang()) {
        // 到底了
        break
      }
    }

    // 原地遇敌
    kof.goHunt()
  }
})
