
// preliminary structure of trigger to send to reasoning engine

// {
//   "timeStamp": "2014-03-26T11:48+0100",
//   "data": {
//     "e": [{
//       "tag": "ramp:ManualDirector",
//       "State": "On",
//       "UserID": "355",
//       "DocumentID": "13",
//       "Duration": 50
//     }]
//   },
//   "prefixes": {
//     "televic": "http://ramp.intec.ugent.be/ontology/televic.owl#"
//   }
// }

function televicMicrophone(id, active){

  var body = {
    timeStamp: new Date().toISOString(),
    data: {
      e: [{
        tag: "ramp:ManualDirector",
        State: (active? "On" : "Off"),
        MicID: id,
        // DocumentID
        Duration: 0
      }]
    },
    prefixes: {
      televic: "http://ramp.intec.ugent.be/ontology/televic.owl#"
    }
  }
  return body;
}

exports.televicMicrophone = televicMicrophone;