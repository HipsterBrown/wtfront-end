export default Ember.Route.extend({
	model: function() {
		var answers = this.get('store').findAll('answer');

		window.console.log(answers);
		return answers;
	}
});
