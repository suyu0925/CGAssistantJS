kof.isInTeam = () => {
    const teamPlayers = cga.getTeamPlayers()
    if (teamPlayers && teamPlayers.length > 0) {
        return true
    } else {
        return false
    }
}

kof.buildTeam = async (teammatesCount = 5) => {
    // 开启组队模式
    cga.EnableFlags(cga.ENABLE_FLAG_JOINTEAM, true)

    while (true) {
        const teamplayers = cga.getTeamPlayers()
        if (teamplayers && teamplayers.length === teammatesCount) {
            break
        }
        await cga.delay(1000)
    }

    kof.log(`组队完成，队员[${cga.getTeamPlayers()}]`)
}

kof.getTeamLeader = () => {
    const teamPlayers = cga.getTeamPlayers()
    if (teamPlayers && teamPlayers.length > 0) {
        return teamPlayers[0]
    } else {
        return null
    }
}

kof.enterTeam = async (teamLeader) => {
    while (true) {
        if (kof.getTeamLeader() && kof.getTeamLeader().name === teamLeader) {
            kof.log(`已进入队伍，队长[${teamLeader}]`)
            return
        }

        const leaderInfo = cga.findPlayerUnit(teamLeader)
        const mypos = cga.GetMapXY()
        if (leaderInfo == null
            || !cga.isDistanceClose(leaderInfo.xpos, leaderInfo.ypos, mypos.x, mypos.y)
            || (leaderInfo.xpos == mypos.x && leaderInfo.ypos == mypos.y)
        ) {
            // 等待队长过来
            await cga.delay(1000)
            continue
        }

        cga.TurnTo(leaderInfo.xpos, leaderInfo.ypos)

        // 申请入队
        cga.DoRequest(cga.REQUEST_TYPE_JOINTEAM)

        try {
            const dlg = await kof.waitNPCDialog()
            if (dlg.type === 2) {
                cga.ClickNPCDialog(-1, dlg.message.split('\n').findIndex(e => e === teamLeader) - 2)
                await cga.delay(1000)
                continue
            }
        } catch (err) {
            kof.log(`enterTeam throw ${err}`)
        }

        await cga.delay(1000)
    }
}

kof.teamup = async (teamLeader, x, y) => {
    if (!teamLeader) {
        teamLeader = kof.getDefaultTeamLoader()
    }

    if (cga.GetPlayerInfo().name === teamLeader) {
        await kof.walkList([[x, y]])
        await kof.buildTeam()
    } else {
        await kof.moveToAround(x, y)
        await kof.enterTeam(teamLeader)
    }
}

kof.getDefaultTeamLoader = () => {
    const playerName = cga.GetPlayerInfo().name
    if (playerName.includes('片帆')) {
        return '=一片帆='
    } else if (playerName.includes('支花')) {
        return '=一支花='
    }
}
