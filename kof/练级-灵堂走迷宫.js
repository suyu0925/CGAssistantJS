require(process.env.CGA_DIR_PATH_UTF8 + '/kof/common').then(async () => {
    const cancelKeepAlive = kof.keepAlive()

    while (true) {
        try {
            await kof.walkRandomMaze(null)
        } catch (err) {
            if (cga.GetMapName() === '城内的地下迷宫地下9楼'
                || cga.GetMapName() === '城内的地下迷宫地下10楼'
                || cga.GetMapName() === '城内的地下迷宫地下11楼') {
                // 到底了
                break
            }
        }
    }

    // 离开楼梯
    await kof.walkList([[4, 19]])
    // 来回走遇敌
    while (true) {
        await kof.walkList([[6, 19]])
        await kof.walkList([[4, 19]])
    }
})
