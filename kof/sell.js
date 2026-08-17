const garbageFilter = (item) => {
    if (item.name == '魔石' || item.name == '卡片？' || item.name == '锥形水晶') {
        return true
    }
}

// 卖垃圾
kof.sellGarbage = async () => {
    if (cga.getInventoryItems().filter(garbageFilter).length > 0) {
        await kof.travel.falan.toMerchant()

        const sellList = cga.getInventoryItems().filter(garbageFilter).map(e => {
            let sellCount = (e.count < 1) ? 1 : e.count
            if ([30, 34, 35].indexOf(e.type) >= 0) {
                sellCount = parseInt(e.count / 20)
            } else if ([43, 23].indexOf(e.type) >= 0) {
                sellCount = parseInt(e.count / 3)
            }
            return { itempos: e.pos, itemid: e.itemid, count: sellCount }
        })

        cga.TurnTo(156, 122) // 平民防具贩售处

        let dlg = await kof.waitNPCDialog()
        console.log(dlg)
        // {
        //   type: 5,
        //   options: 0,
        //   dialog_id: 333,
        //   npc_id: 14720,
        //   message: '14183|平民防具贩售处|\\n欢迎光临，\\n你有什么事吗？|3'
        // }

        if (dlg.type == 5) {
            // 如果里最后的数字是3，代表‘买’，‘卖’，和‘不用了’。选择options[1]：‘卖’
            cga.ClickNPCDialog(-1, dlg.message.charAt(dlg.message.length - 1) == '3' ? 1 : 0)
        }

        dlg = await kof.waitNPCDialog()
        console.log(dlg)
        // {
        //   type: 7,
        //   options: 0,
        //   dialog_id: 334,
        //   npc_id: 14720,
        //   message: '14183|平民防具贩售处|你想要卖哪一个呢？|魔石|1|27961|96|8|0||$4等级 1\\n$0种类 不明\\n\\n\\n\\n\\n\\n\\n$4魔族力量的来源\\n\\n|1|1|魔石|1|27958|96|9|0||$4等级 1\\n$0种类 不明\\n\\n\\n\\n\\n\\n\\n$4魔族力量的来源\\n\\n|1|1|魔石|1|27959|96|10|0||$4等级 1\\n$0种类 不明\\n\\n\\n\\n\\n\\n\\n$4魔族力量的来源\\n\\n|1|1|魔石|1|27959|96|11|0||$4等级 1\\n$0种类 不明\\n\\n\\n\\n\\n\\n\\n$4魔族力量的来源\\n\\n|1|1|魔石|1|27959|96|12|0||$4等级 1\\n$0种类 不明\\n\\n\\n\\n\\n\\n\\n$4魔族力量的来源\\n\\n|1|1|魔石|1|27959|96|13|0||$4等级 1\\n$0种类 不明\\n\\n\\n\\n\\n\\n\\n$4魔族力量的来源\\n\\n|1|1|魔石|1|27961|96|14|0||$4等级 1\\n$0种类 不明\\n\\n\\n\\n\\n\\n\\n$4魔族力量的来源\\n\\n|1|1|魔石|1|27961|96|15|0||$4等级 1\\n$0种类 不明\\n\\n\\n\\n\\n\\n\\n$4魔族力量的来源\\n\\n|1|1|魔石|1|27958|96|16|0||$4等级 1\\n$0种类 不明\\n\\n\\n\\n\\n\\n\\n$4魔族力量的来源\\n\\n|1|1|魔石|1|27958|96|17|0||$4等级 1\\n$0种类 不明\\n\\n\\n\\n\\n\\n\\n$4魔族力量的来源\\n\\n|1|1|魔石|1|27961|96|18|0||$4等级 1\\n$0种类 不明\\n\\n\\n\\n\\n\\n\\n$4魔族力量的来源\\n\\n|1|1|魔石|1|27958|96|19|0||$4等级 1\\n$0种类 不明\\n\\n\\n\\n\\n\\n\\n$4魔族力量的来源\\n\\n|1|1|魔石|1|27958|96|20|0||$4等级 1\\n$0种类 不明\\n\\n\\n\\n\\n\\n\\n$4魔族力量的来源\\n\\n|1|1|魔石|1|27958|96|21|0||$4等级 1\\n$0种类 不明\\n\\n\\n\\n\\n\\n\\n$4魔族力量的来源\\n\\n|1|1|地的水晶碎片|6|27523|0|22|0||$4等级 1\\n$0种类 不明\\n\\n\\n\\n\\n\\n\\n$4地的水晶碎片\\n\\n$1无法用宠物邮件传送\\n|0|999|生命力回复药（75）|3|26218|150|23|0||$4等级 1\\n$0种类 药\\n回复75点生命力\\n\\n\\n\\n\\n\\n$4回复生命力75点的药\\n\\n|0|3|生命力回复药（75）|3|26218|150|24|0||$4等级 1\\n$0种类 药\\n回复75点生命力\\n\\n\\n\\n\\n\\n$4回复生命力75点的药\\n\\n|0|3|平民回力镖|1|21201|700|25|0||$1攻击 +17 $4等级 1\\n$4耐久 0133/0150 $0种类 回力镖\\n\\n\\n\\n\\n\\n\\n$4一般平民使用的回力镖。\\n\\n|0|1|水的水晶碎片|1|27512|0|26|0||$4等级 1\\n$0种类 不明\\n\\n\\n\\n\\n\\n\\n$4水的水晶碎片\\n\\n$1无法用宠物邮件传送\\n|0|999|时间纹章|1|25005|150|27|0||$1防御 +40 $8命中  +9 $4等级 3\\n$4耐久 0066/0160 $0种类 护身符\\n\\n\\n\\n\\n\\n\\n$4在时间中旅行过的证明。\\n\\n|0|1'
        // }
        cga.SellNPCStore(sellList)

        // 等待1秒钟
        await cga.delay(1000)

        console.log('卖完了')
    } else {
        console.log('身上没有要卖的垃圾')
    }
}
