const settings = require('./普攻练级.json')

require(process.env.CGA_DIR_PATH_UTF8 + '/kof/common').then(async () => {
  const acceptQuest = async () => {
    await kof.talkToNPC('王宫召唤士盖兹')

    let dlg = await kof.waitNPCDialog()
    console.log(dlg)
    // {
    //   type: 0,
    //   options: 12,
    //   dialog_id: 326,
    //   npc_id: 8230,
    //   message: '\n\n　喔喔！异界来的客人啊！欢迎你。请告诉我，你是　『开启者』吗？'
    // }
    if (dlg.message !== '\n\n　喔喔！异界来的客人啊！欢迎你。请告诉我，你是　『开启者』吗？') {
      console.log(`盖兹对话不对。请在创建角色后直接运行此脚本。`)
      return
    }
    cga.ClickNPCDialog(4, -1) // 点击：是

    dlg = await kof.waitNPCDialog()
    console.log(dlg)
    // {
    //   type: 0,
    //   options: 32,
    //   dialog_id: 326,
    //   npc_id: 8230,
    //   message: '\n\n　什么！真的吗？那么请证明你没有在说谎吧！'
    // }
    cga.ClickNPCDialog(32, 0) // 点击：下一步

    dlg = await kof.waitNPCDialog()
    console.log(dlg)
    // {
    //   type: 0,
    //   options: 1,
    //   dialog_id: 326,
    //   npc_id: 8230,
    //   message: '\n' +
    //     '\n' +
    //     '　在这个『召唤之间』的地下灵堂里有个名叫『死者　的戒指』的东西，而戒指就在灵堂里某个石像身上　。请你把它找出来后再回来找我好吗？只要看了那　戒指，便可以知道你是不是『开启者』了。'
    // }
    cga.ClickNPCDialog(1, 0) // 点击：确定

    dlg = await kof.waitNPCDialog()
    console.log(dlg)
    // {
    //   type: 0,
    //   options: 32,
    //   dialog_id: 326,
    //   npc_id: 8232,
    //   message: '\n\n　我为你准备了两条考验之路。\n　其中一条相当艰险，另一条则路途较长。\n　想走哪一条路，全由你来决定。'
    // }  
    cga.ClickNPCDialog(32, 0) // 点击：下一步

    dlg = await kof.waitNPCDialog()
    console.log(dlg)
    // {
    //   type: 0,
    //   options: 12,
    //   dialog_id: 326,
    //   npc_id: 8232,
    //   message: '\n\n　如果你想走艰险的道路，请回答「是」\n　想走路程较远的道路，请回答「否」。'
    // }
    cga.ClickNPCDialog(4, -1) // 点击：是

    dlg = await kof.waitNPCDialog()
    console.log(dlg)
    // {
    //   type: 0,
    //   options: 32,
    //   dialog_id: 326,
    //   npc_id: 8232,
    //   message: '\n\n　在这个『召唤之间』的地下灵堂里，有个测试勇者　的道具，叫做『死者的戒指』。请你把它找出来后　再回来找我好吗？'
    // }
    cga.ClickNPCDialog(32, 0) // 点击：下一步

    dlg = await kof.waitNPCDialog()
    console.log(dlg)
    // {
    //   type: 0,
    //   options: 1,
    //   dialog_id: 326,
    //   npc_id: 8232,
    //   message: '\n\n　只要看到那个戒指，我就可以判断你是不是『开启　者』了。'
    // }
    cga.ClickNPCDialog(1, 0) // 点击：确定
  }

  // 开启自动战斗
  await kof.loadSettings(settings)

  const mapName = cga.GetMapName()

  if (mapName === '召唤之间') {
    await acceptQuest()
  }

  if (mapName === '回廊') {
    await kof.walkList([
      [23, 19, '灵堂'],
    ])
  } else {
    console.log(`角色在${mapName}，位置有误。请在创建角色后直接运行此脚本。`)
    return
  }

  console.log('结束对话。')
})
