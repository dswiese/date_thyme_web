module.exports = function(app) {

  var path           = require('path');
  var parse          = require('parse').Parse;

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
    console.log(e);
    var Events = parse.Object.extend('Event');
    var event = new Events();

    event.set('eventName', e.name);
    event.set('eventStart', e.startDate.length > 0 ? new Date(e.startDate) : undefined);
    event.set('eventEnd', e.endDate.length > 0 ? new Date(e.endDate) : undefined);
    event.set('eventCategory', e.category);
    event.set('eventDescription', e.description);
    event.set('website', e.website);
    event.set('organizer', e.organizer);
    event.set('locationName', e.location);
    event.set('addressOne', e.addressOne);
    event.set('addressTwo', e.addressTwo);
    event.set('city', e.city);
    event.set('locationState', e.state.abbreviation);
    event.set('zip', e.zip);
    event.set('price', e.price.length > 0 && isFinite(e.price) ? parseInt(e.price) : 0);


    event.save().then(
      function(data) {
        res.res.json({success: true});
      },
      function(error){
        res.res.json({error: error});
      });
  });
};
