const Places = {
    '法兰城': { name: '法兰城', index: 123 },
    '东医': { name: '医院', index: 224, },
}

const Stations = {
    falan: {
        eastHospital: [221, 83, '医院'],
    }
}

const Links = {
    '法兰城': {
        '东医': { x: 221, y: 83, mapName: '医院' },
        '西边芙蕾雅': [
            { x: 22, y: 87, mapName: '芙蕾雅' },
        ]
    },
    '西边芙蕾雅': {
        '神木': { x: 298, y: 149, mapName: '神木村', entry: { say: '魔术' } },
    }
}
