// let's create a re-usable factory that generates the $firebaseAuth instance
app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
  ]);

app.controller("LoginCtrl", ["$scope", "Auth","$location",
  function($scope, Auth, $location) {
    var auth = Auth;

    $scope.signIn = function() {
      $scope.firebaseUser = null;
      $scope.error = null;
      var email = $scope.user.email;
      var password = $scope.user.password;

      auth.$signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
        console.log("Signed in as:", firebaseUser.email);
        $location.path('/home');
      }).catch(function(error) {
        console.error("Authentication failed:", error);
      });
    }
  }]);

app.controller("HomeCtrl", ["$scope", "Auth","$location",
  function($scope, Auth, $location) {
    $scope.auth = Auth;
    var auth = Auth;

    // any time auth state changes, add the user data to scope
    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
      $scope.firebaseUser = firebaseUser;
    });

    $scope.SignOut = function(){
      auth.$signOut();
      $location.path('/');
    }

  }]);