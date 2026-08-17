const settings_1_10 = require('./1-10级--普攻练级.json')
const settings_10_30 = require('./11-30级--普攻练级.json')

module.exports.loadSettings = async function (huntName) {
  const level = cga.GetPlayerInfo().level
  const job = cga.GetPlayerInfo().job

  if (level <= 10) {
    await kof.loadSettings(settings_1_10)
  } else if (level <= 30) {
    await kof.loadSettings(settings_10_30)
  }

  if (job.includes('猎人')) {
    // 使用猎人的战斗配置
    let skills = ['冰冻魔法', '风刃魔法', '火焰魔法', '陨石魔法', '冰冻魔法']
    if (huntName === '哈洞') {
      // 哈洞全用火焰魔法
      skills = ['火焰魔法', '火焰魔法', '火焰魔法', '火焰魔法', '火焰魔法']
    } else if (huntName === '灵堂') {
      // 灵堂全用风刃魔法
      skills = ['风刃魔法', '风刃魔法', '风刃魔法', '风刃魔法', '风刃魔法']
    } else if (huntName === '牛鬼的洞窟') {
      // 牛鬼的洞窟多用风刃魔法
      skills = ['冰冻魔法', '风刃魔法', '风刃魔法', '风刃魔法', '风刃魔法']
    }
    const skillName = skills[kof.getTeamPosition()]
    await kof.loadSettings({
      battle: {
        "list": [
          {
            "condition": 0,
            "condition2": 0,
            "condition2rel": 0,
            "condition2val": "",
            "conditionrel": 0,
            "conditionval": "",
            "index": 0,
            "petaction": 100,
            "petskillname": "攻击",
            "pettarget": 0,
            "pettargetsel": 0,
            "playeraction": 100,
            "playerskilllevel": 0,
            "playerskillname": skillName,
            "playertarget": 0,
            "playertargetsel": 0
          }
        ],
      }
    })
  }
}
