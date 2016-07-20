app.config(function($routeProvider) {

	$routeProvider.when('/', {
		templateUrl : 'views/login.html',
		controller : 'LoginCtrl',
	}).when('/home', {
		templateUrl : 'views/home.html',
		controller  : 'HomeCtrl',
		resolve: {
	    // controller will not be loaded until $requireSignIn resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["Auth", function(Auth) {
        // $requireSignIn returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return Auth.$requireSignIn();
    }]
}
});

});