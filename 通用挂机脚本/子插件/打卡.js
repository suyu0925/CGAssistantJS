var cga = global.cga;
var configTable = global.configTable;

module.exports = {
	prepare : (cb)=>{
		var playerinfo = cga.GetPlayerInfo();
		if(playerinfo.punchclock > 0 && !playerinfo.usingpunchclock){
			var mapname = cga.GetMapName();
			if(mapname == '法兰城')
			{
				cga.travel.falan.toStone('W1', ()=>{
					cga.walkList([
					[73, 60, '职业公会'],
					[11, 10],
					], ()=>{
						cga.TurnTo(11, 8);
						cga.AsyncWaitNPCDialog((err, dlg)=>{
							if(dlg.options == 12){
								cga.ClickNPCDialog(4, -1);
								cga.AsyncWaitNPCDialog(()=>{
									cga.walkList([
										[9, 24, '法兰城'],
										[63, 79],
									], cb);
								});
							} else {
								cb(new Error('没有卡时，无法打卡'));
							}
						});
					})
				});
				return
			}

			cga.travel.falan.toCastleClock((r)=>{
				cb(null);
			});
		} else {
			cb(null);
		}
	},
	loadconfig : (obj, cb)=>{
		return true;
	},
	inputcb : (cb)=>{
		cb(null);
	}
};