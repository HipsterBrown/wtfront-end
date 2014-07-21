//import Firebase from "../adapters/application";

var NewController = Ember.Controller.extend({
	isLoggedIn: false,
	answerText: "",
	user: "",
	output: Ember.computed.oneWay("answerText"),
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
		}
	}
});

export default NewController;
