require(process.env.CGA_DIR_PATH_UTF8 + '/kof/common').then(async () => {
  // 回法兰城
  if (cga.GetMapName() !== '法兰城') {
    await kof.travel.falan.toStone('E') // 去东门
  }

  // 去伊尔村找“猎人亚烈格尔”
  await kof.walkList([
    ['法兰城'],
    [281, 88, '芙蕾雅'], // 东门出去
    [681, 343, '伊尔村'], // 伊尔村
    [48, 76], // 猎人亚烈格尔
  ])

  // 与“猎人亚烈格尔”对话
  await kof.talkToNPC('猎人亚烈格尔')

  // 学习技能：狩猎体验
  let dlg = await kof.waitNPCDialog()
  console.log(dlg)
  cga.ClickNPCDialog(0, 0); // 选择第一个选项：学习技能

  dlg = await kof.waitNPCDialog()
  console.log(dlg)
  cga.ClickNPCDialog(0, -1); // 选择左边的确定按钮

  // 去打传说的鹿皮
  await kof.walkList([
    [45, 31, '芙蕾雅'], // 出伊尔村
    [649, 288], // 传说的鹿皮猎点
  ])

  // 使用狩猎体验
  const skill = cga.findPlayerSkill('狩猎体验')
  cga.StartWork(skill.index, 0)

  // 一直打猎直至打到传说的鹿皮
  await kof.item.waitFor('传说的鹿皮')

  // 回伊尔村找“败家子葛达尔夫”
  await kof.walkList([
    [681, 343, '伊尔村'], // 伊尔村
    [49, 77], // 败家子葛达尔夫
  ])

  // 和“败家子葛达尔夫”对话，用传传说的鹿皮换猎人推荐信
  await kof.talkToNPC('败家子葛达尔夫')
  dlg = await kof.waitNPCDialog()
  console.log(dlg)
  // {
  //   type: 0,
  //   options: 12,
  //   dialog_id: 326,
  //   npc_id: 7719,
  //   message: '\n喔！厉害厉害！没想到你居然能拿到传说中的鹿皮。可不可以让给我？'
  // }
  cga.ClickNPCDialog(4, -1) // 点击：是

  dlg = await kof.waitNPCDialog()
  console.log(dlg)
  // {
  //   type: 0,
  //   options: 1,
  //   dialog_id: 326,
  //   npc_id: 7719,
  //   message: '\n这真是块好鹿皮啊！不愧是我寻觅以久的宝物。你想不想当猎人？我可以推荐你喔！'
  // }
  cga.ClickNPCDialog(1, 0) // 点击：确定

  // 去找猎人强提
  await kof.walkList([
    [35, 25, '装备店'], // 伊尔村
    [13, 16], // 猎人强提
  ])

  // 和“猎人强提”对话，就职猎人
  await kof.talkToNPC('猎人强提')
  dlg = await kof.waitNPCDialog()
  console.log(dlg)
  // {
  //   type: 2,
  //   options: 2,
  //   dialog_id: 322,
  //   npc_id: 9521,
  //   message: '3\n\n嗯？ 想当猎人吗？\n\n我想就职\n我想转职\n我想提升阶级\n'
  // }
  cga.ClickNPCDialog(0, 0) // 选择第一项：我想就职

  dlg = await kof.waitNPCDialog()
  console.log(dlg)
  cga.ClickNPCDialog(1, 0) // 点击：确定

  // 丢掉“猎人推荐信”
  // TODO:
})
