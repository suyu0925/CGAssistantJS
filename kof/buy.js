kof.buyPoision = async (count) => {
    if (!count) {
        console.log(`必须指定购买药水数量`)
        return
    }

    await kof.travel.falan.toEastHospital()
    await kof.talkToNPC('药剂师波洛姆')

    let dlg = await kof.waitNPCDialog()
    console.log(dlg)
    // {
    //     type: 5,
    //     options: 0,
    //     dialog_id: 333,
    //     npc_id: 8016,
    //     message: '14089|药剂师波洛姆|买药请来这里吧！|3'
    // }
    cga.ClickNPCDialog(-1, 0) // 选第一个：买

    dlg = await kof.waitNPCDialog()
    // 货架
    // 0: 生命力回复药（75）
    // 1: 止痛药（特价品）
    const buyItem = [{ index: 0, count }]
    cga.BuyNPCStore(buyItem)

    await cga.delay(1000)

    console.log(`买完${count}瓶药水`)
}
