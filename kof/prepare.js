require('./buy')
require('./sell')
require('./supply')

const poisionFilter = (item) => {
    // {
    //     name: '生命力回复药（75）',
    //     info: '$4回复生命力75点的药',
    //     attr: '$4等级 1\n$0种类 药\n回复75点生命力',
    //     count: 3,
    //     itemid: 15605,
    //     pos: 23,
    //     level: 1,
    //     type: 43,
    //     assessed: true
    // }    
    return item.name === '生命力回复药（75）'
}

kof.ensurePoision = async (expectCount = 6) => {
    const poisions = cga.getInventoryItems().filter(poisionFilter)
    const count = poisions.reduce((acc, poision) => acc + poision.count, 0)
    if (count >= expectCount) {
        console.log(`身上有${count}瓶药，不用买了`)
        return
    }

    const buyCount = Math.min(expectCount - count, Math.floor(cga.GetPlayerInfo().gold / 75))
    if (buyCount !== expectCount - count) {
        if (buyCount === 0) {
            console.log(`没钱了，跳过买药水`)
            return
        } else {
            console.log(`没钱了，只买${buyCount}瓶药水`)
        }
    } else {
        console.log(`买${buyCount}瓶药水`)
    }

    await kof.buyPoision(buyCount)

    console.log(`确保身上有${count + buyCount}瓶药水`)
}

kof.prepare = async (options = {}) => {
    await kof.sellGarbage()
    await kof.supply()
    await kof.ensurePoision(options.poisionCount)
    await kof.battle.loadSettings()
}
