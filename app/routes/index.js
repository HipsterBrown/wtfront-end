export default Ember.Route.extend({
	model: function() {
		var answers = this.get('store').findAll('answer');

		return answers;
	}
});
