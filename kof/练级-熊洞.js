const settings = require('./普攻练级.json')

const TeamLeader = '=一片帆='

require(process.env.CGA_DIR_PATH_UTF8 + '/kof/common').then(async () => {
    // 开启自动战斗
    await kof.loadSettings(settings)

    await kof.prepare()

    if (cga.GetMapName() !== '法兰城') {
        await kof.travel.falan.toStone('S')
    }

    // 出发去熊洞
    await kof.walkList([
        [153, 241, '芙蕾雅'],
        [473, 316],
    ])

    // 和矿工对话进洞
    await kof.talkToNPC('矿工潘丹')
    const dlg = await kof.waitNPCDialog()
    console.log(dlg)
    // {
    //     type: 0,
    //     options: 12,
    //     dialog_id: 326,
    //     npc_id: 8814,
    //     message: '\n\n喔！你的等级够格进入这里哦！很好。\n想进去吗？'
    // }
    cga.ClickNPCDialog(4, -1) // 点击：是

    // 等切图
    await kof.delay(1000)

    // 组队
    await kof.teamup(TeamLeader, 20, 15)

    if (cga.GetPlayerInfo().name === TeamLeader) {
        // 原地遇敌
        kof.goHunt()
    }
})
