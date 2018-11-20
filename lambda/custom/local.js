const timetableFunction = require ('./getTimetable') 

const local = async () => {
    const returnValue = await timetableFunction.getTimetable()
    console.log('returnValue: ', returnValue)
}

local()
