const timetableFunctions = require ('./handleNewTimetableRequest.js') 

const local = async () => {
    const returnValue = await timetableFunctions.handleNewTimetableRequest()
    console.log('returnValue: ', returnValue)
}

local()
