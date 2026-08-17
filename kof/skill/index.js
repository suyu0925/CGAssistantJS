kof.learnSkillFromNPC = async (npcName) => {

}

kof.learnSkill = async (skillName) => {
  const skill = cga.findPlayerSkill(skillName)
  if (skill) {
    console.log(`已经学会${skillName}`)
    return
  }

  // TODO:
}
