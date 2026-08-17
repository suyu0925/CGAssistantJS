require(process.env.CGA_DIR_PATH_UTF8 + '/kof/common').then(async () => {
  await kof.prepare({ poisionCount: 3 })

  if (cga.GetMapName() !== '法兰城') {
    await kof.travel.falan.toStone('E')
  }

  // 组队
  await kof.teamup(null, 247, 88)

  kof.battle.goHunt('哈洞')
})
