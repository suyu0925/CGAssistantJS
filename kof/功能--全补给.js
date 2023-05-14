require(process.env.CGA_DIR_PATH_UTF8 + '/kof/common').then(async () => {
  const pushAutoSupply = async () => {
    const autosupply = (await kof.getSettings()).player.autosupply
    if (!autosupply) {
      await kof.loadSettings({ player: { autosupply: true } })
    }
  }

  const restoreAutoSupply = async (autosupply) => {
    if (!autosupply) {
      await kof.loadSettings({ player: { autosupply: false } })
    }
  }

  if (!kof.needSupply()) {
    console.log(`无需补给。`)
    return
  }

  await kof.travel.falan.toEastHospital() // 默认东医补给
  await kof.moveToNPC('资深护士菲儿')

  const autosupply = await pushAutoSupply()
  await kof.talkToNPC('资深护士菲儿')
  await cga.delay(3000)
  await restoreAutoSupply(autosupply)

  if (!kof.needSupply()) {
    console.log(`很好，很有精神！状态满满！`)
  } else {
    console.log(`补给出错，请手动补给`)
  }
})
