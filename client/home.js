Template.home.helpers({
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

        if(consumedCalories <= burnedCalories) {
            return "fit";
        }
        else if(totalCalories < 1500){
            return "fit"
        }
        else if (totalCalories >= 1500){
            return "unfit";
        }
        else {
            return "fit";
        }
    }
});


Template.home.events({
    'click .js-everyday': function (e) {
        e.preventDefault();
        var totalCalories = Session.get('totalCalories');
        var weight = Session.get('bodyWeight');
        var workoutCalories = 0;
        if(weight <= 56){
            workoutCalories = 180;
        }
        else if(weight <= 70 && weight > 56){
            workoutCalories = 223;
        }
        else if(weight <=83 && weight>70){
            workoutCalories = 266;
        }
        else{
            workoutCalories = 266;
        }
        Session.set('burnedCalories', workoutCalories);
        totalCalories = totalCalories - workoutCalories;
        Session.set('totalCalories', totalCalories);
    },
    'click .js-sometimes': function (e) {
        e.preventDefault();
        var totalCalories = Session.get('totalCalories');
        var weight = Session.get('bodyWeight');
        var workoutCalories = 0;
        if(weight <= 56){
            workoutCalories = 90;
        }
        else if(weight <= 70 && weight > 56){
            workoutCalories = 112;
        }
        else if(weight <=83 && weight>70){
            workoutCalories = 133;
        }
        else{
            workoutCalories = 133;
        }

        Session.set('burnedCalories', workoutCalories);
        totalCalories = totalCalories - workoutCalories;
        Session.set('totalCalories', totalCalories);
    },
    'click .js-never': function (e) {
        e.preventDefault();
        var totalCalories = Session.get('totalCalories');
        //Laziness adds more fat
        Session.set('totalCalories', totalCalories + 100);
    },
    'submit .js-weight' : function (e) {
        e.preventDefault();
        var value = parseInt(e.target.weight.value);
        Session.set('bodyWeight', value);
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

