export default Ember.ObjectController.extend({
  needs: ['new'],
  isOpen: false,
  dbRef: null,
  auth: null,
  user: Ember.Object.create({
    name: null,
	pic: null,
	loggedIn: false
  }),
  createFirebase: function() {
	  this._super();

	  var dbRef = this.get('container').lookup('adapter:application').get('firebase'),
		  app = this,
		  auth = new window.FirebaseSimpleLogin(dbRef, function(error, user) {
			if (!error && user !== null) {
				window.console.log(user);
				app.set('user.name', user.username);
				app.set('user.pic', user.thirdPartyUserData.profile_image_url);
				app.set('user.loggedIn', true);
				window.console.log('Done!');
			} else {
				window.console.log('Error: ' + error);
			}
		  });

	  app.set('auth', auth);
  }.on('init'),
  actions: {
    open: function() {
      var isOpen = this.get('isOpen');
      if (isOpen) {
        this.set('isOpen', false);
      } else {
        this.set('isOpen', true);
      }
    }
  }
});
