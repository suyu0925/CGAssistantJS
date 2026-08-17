require(process.env.CGA_DIR_PATH_UTF8 + '/kof/common').then(async () => {
  // 回法兰城
  if (cga.GetMapName() !== '法兰城') {
    await kof.travel.falan.toStone('W') // 去西门
  }

  await kof.walkList([
    [22, 87, '芙蕾雅'],
    [297, 149], // 神木旁边，神木(298, 149)
  ])

  await kof.talkToNPC('神木')

  kof.sayWords('魔术')
  cga.ClickNPCDialog(1, 0) // 点击：确定

  // 就职魔法师
  await kof.talkToNPC('狄尔西雅达美')
  dlg = await kof.waitNPCDialog()
  console.log(dlg)
  cga.ClickNPCDialog(0, 0) // 选择第一项：我想就职

  dlg = await kof.waitNPCDialog()
  console.log(dlg)
  cga.ClickNPCDialog(1, 0) // 点击：确定

  // 学单风
  if (!cga.findPlayerSkill('风刃魔法')) {
    await kof.talkToNPC('魔术师帕索比亚纳')
    let dlg = await kof.waitNPCDialog()
    cga.ClickNPCDialog(0, 0); // 选择第一个选项：学习技能

    dlg = await kof.waitNPCDialog()
    console.log(dlg)
    cga.ClickNPCDialog(0, -1); // 选择左边的确定按钮
    
    dlg = await kof.waitNPCDialog()
    console.log(dlg)
    cga.ClickNPCDialog(1, 0) // 点击：确定
  }

  // 学单冰
  if (!cga.findPlayerSkill('冰冻魔法')) {
    await kof.talkToNPC('魔术师班裘')
    let dlg = await kof.waitNPCDialog()
    console.log(dlg)
    cga.ClickNPCDialog(0, 0); // 选择第一个选项：学习技能

    dlg = await kof.waitNPCDialog()
    console.log(dlg)
    cga.ClickNPCDialog(0, -1); // 选择左边的确定按钮
    
    dlg = await kof.waitNPCDialog()
    console.log(dlg)
    cga.ClickNPCDialog(1, 0) // 点击：确定
  }

  // 学单土
  if (!cga.findPlayerSkill('陨石魔法')) {
    await kof.talkToNPC('魔术师比尔艾特')
    let dlg = await kof.waitNPCDialog()
    console.log(dlg)
    cga.ClickNPCDialog(0, 0); // 选择第一个选项：学习技能

    dlg = await kof.waitNPCDialog()
    console.log(dlg)
    cga.ClickNPCDialog(0, -1); // 选择左边的确定按钮

    dlg = await kof.waitNPCDialog()
    console.log(dlg)
    cga.ClickNPCDialog(1, 0) // 点击：确定
  }

  // 学单火
  if (!cga.findPlayerSkill('火焰魔法')) {
    await kof.talkToNPC('魔术师多萨德')
    let dlg = await kof.waitNPCDialog()
    console.log(dlg)
    cga.ClickNPCDialog(0, 0); // 选择第一个选项：学习技能

    dlg = await kof.waitNPCDialog()
    console.log(dlg)
    cga.ClickNPCDialog(0, -1); // 选择左边的确定按钮
    
    dlg = await kof.waitNPCDialog()
    console.log(dlg)
    cga.ClickNPCDialog(1, 0) // 点击：确定
  }
})
