declare module cga {
  type PlayerInfo = {
    hp: 205,
    maxhp: 205,
    mp: 168,
    maxmp: 168,
    xp: 21160,
    maxxp: 28561,
    health: 0,
    souls: 0,
    level: 12,
    gold: 251,
    score: 870,
    skillslots: 10,
    use_title: -1,
    avatar_id: 38000,
    image_id: 100051,
    unitid: 20559,
    petid: 0, // -1代表没有作战宠，0代表第1只宠
    direction: 6,
    battle_position: 0,
    punchclock: 0,
    usingpunchclock: false,
    petriding: false,
    name: '=一片帆=',
    job: '见习弓箭手',
    nick: '',
    titles: [
      '无名的旅人', '见习弓箭手', '', '', '',
      '', '', '', '', '',
      '', '', '', '', '',
      '', '', '', '', '',
      '', '', '', '', '',
      '', '', '', '', '',
      '', '', '', '', '',
      '', '', '', '', '',
      '', '', '', '', '',
      '', '', '', '', '',
      '', '', '', '', '',
      '', '', '', '', '',
      '', '', '', '', '',
      '', '', '', '', '',
      '', '', '', '', '',
      '', '', '', '', '',
      '', '', '', '', '',
      '', '', '', '', '',
      '', '', '', '', '',
      ''
    ],
    detail: {
      points_remain: 0,
      points_endurance: 0,
      points_strength: 37,
      points_defense: 0,
      points_agility: 37,
      points_magical: 0,
      value_attack: 117,
      value_defensive: 35,
      value_agility: 101,
      value_spirit: 92,
      value_recovery: 103,
      resist_poison: 0,
      resist_sleep: 0,
      resist_medusa: 0,
      resist_drunk: 0,
      resist_chaos: 0,
      resist_forget: 0,
      fix_critical: 0,
      fix_strikeback: 0,
      fix_accurancy: 0,
      fix_dodge: 0,
      element_earth: 50,
      element_water: 0,
      element_fire: 0,
      element_wind: 50,
      manu_endurance: 50,
      manu_skillful: 50,
      manu_intelligence: 50,
      value_charisma: 82
    },
    persdesc: {
      sell_icon: 0,
      sell_string: '未设定',
      buy_icon: 0,
      buy_string: '未设定',
      want_icon: 0,
      want_string: '未设定',
      desc_string: '未设定'
    }
  }

  type PetInfo = {
    // TODO:
  }

  type MapName = string // '法兰城'

  type PlayerConfig = {
    settledCity: MapName // 定居点
  }

  type PositionXY = {
    x: number
    y: number
  }

  type MapIndex = {
    index1: number
    index2: number
    index3: number
  }

  type MapInfo = {
    index: MapIndex
    name: MapName
  } & PositionXY

  type Unit = {

  }

  type NPCInfo = {
    valid: number // 2
    type: number // 1
    model_id: number // 14152,
    unit_id: number // 9403
    xpos: number // 6
    ypos: number // 33
    item_count: number // 0
    injury: number // 0,
    icon: number // 0,
    level: number // 1,
    flags: number // 4096,
    unit_name: string // '资深护士菲儿',
    nick_name: string // '',
    title_name: string // '',
    item_name: string // ''
  }

  type GuiSetting = {
    battle: {
      autobattle: true,
      beep: false,
      bossprot: false,
      delayfrom: 668,
      delayto: 541,
      highspeed: false,
      list: [[Object]],
      lockcd: false,
      lv1prot: false,
      pet2action: false,
      r1nodelay: true,
      waitafterbattle: false
    },
    chat: {},
    itemdroplist: [],
    itemidmap: {},
    itemtweaklist: ['火的水晶碎片|999', '水的水晶碎片|999', '风的水晶碎片|999', '地的水晶碎片|999'],
    player: {
      antiafkkick: false,
      autosupply: true,
      gametextui: false,
      movespd: 100,
      noswitchanim: false,
      petfood: false,
      petfoodat: '0',
      petmed: true,
      petmedat: '40',
      usefood: false,
      usefoodat: '0',
      usemed: true,
      usemedat: '100',
      workacc: 100,
      workdelay: 6500
    }
  }

  type Dialog = {
    type: number // 0,
    options: number // 12,
    dialog_id: number // 326,
    npc_id: number // 8230,
    message: string // '\n\n　喔喔！异界来的客人啊！欢迎你。请告诉我，你是　『开启者』吗？'
  }

  type PetState =
    | 1 // 待命
    | 2 // 战斗
    | 3 // 休息
    | 16 // 宠物散步

  const GetPlayerInfo: () => PlayerInfo
  const GetPetInfo: (petId: number) => PetInfo

  const ChangePetState: (pos: number, state: PetState) => void

  const loadPlayerConfig: () => PlayerConfig

  const GetMapXY: () => PositionXY
  const GetMapName: () => MapName
  const GetMapIndex: () => MapIndex
  const GetMapInfo: () => MapInfo

  const GetMapUnits: () => Unit[]

  const findNPCEx: (filter: ((u: Unit) => boolean)) => NPCInfo | null
  const findNPC: (name: string) => NPCInfo | null
  const findNPCByPosition: (name: string, x: number, y: number) => NPCInfo | null

  const AsyncWaitNPCDialog: (cb: (err: Error | null, dlg: Dialog) => void) => void
  const ClickNPCDialog: (a: number, b: number) => void

  namespace gui {
    const GetSettings: () => GuiSetting
  }
}
