var ApplicationAdapter = DS.FirebaseAdapter.extend({
  firebase: new Firebase("https://wtfront-end-dev.firebaseio.com")
});

export default ApplicationAdapter;
