
require(process.env.CGA_DIR_PATH_UTF8 + '/kof/common').then(async () => {
  await kof.battle.loadSettings('灵堂')

  if (cga.GetPlayerInfo().name === kof.getDefaultTeamLoader()) {
    // 原地遇敌
    kof.goHunt()
  }
})
