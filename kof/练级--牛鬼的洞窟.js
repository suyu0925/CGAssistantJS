require(process.env.CGA_DIR_PATH_UTF8 + '/kof/common').then(async () => {
  // 从芙蕾雅出发
  await kof.walkList([
    [665, 184, '牛鬼的洞穴'],
    [16, 10, '牛鬼的洞窟1楼'],
  ])
  while (true) {
    await cga.walkRandomMaze(null)
  }
})
