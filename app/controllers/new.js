//import Firebase from "../adapters/application";

var NewController = Ember.ObjectController.extend({
	needs: ['application'],
	init: function() {
		this.set('answer', Ember.Object.create());
	},
	isLoggedIn: false,
	answerText: "",
	user: "",
	avatar: "",
	skills: ['HTML','CSS', 'Photoshop', 'JavaScript', 'Sass', 'JQuery', 'JavaScript Frameworks'],
	dateAnswered: new Date().toDateString(),
	output: Ember.computed.oneWay("answerText"),
	answer: null,
	auth: Ember.computed.alias('controllers.application.auth'),
	actions: {
		login: function() {
			var auth = this.get('auth');

			auth.login('twitter');
		},
		post: function() {
			var newAnswer = this.store.createRecord('answer', {
				user: this.get('user'),
				avatar: this.get('avatar'),
				content: this.get('answerText'),
			}),
			auth = this.get('auth');
			/*
			newAnswer.save();
			this.setProperties({
				'user': '',
				'avatar': '',
				'answeredText': ''
			});
			window.alert('Posted!');*/
			auth.logout();
			this.setProperties({
				'user': '',
				'avatar': '',
				'isLoggedIn': false
			});/*
			this.set('controllers.application.user.name', null);
			this.set('controllers.application.user.pic', null);
			this.set('controllers.application.user.loggedIn', false);*/
			this.transitionTo('index');			
		}
	}
});

export default NewController;
