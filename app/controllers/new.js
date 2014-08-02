var NewController = Ember.ObjectController.extend({
	init: function() {
		this.set('answer', Ember.Object.create());
	},
	isLoggedIn: false,
	answerText: "",
	user: "",
	avatar: "",
	skills: ['HTML','CSS', 'Photoshop', 'JavaScript', 'Sass', 'JQuery', 'JavaScript Frameworks'],
	needSkills: [],
	dateAnswered: new Date().toDateString(),
	output: Ember.computed.oneWay("answerText"),
	answer: null,
	dbRef: null,
	auth: null,
	createFirebase: function() {
		this._super();

		var dbRef = this.get('container').lookup('adapter:application').get('firebase'),
		app = this,
		auth = new window.FirebaseSimpleLogin(dbRef, function(error, user) {
			if (!error && user !== null) {
				window.console.log(user);
				app.setProperties({
					'user': user.username,
					'avatar': user.thirdPartyUserData.profile_image_url,
					'isLoggedIn': true
				});
				window.console.log('Done!');
			} else {
				window.console.log('Error: ' + error);
			}
		});

		app.set('auth', auth);
	}.on('init'),
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
				answeredAt: this.get('dateAnswered')
			}),
			skills = this.get('needSkills'),
			auth = this.get('auth'),
			ctrl = this;

			skills.forEach(function(skill) {
				//window.console.log(skills + ": " + skill);
				newAnswer.get('skills').addObject(ctrl.store.createRecord('skill', {
					name: skill 
				}));
			});

			newAnswer.save().then(function() {
				//window.console.log(newAnswer.get('answeredAt'));

				var promises = Ember.A();

				newAnswer.get('skills').forEach(function(skill) {
					promises.push(skill.save());
				});

				Ember.RSVP.Promise.all(promises).then(function(resolved) {
					window.console.log(resolved); 
					
					auth.logout();

					ctrl.setProperties({
						'user': '',
						'avatar': '',
						'answerText': '',
						'isLoggedIn': false,
						'needSkills': []
					});

					ctrl.transitionToRoute('index');			
				});
			});

		},
		checked: function(skill) { 
			var skills = this.get('needSkills'),
				place = skills.indexOf(skill);

			if (place === -1) {
				skills.pushObject(skill);
			} else {
				skills.popObject(skill);
			}
		}
	}
});

export default NewController;
