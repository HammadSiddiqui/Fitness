Template.home.helpers({
    'submitted' : function () {
      if(Session.get('submitted')){
          return true;
      } else {
          return false;
      }
    },
    'food' : function () {
        var food = Calories.find({}).fetch();
        return food;
    },
    'total': function () {
        return Session.get('totalCalories');
    },
    'consumed' : function () {
        return Session.get('caloriesConsumed');
    },
    'burnt': function () {
        return Session.get('burnedCalories');
    },
    'bodyType' : function () {
        var totalCalories = Session.get('totalCalories');
        var consumedCalories = Session.get('caloriesConsumed');
        var burnedCalories = Session.get('burnedCalories');
        var gender = Session.get('gender');
        if(consumedCalories <= burnedCalories) {
            if(gender == 'male'){
                return "fit";
            }
            else {
                return "fit-girl";
            }

        }
        else if(totalCalories < 1000){
            if(gender == 'male'){
                return "fit";
            }
            else {
                return "fit-girl";
            }
        }
        else if (totalCalories >= 1000){
            if(gender == 'male'){
                return "unfit";
            }
            else {
                return "unfit-girl";
            }
        }
        else {
            return "fit";
        }
    }
});


Template.home.events({
    'submit .js-gender' : function (e) {
        e.preventDefault();
        var gender = e.target.gender.value;
        console.log(gender);
        Session.set('gender', gender);
        Session.set('submitted', true);

    },
    'click .js-everyday': function (e) {
        e.preventDefault();
        var totalCalories = Session.get('totalCalories');
        var workoutCalories = 266;
        Session.set('burnedCalories', workoutCalories);
        totalCalories = totalCalories - workoutCalories;
        Session.set('totalCalories', totalCalories);
    },
    'click .js-sometimes': function (e) {
        e.preventDefault();
        var totalCalories = Session.get('totalCalories');
        var workoutCalories = 133;

        Session.set('burnedCalories', workoutCalories);
        totalCalories = totalCalories - workoutCalories;
        Session.set('totalCalories', totalCalories);
    },
    'click .js-never': function (e) {
        e.preventDefault();
        var totalCalories = Session.get('totalCalories');
        //Laziness adds more fat
        Session.set('totalCalories', totalCalories + 100);
    }
});


Template.home.onRendered(function () {

    if(Calories.find()){
        $(".chzn-select").chosen({no_results_text: "Oops, nothing found!", width: "100%", inherit_select_classes: true});
    }
    $(".chzn-select").on('change', function(evt, params) {

        if(params.selected) {
            console.log("Selected");
            var oldCalories = Session.get('totalCalories');
            var newCalories = parseInt(params.selected, 10)
            Session.set('totalCalories', newCalories + oldCalories);
            Session.set('caloriesConsumed',newCalories + oldCalories);
        }
        else if(params.deselected) {
            console.log("Selected");
            var oldCalories = Session.get('totalCalories');
            var newCalories = parseInt(params.deselected, 10)
            Session.set('totalCalories', oldCalories - newCalories);
            Session.set('caloriesConsumed',oldCalories - newCalories);
        }
    });
});

