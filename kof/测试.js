require(process.env.CGA_DIR_PATH_UTF8 + '/kof/common').then(async () => {
  // await kof.talkToNPC('士兵托葛利')
  // const dlg = await kof.waitNPCDialog()
  // console.log(dlg)
  // {
  //   type: 0,
  //   options: 12,
  //   dialog_id: 326,
  //   npc_id: 8778,
  //   message: '\n\n嗯？想出去吗？'
  // }
  cga.ClickNPCDialog(8, 0)
})
