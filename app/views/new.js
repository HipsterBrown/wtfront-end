export default Ember.View.extend({
	change: function(evt) {
		var $ = Ember.$,
			skill = $(evt.target).attr('name');
		this.get('controller').send('checked', skill);
	}
});
