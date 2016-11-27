
Meteor.startup(function()  {
  // code to run on server at startup
    if(!Calories.findOne()) {
        for(var i = 0; i < DATA.length; i++) {
            Calories.insert(DATA[i]);
        }
    }
    Meteor.publish('calories', function () {
        return Calories.find({});
    })
});
