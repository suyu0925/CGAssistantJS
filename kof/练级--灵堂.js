require(process.env.CGA_DIR_PATH_UTF8 + '/kof/common').then(async () => {
  // await kof.travel.falan.toCastle()
  // TODO: 有队长就不要直接登出

  // 从法兰城南门开始
  // await kof.walkList([
  //   [153, 100, '里谢里雅堡'],
  //   [47, 85, '召唤之间'],
  //   [27, 8, '回廊'],
  //   [23, 19, '灵堂'],
  //   [9, 9],
  // ])

  // await kof.waitForNPC('士兵伊岱鲁')
  // await kof.talkToNPC('士兵伊岱鲁')
  // let dlg = await kof.waitNPCDialog()
  // console.log(dlg)
  // cga.ClickNPCDialog(4, -1) // 点击：是

  // dlg = await kof.waitNPCDialog()
  // console.log(dlg)
  // cga.ClickNPCDialog(1, 0) // 点击：确定

  await kof.walkList([
    [10, 2, ],
  ])

  // while (true) {
  //   await cga.walkRandomMaze(null)
  // }
})
