const fetch = require("node-fetch")

module.exports.getTimetable = async function (busStop) {


  const postData = `
  {
    stops(name: "1660") {
      id
      stoptimesForPatterns {
        stoptimes {
          scheduledArrival
          pickupType
          trip {
            route {
              longName
              shortName
            }
          }
        }   
      }
    }
  }`


  const url = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'
  const options = {
    body: postData,
    headers: {
      'Content-type': 'application/graphql'
    },
    method: "POST"
  }

  const response = await fetch(url, options)
  const reponseJson = await response.json()
  const returnArray = parseAndCalculate(reponseJson)
  const returnString = convertToText(returnArray)
  return returnString
}

function timeDifference(currentTime, arrivalTime) {
  const timeDifference = arrivalTime - currentTime
  const timeDifferenceInMinutes = Math.floor(timeDifference / 60)
  return timeDifferenceInMinutes
}

function currentTimeInSeconds() {
  const d = new Date(), e = new Date(d)
  const currentUtcTimeInSeconds = (e - d.setHours(0, 0, 0, 0)) / 1000
  return currentUtcTimeInSeconds
}

function mySort(a, b) {
  return a.arrival - b.arrival
}

function convertToText(sortedTimeTableArray) {
  let returnString = ''
  sortedTimeTableArray.map((arrival) => {
    returnString += `Bus ${arrival.route} arrives in ${arrival.arrival} minutes. `
  })
  return returnString
}

function parseAndCalculate(returnedObject) {

  const scheduleArray = returnedObject.data.stops[0].stoptimesForPatterns

  const currentTime = currentTimeInSeconds()
  let timeTableArray = []
  // Routes
  scheduleArray.forEach((busLine) => {
    const routeArrivals = busLine.stoptimes
    // Bus arrivals within that route
    routeArrivals.forEach((arrival) => {
      // Arrival time is measured as seconds from midnight
      // Somehow it can be over 24 hours.. dealing with it:
      const arrivalTime = arrival.scheduledArrival > 86400 ? arrival.scheduledArrival - 86400 : arrival.scheduledArrival
      const timeInMinutes = timeDifference(currentTime, arrivalTime)
      if (timeInMinutes < 60 && timeInMinutes > 1) {
        const routeName = (arrival.trip.route.shortName)
        timeTableArray.push({ route: routeName, arrival: timeInMinutes })
      }
    })
  })

  const sortedTimeTableArray = timeTableArray.sort(mySort).slice(0, 5)
  return sortedTimeTableArray
}