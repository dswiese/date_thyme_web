module.exports = function(app) {

	var path				   = require('path');
	var parse 				 = require('parse').Parse;

	app.get('/public/states.js', function(req, res){
		res.sendFile('states.js', { root: path.join(__dirname, '../public') });	
	});

	app.get('/public/app.js', function(req, res){
		res.sendFile('app.js', { root: path.join(__dirname, '../public') });
	});

	app.get('/', function(req, res){
	  res.sendFile('index.html', { root: path.join(__dirname, '../public') });
	});

	app.post('/api/event', function(res, req){
		
    parse.initialize(process.env.applicationId, process.env.javascriptId);

		var e = req.req.body;
		var Event = parse.Object.extend('Event');
		var event = new Event();

		event.set('eventName', e.name);
		event.set('eventCategory', e.category);
		event.set('eventStart', e.startDate.length > 0 ? new Date(e.startDate) : undefined);
		event.set('eventEnd', e.endDate.length > 0 ? new Date(e.endDate) : undefined);
		event.set('eventDescription', e.description);
		event.set('eventWebsite', e.website);
		event.set('eventPrice', e.price.length > 0 && isFinite(e.price) ? parseInt(e.price) : 0);
		event.set('locationName', e.locationName);
		event.set('addressOne'), e.addressOne
		event.set('addressTwo'), e.addressTwo
		event.set('city', e.city);
		event.set('state', e.state.abbreviation);
		event.set('zip', e.zip);

		event.save().then(
			function(data) {
				res.res.json({success: true});
			}, 
			function(error){
				res.res.json({error: error});
			});
	});
};