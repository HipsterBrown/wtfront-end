var AnswerModel = DS.Model.extend({
	user: DS.attr('string'),
	avatar: DS.attr('string'),
	content: DS.attr('string'),
	answeredAt: DS.attr('date'),
	skills: DS.hasMany('skill', {async: true})
});

export default AnswerModel;
