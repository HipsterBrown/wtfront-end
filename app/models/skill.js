export default DS.Model.extend({
	name: DS.attr('string'),
	user: DS.belongsTo('answer')	
});
