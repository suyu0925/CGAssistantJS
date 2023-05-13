require(process.env.CGA_DIR_PATH_UTF8 + '/kof/common').then(async () => {
  await kof.walkList([[219, 136, '科特利亚酒吧']])
})
