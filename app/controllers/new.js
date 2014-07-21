//import Firebase from "../adapters/application";

var NewController = Ember.Controller.extend({
	init: function() {
		this.set('answer', Ember.Object.create());
	},
	isLoggedIn: false,
	answerText: "",
	user: "" || "Anon",
	avatar: "" || 'http://placehold.it/100.png/E92B2B/ffffff&text=Profile',
	output: Ember.computed.oneWay("answerText"),
	answer: null,
	auth: null,/*
	makeAuth: function() {
		var ref = this.get('container').lookup('adapter:application').get('firebase'),
		auth = new window.FirebaseSimpleLogin(ref, function(error, user) {
			if (!error) {
					this.set('user', user.id);
					this.set('isLoggedIn', true);
					window.alert('Logged In!');
				} else {
					window.alert(error);
				}
			});
		this.set('auth', auth);
	}.on('init'),*/
	actions: {
		login: function() {
			this.set('isLoggedIn', true);
		},
		post: function() {
			var newAnswer = this.store.createRecord('answer', {
				user: this.get('user'),
				avatar: this.get('avatar'),
				content: this.get('answerText'),
				answeredAt: new Date.getTime()
			});
			newAnswer.save();
			this.setProperties({
				'user': '',
				'avatar': '',
				'answeredText': ''
			});
			window.alert('Posted!');			
		}
	}
});

export default NewController;
