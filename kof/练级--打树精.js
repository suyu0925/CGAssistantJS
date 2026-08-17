require(process.env.CGA_DIR_PATH_UTF8 + '/kof/common').then(async () => {
    // 开启自动战斗
    await kof.battle.loadSettings('桥头树精')

    await kof.prepare({ poisionCount: 3 })

    if (cga.GetMapName() !== '法兰城') {
        await kof.travel.falan.toStone('E')
    }

    // 组队
    await kof.teamup(TeamLeader, 247, 88)

    if (cga.GetPlayerInfo().name === kof.getDefaultTeamLoader()) {
        // 出发去桥边打树精
        await kof.walkList([
            [281, 88, '芙蕾雅'],
            [571, 234], // 过桥打精树
        ])

        // 原地遇敌
        kof.goHunt()
    }
})
