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
		var Events = parse.Object.extend('events');
		var event = new Events();

		event.set('eventCategory', e.category);
	  	event.set('eventCity', e.city);
		event.set('eventContact', e.contact);
		event.set('eventStart', e.startDate.length > 0 ? new Date(e.startDate) : undefined);
		event.set('eventEnd', e.endDate.length > 0 ? new Date(e.endDate) : undefined);
		event.set('eventDescription', e.description);
		event.set('eventLocation', e.location);
		event.set('eventName', e.name);
		event.set('eventOrganizer', e.organizer);
		event.set('eventPrice', e.price.length > 0 && isFinite(e.price) ? parseInt(e.price) : 0);
		event.set('eventState', e.state.abbreviation);
		event.set('eventTickets', e.tickets);
		event.set('eventWebsite', e.website);

		event.save().then(
			function(data) {
				res.res.json({success: true});
			}, 
			function(error){
				res.res.json({error: error});
			});
	});
};