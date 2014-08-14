var NewController = Ember.ObjectController.extend({
	/*init: function() {
		this.set('answer', Ember.Object.create());
	},*/
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
				answeredAt: new Date()
			}),
			skills = this.get('needSkills'),
			auth = this.get('auth'),
			ctrl = this;

			newAnswer.get('skills').then(function(skillsOb) {
				skills.forEach(function(skill) {
					var skillRecord = ctrl.store.createRecord('skill', {
						name: skill
					});
					skillsOb.addObject(skillRecord);
				});

				newAnswer.save().then(function() {
					window.console.log('Saved!');
					var promises = Ember.A();

					newAnswer.get('skills').then(function(skills) {
						skills.forEach(function(skill) {
							var savedSkill = skill.save();
							promises.push(savedSkill);
						});
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
			});

			/*newAnswer.save().then(function() {
				//window.console.log(newAnswer.get('answeredAt'));

				var promises = Ember.A();

				newAnswer.get('skills').then(function(skills) {
					skills.forEach(function(skill) {
						var savedSkill = skill.save();
						promises.push(savedSkill);
					});
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
			});*/

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
