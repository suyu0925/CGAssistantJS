const settings = require('./1-10级--普攻练级.json')

const TeamLeader = '=一支花='

require(process.env.CGA_DIR_PATH_UTF8 + '/kof/common').then(async () => {
    // 开启自动战斗
    await kof.loadSettings(settings)

    await kof.prepare({ poisionCount: 3 })

    if (cga.GetMapName() !== '法兰城') {
        await kof.travel.falan.toStone('W')
    }

    // 组队
    await kof.teamup(TeamLeader, 62, 88)
})
