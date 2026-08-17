const _ = require('lodash')

const isPositionMovable = (x, y) => {
    const walls = cga.buildMapCollisionMatrix()
    const entries = cga.getMapObjects().filter(e => e.cell === 3 || e.cell === 10)
    // 如果不是墙，并且不是出入口，就认为可以到达
    return walls.matrix[y][x] == 0 && entries.findIndex(e => e.mapx == x && e.mapy == y) < 0
}

const isNext = (a, b) => {
    return (a.x === b.x && Math.abs(a.y - b.y) === 1)
        || (a.y === b.y && Math.abs(a.x - b.x) === 1)
        || (Math.abs(a.x - b.x) === 1 && Math.abs(a.y - b.y) === 1)
}

kof.getMovablePositionsAround = (target) => {
    const result = []
    if (isPositionMovable(target.x + 1, target.y)) {
        result.push({
            orientation: 0,
            x: target.x + 1,
            y: target.y
        })
    }
    if (isPositionMovable(target.x, target.y + 1)) {
        result.push({
            orientation: 2,
            x: target.x,
            y: target.y + 1
        })
    }
    if (isPositionMovable(target.x - 1, target.y)) {
        result.push({
            orientation: 4,
            x: target.x - 1,
            y: target.y
        })
    }
    if (isPositionMovable(target.x, target.y - 1)) {
        result.push({
            orientation: 6,
            x: target.x,
            y: target.y - 1
        })
    }
    return result
}

kof.moveToAround = async (x, y) => {
    const movablePositions = kof.getMovablePositionsAround({ x, y })
    if (movablePositions.length > 0) {
        const pos = movablePositions[0]
        await kof.walkList([[pos.x, pos.y]])
    } else {
        throw new Error(`无法移动到${x}, ${y}旁边`)
    }
}

kof.moveToNPC = async (npcName) => {
    const npc = cga.findNPC(npcName)
    if (!npc) {
        throw new Error(`未找到NPC${npcName}`)
    }
    if (isNext(cga.GetMapXY(), { x: npc.xpos, y: npc.ypos })) {
        return npc
    }
    const movablePositions = kof.getMovablePositionsAround({ x: npc.xpos, y: npc.ypos })
    if (movablePositions.length > 0) {
        const pos = movablePositions[0]
        await kof.walkList([[pos.x, pos.y]])
        return npc
    } else {
        throw new Error(`无法移动到${npcName}旁边`)
    }
}

kof.talkToNPC = async (npcName) => {
    const npc = await kof.moveToNPC(npcName)
    cga.TurnTo(npc.xpos, npc.ypos)
}

kof.goHunt = () => {
    const xy = cga.GetMapXY()
    const dir = cga.getRandomSpaceDir(xy.x, xy.y)
    kof.log(`开始高速遇敌`)
    cga.freqMove(dir)
}

kof.walkTo = (x, y) => {
    cga.WalkTo(x, y)
}

kof.waitForMapChange = async (mapName) => {
    while (true) {
        if (cga.GetMapName() === mapName) {
            break
        }
        await cga.delay(1000)
    }
}

kof.isInDeepestFloorOfLingtang = () => {
    const entries = cga.getMapObjects().filter(e => e.cell === 3 || e.cell === 10)
    if (_.isEqual(entries,
        [
            { x: 12, y: 7, mapx: 12, mapy: 7, cell: 3, rawcell: -16381 },
            { x: 10, y: 15, mapx: 10, mapy: 15, cell: 3, rawcell: -16381 },
            { x: 10, y: 19, mapx: 10, mapy: 19, cell: 3, rawcell: -16381 }
        ])) {
        return true
    } else {
        return false
    }
}
