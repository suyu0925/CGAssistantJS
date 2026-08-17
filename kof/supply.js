kof.getInjuredPets = () => {
  const petIds = [0, 1, 2, 3, 4]
  const injuredPetIds = petIds.filter(petId => {
    const pet = cga.GetPetInfo(petId)
    return pet.level !== 0 && pet.health !== 0
  })
  return injuredPetIds
}

kof.needTreat = () => {
  return false
}

/**
 * 是否需要补给
 * @param {boolean} allPet 是否检查所有宠物
 * @returns {boolean}
 */
kof.needSupply = (allPet = true) => {
  const playerInfo = cga.GetPlayerInfo()
  const playerNeedSupply = playerInfo.hp < playerInfo.maxhp || playerInfo.mp < playerInfo.maxmp
  const petIds = allPet ? [0, 1, 2, 3, 4] : [playerInfo.petid]
  const petNeedSupply = petIds.some(petId => {
    if (petId === -1) {
      return false
    }
    const pet = cga.GetPetInfo(petId)
    return pet.hp < pet.maxhp || pet.mp < pet.maxmp
  })
  return playerNeedSupply || petNeedSupply
}

const waitForFullSupply = async (sec = 5) => {
  let passed = 0
  while (passed < sec && kof.needSupply()) {
    passed += 1
    await kof.delay(1000)
  }
}

kof.supply = async () => {
  const pushAutoSupply = async () => {
    const autosupply = (await kof.getSettings()).player.autosupply
    if (!autosupply) {
      await kof.loadSettings({ player: { autosupply: true } })
    }
    return autosupply
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
  await kof.walkList([
    [8, 34],
  ])
  const nurse = kof.isBattleJob() ? '资深护士菲儿' : '护士尤美儿'
  console.log(nurse)
  await kof.moveToNPC(nurse)

  const autosupply = await pushAutoSupply()
  await kof.talkToNPC(nurse)
  await waitForFullSupply()
  await restoreAutoSupply(autosupply)

  if (!kof.needSupply()) {
    console.log(`很好，很有精神！状态满满！`)
  } else {
    console.log(`补给出错，请手动补给`)
  }
}
