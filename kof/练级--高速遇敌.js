const settings = require('./普攻练级.json')

require(process.env.CGA_DIR_PATH_UTF8 + '/kof/common').then(async () => {
    // 开启自动战斗
    await kof.loadSettings(settings)

    kof.goHunt()
})
