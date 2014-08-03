var PostAnswerComponent = Ember.Component.extend({
  /*init: function() {
	  var answer = this,
		store = this.get('store'),
		skillA = this.get('skillsA');
	  
	  Ember.RSVP.Promise.cast(answer.get('skills')).then(function(skills) {
		 window.console.log(skills, skills.content.length);

		 skills.content.forEach(function(skill) {
			var skillName = store.find('skill', skill.id);

			window.console.log(skillName);
		 });
	  });
  },*/
  tagName: 'article',
  classNames: ['answer', 'card', 'container', 'thin'],
  skillsA: []
});

export default PostAnswerComponent;
