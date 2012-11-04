// My approach to solving this problem was to create a scheduling constructor that took
// either a pre-parsed .csv file as an argument, or initialized with an empty array.
// I wrote a python script to generate the ad matrix of arrays, then wrote the schedule
// constructor and spec to optimize and return the monthly budget.

/* **************************************************************************************** */

// create a scheduling constructor that takes an array of ad click/dollar data

function Schedule(adData) {
	this.adData = adData || [];
	this.hourlyBudget = 10000;
}

// calculate hourly rate to apply to each ad

Schedule.prototype.getHourlyRate = function(hour) {
	var timeX = this.adData[hour];
	totalClicks = 0;
	for (var i=0; i<timeX.length; i++) {
		totalClicks += parseInt(timeX[i], 10);
	}
	var rate = this.hourlyBudget / totalClicks;
	return rate;
};

// return the budget for all ads at a given hour

Schedule.prototype.getHourlyAdBudget = function(hour) {
	var i;
	var timeX = this.adData[hour];
	var rate = this.getHourlyRate(hour);
	var budgetBreakdown = [];
	// set counter to see if there is leftover budget
	var count = 0;
	for (i=0; i<timeX.length; i++) {
		var adXbudget = parseInt(timeX[i], 10) * rate;
		var adXClean = parseInt(adXbudget.toFixed(2), 10);
		var adBudgetObj = {
			"ad" : i,
			"budget" : adXClean
		};
		budgetBreakdown.push(adBudgetObj);
		count += adXClean;
	}
	// apply remaining budget to ads who's budget is already greater than zero
	// don't want to ad budget to an ad that isn't expected to yield any clicks
	if ((this.hourlyBudget - count) > 0) {
		var remainder = this.hourlyBudget - count;
		for (i=0; i<remainder; i++) {
			if (budgetBreakdown[i].budget > 0) {
				budgetBreakdown[i].budget++;
			}
		}
	}
	return budgetBreakdown;
};

// return the budget for a given ad at a given hour

Schedule.prototype.getAdAtHour = function(hour, adNum) {
	var budgetX = this.getHourlyAdBudget(hour);
	return budgetX[adNum].budget;
};

// return the budget for a given ad for the whole month

Schedule.prototype.getAdTotalHours = function(adNum) {
	var adEachHour = [];
	for (var i=0; i<this.adData.length; i++) {
		var budgetX = this.getAdAtHour(i, adNum);
		var budgetObj = {
			"hour": i,
			"budget": budgetX
		};
		adEachHour.push(budgetObj);
	}
	return adEachHour;
};

// return the entire ad budget schedule for the month

Schedule.prototype.getEntireSchedule = function() {
	var schedule = [];
	for (var i=0; i<this.adData.length; i++) {
		var hourlyBreakdownObj = {
			"hour": i,
			"adBudget": this.getHourlyAdBudget(i)
		};
		schedule.push(hourlyBreakdownObj);
	}
	return schedule;
};
