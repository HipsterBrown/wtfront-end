export default Ember.View.extend({
	change: function(evt) {
		this._super();

		var $ = Ember.$,
			skill = $(evt.target).attr('name'),
			srcEl = evt.target.localName;

		if ( srcEl === "input" ) {
			this.get('controller').send('checked', skill);
		}
	}
});
