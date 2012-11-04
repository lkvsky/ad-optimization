describe("Schedule", function() {
	var schedule;

	beforeEach(function() {
		schedule = new Schedule();
		var testArr = [];
		for (var i=0; i<100; i++) {
			var randomInt = Math.floor(Math.random() * 100);
			var randomStr = randomInt.toString();
			testArr.push(randomStr);
		}
		schedule.adData.push(testArr);
	});

	it("should have an hourly budget and take an array of data", function() {
		expect(schedule.hourlyBudget).toEqual(10000);
		expect(schedule.adData).toEqual(jasmine.any(Array));
	});

	it("should return an hourly rate to be applied to each ad based on clicks", function() {
		expect(schedule.getHourlyRate(0)).toEqual(jasmine.any(Number));
		expect(schedule.getHourlyRate(0)).toBeGreaterThan(0);
	});

	it("should calculate the budget for each ad for that hour", function() {
		var totalBudget = schedule.getHourlyAdBudget(0);
		var count = 0;
		for (var i=0; i<totalBudget.length; i++) {
			count += totalBudget[i].budget;
		}

		expect(count).toEqual(schedule.hourlyBudget);
		expect(schedule.getHourlyAdBudget(0)).toEqual(jasmine.any(Array));
		expect(schedule.getHourlyAdBudget(0).length).toBeGreaterThan(0);
		expect(schedule.getHourlyAdBudget(0)[1].budget).toBeGreaterThan(schedule.adData[0][1]);
	});

	it("should let me find an ad's budget at a given hour", function() {
		expect(schedule.getAdAtHour(0, 1)).toEqual(jasmine.any(Number));
		expect(schedule.getAdAtHour(0, 1)).toBeGreaterThan(schedule.adData[0][1]);
	});

	it("should let me find the ad's budget at each hour for the whole month", function() {
		expect(schedule.getAdTotalHours(1).length).toEqual(schedule.adData.length);
		expect(schedule.getAdTotalHours(1)[0].budget).toEqual(schedule.getAdAtHour(0, 1));
	});

	it("should return the entire ad budget schedule for the month", function() {
		expect(schedule.getEntireSchedule().length).toEqual(schedule.adData.length);
		expect(schedule.getEntireSchedule()[0]).toEqual(jasmine.any(Object));
		expect(schedule.getEntireSchedule()[0].adBudget).toEqual(schedule.getHourlyAdBudget(0));
	});

});