var ApplicationAdapter = DS.FirebaseAdapter.extend({
  firebase: new window.Firebase("https://wtfront-end-dev.firebaseio.com")
});

export default ApplicationAdapter;
