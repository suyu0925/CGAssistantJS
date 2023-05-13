var cga = require(process.env.CGA_DIR_PATH_UTF8 + '/cgaapi')(() => {
  const learnTiaojiao = (cb) => {
    const skill = cga.findPlayerSkill('调教')
    if (skill) {
      console.error('已经拥有调教技能。')
      cb(new Error('金币不足100G，无法学习调教。'))
      return
    }

    const playerInfo = cga.GetPlayerInfo();
    if (playerInfo.gold < 100) {
      console.error('金币不足100G，无法学习调教。')
      cb(new Error('金币不足100G，无法学习调教。'))
      return
    }

    cga.travel.falan.toStone('E1', (r) => { // 从法兰城东门1传送石开始
      cga.walkList([
        [219, 136, '科特利亚酒吧'],
        [27, 20, '酒吧里面'],
        [10, 6, '客房'],
        [11, 6], // [11, 5, '米凯尔']面前
      ], () => {
        cga.TurnTo(11, 5); // 朝向米凯尔
        cga.AsyncWaitNPCDialog(() => {
          cga.ClickNPCDialog(0, 0); // 选择第一个选项：学习技能
          cga.AsyncWaitNPCDialog(() => {
            cga.ClickNPCDialog(0, -1); // 选择左边的确定按钮
            console.log('学会调教。')
            cb()
          })
        })
      })
    })
  }

  const learnChongqiang = (cb) => {
    const skill = cga.findPlayerSkill('宠物强化')
    if (skill) {
      console.log('已经拥有宠物强化技能。')
      cb()
      return
    }

    const playerInfo = cga.GetPlayerInfo();
    if (playerInfo.gold < 100) {
      console.log('金币不足100G，无法学习宠物强化。')
      cb()
      return
    }

    cga.travel.falan.toStone('W1', (r) => { // 从法兰城西门1传送石开始
      cga.walkList([
        [122, 36, '饲养师之家'],
        [14, 5]
      ], () => {
        cga.TurnTo(14, 4); // 朝向训练师摩尔
        cga.AsyncWaitNPCDialog(() => {
          cga.ClickNPCDialog(0, 0); // 选择第一个选项：学习技能
          cga.AsyncWaitNPCDialog(() => {
            cga.ClickNPCDialog(0, -1); // 选择左边的确定按钮
            console.log('学会宠物强化。')
            cb()
          })
        })
      })
    })
  }

  learnTiaojiao(() => {
    learnChongqiang(() => {

    })
  })
})
