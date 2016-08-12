Educations = new Mongo.Collection("educations");
Experiences = new Mongo.Collection("experiences");
Skills = new Mongo.Collection("skills");
Languages = new Mongo.Collection("languages");
Hobbies = new Mongo.Collection("hobbies");
Configs = new Mongo.Collection("configs");



Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render('home');
});

Router.route('/yoga', function () {
  this.render('yoga');
});

Router.route('/it', function () {
  this.render('it');
});

Router.route('/trips', function () {
  this.render('trips');
});

Router.route('/blog', function () {
  this.render('blog');
});

Router.route('/webrtc', function () {
  this.render('webrtc');
});