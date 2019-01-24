const express = require('express')
const bodyParser = require('body-parser')
var fs = require('fs')

const app = express()

const port = 3000

var createIfNotExists = (filename) => {
  fs.open(filename, 'r', (err, fd) => {
    if (err) {
      fs.writeFile(filename, '', (err) => {
        if (err) {
          console.log("Couldn't create base file ", filename);
        }
        console.log("Created base file ", filename);

      })
    }
  })
}

createIfNotExists('activeList.csv');
createIfNotExists('totalTime.csv');

// Allows us to easily read the payload from the webhook
app.use(bodyParser.json());

app.all("/analyzing", (req, res, next) => {
  try {
    var action = req.body.action;
    console.log(action)

    if (action.display.translationKey === 'action_move_card_from_list_to_list') {
      if (action.data.listAfter.name === 'Analyzing / Writing functional specification') {
        var activityEntry = {
          id: action.data.card.id,
          name: action.data.card.name,
          personName: action.memberCreator.username,
          personId: action.memberCreator.id,
          date: action.date
        }
        console.log(activityEntry);
        registerOnFile('activeList.csv', activityEntry);
      } else if (action.data.listBefore.name === 'Analyzing / Writing functional specification') {
        var activityEntry = {
          id: action.data.card.id,
          name: action.data.card.name,
          personName: action.memberCreator.username,
          personId: action.memberCreator.id,
          date: action.date
        }
        console.log("Calculating diff in time for entry " + activityEntry.name);

        calculateDiffInTime('activeList.csv', activityEntry);
      }
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

});

app.all("/developing", (req, res, next) => {
  try {
    var action = req.body.action;

    if (action.display.translationKey === 'action_move_card_from_list_to_list') {
      if (action.data.listAfter.name === 'Developing / Configuring [DEV]') {
        var activityEntry = {
          id: action.data.card.id,
          name: action.data.card.name,
          personName: action.memberCreator.username,
          personId: action.memberCreator.id,
          date: action.date
        }
        console.log(activityEntry);
        registerOnFile('activeList.csv', activityEntry);
      } else if (action.data.listBefore.name === 'Developing / Configuring [DEV]') {
        var activityEntry = {
          id: action.data.card.id,
          name: action.data.card.name,
          personName: action.memberCreator.username,
          personId: action.memberCreator.id,
          date: action.date
        }
        console.log("Calculating diff in time for entry " + activityEntry.name);

        calculateDiffInTime('activeList.csv', activityEntry);
      }
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.all("/testing-qua", (req, res, next) => {
  try {
    var action = req.body.action;

    if (action.display.translationKey === 'action_move_card_from_list_to_list') {
      if (action.data.listAfter.name === 'Testing in QUA') {
        var activityEntry = {
          id: action.data.card.id,
          name: action.data.card.name,
          personName: action.memberCreator.username,
          personId: action.memberCreator.id,
          date: action.date
        }
        console.log(activityEntry);
        registerOnFile('activeList.csv', activityEntry);
      } else if (action.data.listBefore.name === 'Testing in QUA') {
        var activityEntry = {
          id: action.data.card.id,
          name: action.data.card.name,
          personName: action.memberCreator.username,
          personId: action.memberCreator.id,
          date: action.date
        }
        console.log("Calculating diff in time for entry " + activityEntry.name);

        calculateDiffInTime('activeList.csv', activityEntry);
      }
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.all("/testing-acc", (req, res, next) => {
  try {
    var action = req.body.action;

    if (action.display.translationKey === 'action_move_card_from_list_to_list') {
      if (action.data.listAfter.name === 'Testing in ACC') {
        var activityEntry = {
          id: action.data.card.id,
          name: action.data.card.name,
          personName: action.memberCreator.username,
          personId: action.memberCreator.id,
          date: action.date
        }
        console.log(activityEntry);
        registerOnFile('activeList.csv', activityEntry);
      } else if (action.data.listBefore.name === 'Testing in ACC') {
        var activityEntry = {
          id: action.data.card.id,
          name: action.data.card.name,
          personName: action.memberCreator.username,
          personId: action.memberCreator.id,
          date: action.date
        }
        console.log("Calculating diff in time for entry " + activityEntry.name);

        calculateDiffInTime('activeList.csv', activityEntry);
      }
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

function registerOnFile(file, activityEntry) {
  var content = "";
  for (var each in activityEntry) {
    content += activityEntry[each] + ";"
  }
  fs.appendFile(file, content + '\n', (err) => {
    if (err) throw err;
  })
}

function removeFromFile(file, id) {
  var linesRead = [];

  fs.readFileSync(file).toString().split('\n').forEach(function (lineRead, index) {
    if (lineRead != "") {
      linesRead.push(lineRead);
    }
  })

  var lineToDelete = "";

  linesRead.forEach((each, index) => {
    var readContent = each.split(';');
    var readId = readContent[0].replace(/(\r\n|\n|\r)/gm, "");

    if (id === readId) {
      lineToDelete = index;
    }
  })
  linesRead.splice(lineToDelete, 1);
  fs.writeFileSync(file, linesRead);
}

function registerTime(file, content) {

  var linesRead = [];

  fs.readFileSync(file).toString().split('\n').forEach(function (lineRead, index) {
    if (lineRead != "") {
      linesRead.push(lineRead);
    }
  })
  if (linesRead.length == 0) {
    console.log("There are no entries in time registry.\n")
    registerOnFile(file, content);
  } else {
    fs.writeFile(file, '');
    linesRead.forEach((each, index) => {
      var readContent = each.split(';');
      var id = readContent[0].replace(/(\r\n|\n|\r)/gm, "");
      var personId = readContent[3].replace(/(\r\n|\n|\r)/gm, "");

      if (id === content.id && personId === content.personId) {
        var totalTime = parseFloat(content.time) + parseFloat(readContent[4]);
        readContent[4] = totalTime;
      }
      var contentToRegister = {
        id: readContent[0],
        nameCard: readContent[1],
        personName: readContent[2],
        personId: readContent[3],
        time: readContent[4]
      }
      registerOnFile(file, contentToRegister);
    })
  }
  removeFromFile('activeList.csv', content.id);
}

function calculateDiffInTime(file, activityEntry) {
  try {
    fs.readFileSync(file).toString().split('\n').forEach(function (lineRead, index) {
      if (lineRead != "") {
        console.log("Read line " + lineRead);
        var readContent = lineRead.split(';');

        var id = readContent[0].replace(/(\r\n|\n|\r)/gm, "");
        var personId = readContent[3].replace(/(\r\n|\n|\r)/gm, "");
        var date = readContent[4].replace(/(\r\n|\n|\r)/gm, "");

        if (activityEntry.id === id && activityEntry.personId == personId) {

          var date1 = new Date(activityEntry.date)
          var date2 = new Date(date)

          var diffInTime = (date1.getTime() - date2.getTime()) / 1000;

          console.log("Diff in time between " + activityEntry.date + " and " + date + " is " + diffInTime);

          var contentToRegister = {
            id: activityEntry.id,
            nameCard: activityEntry.name,
            personName: activityEntry.personName,
            personId: activityEntry.personId,
            time: diffInTime
          }
          registerTime('totalTime.csv', contentToRegister);
        }
      }


    })
  } catch (error) {
    console.log(error);
  }
}

app.listen(process.env.PORT || 5000, () => console.log(`App listening on port ${port}`))
