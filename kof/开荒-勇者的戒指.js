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

    await cga.delay(1000) // 会被传送到回廊
  }

  const getRing = async () => {
    await kof.walkList([
      [53, 2],
    ])
    cga.TurnTo(54, 2)

    let dlg = await kof.waitNPCDialog()
    console.log(dlg)
    // {
    //   type: 0,
    //   options: 12,
    //   dialog_id: 326,
    //   npc_id: 8215,
    //   message: '\n\n　　　　　死者的戒指是勇者的证明。\n　　　　　我便是测试者。\n　　　　　你拥有资格吗？'
    // }
    cga.ClickNPCDialog(4, -1) // 点击：是

    dlg = await kof.waitNPCDialog()
    console.log(dlg)
    // {
    //   type: 0,
    //   options: 1,
    //   dialog_id: 326,
    //   npc_id: 8215,
    //   message: '\n\n幸运将伴随戒指跟着你'
    // }
    cga.ClickNPCDialog(1, 0) // 点击：确定
  }

  const deliverRing = async () => {
    await kof.talkToNPC('王宫召唤士盖兹')
    let dlg = await kof.waitNPCDialog()
    console.log(dlg)
    // {
    //   type: 0,
    //   options: 32,
    //   dialog_id: 326,
    //   npc_id: 8214,
    //   message: '\n' +
    //     '\n' +
    //     '　……年轻人，真抱歉啊……\n' +
    //     '　我之所以会召唤异界人的你来此，是为了寻找能拯　救这个世界的『开启者』。\n' +
    //     '　虽然我自知此行为是不可原谅的，但却不得不这么　作……　'
    // }
    cga.ClickNPCDialog(32, 0) // 点击：下一步

    dlg = await kof.waitNPCDialog()
    console.log(dlg)
    // {
    //   type: 0,
    //   options: 32,
    //   dialog_id: 326,
    //   npc_id: 8214,
    //   message: '\n\n　去见见国王陛下吧！\n　如果你真的是『开启者』的话，请你一定要拯救这　个国家和世界……'
    // }
    cga.ClickNPCDialog(32, 0) // 点击：下一步
    dlg = await kof.waitNPCDialog()
    console.log(dlg)
    // {
    //   type: 0,
    //   options: 1,
    //   dialog_id: 326,
    //   npc_id: 8214,
    //   message: '\n\n　另外，此『召唤之间』位于里谢里雅堡庭院的地下　。　若你想再听听我的情报，欢迎你随时来找我…\n　那么，你出去吧…'
    // }
    cga.ClickNPCDialog(1, 0) // 点击：确定

    await cga.delay(1000) // 传送到偈见之间
  }

  const getRewardCredit = async () => {
    await kof.walkList([
      [7, 4] // 国王面前
    ])
    await kof.talkToNPC('国王')
    let dlg = await kof.waitNPCDialog()
    console.log(dlg)
    // {
    //   type: 0,
    //   options: 1,
    //   dialog_id: 326,
    //   npc_id: 8219,
    //   message: '\n异界来的客人啊！欢迎你···快把『死者的戒指』拿给我看吧···'
    // }
    cga.ClickNPCDialog(1, 0) // 点击：确定
  }

  const getReward = async () => {
    await kof.walkList([
      [8, 19, '里谢里雅堡 2楼'],
      [47, 78] // 士兵面前
    ])
    cga.TurnTo(47, 79) // 士兵亚瑟尔
    let dlg = await kof.waitNPCDialog()
    console.log(dlg)
    // {
    //   type: 0,
    //   options: 1,
    //   dialog_id: 326,
    //   npc_id: 8223,
    //   message: '\n\n那是国王的赏赐信吧！\n即使不依靠你们，我们士兵队也能守护这国家的和平···\n不过这也是国王的命令。\n拿去吧！'
    // }
    cga.ClickNPCDialog(1, 0) // 点击：确定

    await cga.delay(1000) // 等待拿到宠物
  }

  // 开启自动战斗
  await kof.loadSettings(settings)

  if (cga.GetMapName() === '召唤之间') {
    await acceptQuest()
  }

  if (cga.GetMapName() === '回廊') {
    await kof.walkList([
      [23, 19, '灵堂'],
    ])
  } else {
    console.log(`角色在${cga.GetMapName()}，位置有误。请在创建角色后直接运行此脚本。`)
    return
  }

  if (cga.GetMapName() === '灵堂') {
    await getRing()
  } else {
    console.log(`角色在${cga.GetMapName()}，位置有误。请在创建角色后直接运行此脚本。`)
    return
  }

  if (cga.GetMapName() === '灵堂' && cga.getItemCount('死者的戒指') > 0) {
    await kof.walkList([
      [31, 48, '回廊'],
      [44, 15, '召唤之间'],
    ])
    await deliverRing()
  }

  await getRewardCredit()

  await getReward()

  // 配置宠物为战斗状态
  cga.ChangePetState(0, 2)

  console.log('结束对话。')
})
