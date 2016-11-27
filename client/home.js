Template.home.helpers({
    'food' : function () {
        var food = Calories.find({}).fetch();
        return food;
    }
});


Template.home.events({
    'click .js-everyday': function (e) {
        e.preventDefault();
        var totalCalories = Session.get('totalCalories');
        totalCalories = totalCalories - 112;
        Session.set('totalCalories', totalCalories);
    },
    'submit .js-weight' : function (e) {
        e.preventDefault();
        var value = e.target.weight.value;
        console.log(value);
    }
});


Template.home.onRendered(function () {

    if(Calories.find()){
        $(".chzn-select").chosen({no_results_text: "Oops, nothing found!", width: "350px"});
    }
    $(".chzn-select").on('change', function(evt, params) {
        console.log(evt);
        console.log(params);
        if(params.selected){
            console.log("Selected");
            var oldCalories = Session.get('totalCalories');
            var newCalories = parseInt(params.selected, 10)
            Session.set('totalCalories', newCalories + oldCalories);
        }
        else if(params.deselected) {
            console.log("Selected");
            var oldCalories = Session.get('totalCalories');
            var newCalories = parseInt(params.deselected, 10)
            Session.set('totalCalories', oldCalories - newCalories);
        }
    });
});

