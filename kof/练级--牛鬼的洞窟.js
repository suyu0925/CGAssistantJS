require(process.env.CGA_DIR_PATH_UTF8 + '/kof/common').then(async () => {
  await kof.walkList2([[665, 184, '牛鬼的洞穴']])
  // TODO: 修改坐标
  await kof.walkList2([[665, 184, '牛鬼的洞窟']])
})
