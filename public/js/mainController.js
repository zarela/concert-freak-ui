(function(){
  angular.module('concert')
  .controller('MainCtrl', MainCtrl);

  function MainCtrl($http, $state, $scope){
    var self = this;
    var rootUrl = "http://localhost:3000";
    // var rootUrl = "https://concert-freak-api.herokuapp.com";

    //USER SIGNUP
    this.signup = function(user) {
      console.log(user);
      self.signed = user;
      return $http({
        url:  `${rootUrl}/users`,
        method: 'POST',
        data: {user:user}
      })
      .then(function(response) {
        console.log(response);
        if (response.data.status === 200) {
          console.log('User Registration Successful');
          self.sucess = true;
          self.login(self.signed);
        }
        else {
          console.log(response)
          if (response.data.user.email) {
            failAlert('Registration failed. Email ' + response.data.user.email[0]);
          } else if (response.data.user.username) {
            failAlert('Registration failed '+ response.data.user.username[0]);
          }
        }

      })
      .catch(function(err) {
        console.log(err);
      })
    }

    //ALL USERS
    $http.get(`${rootUrl}/users`)
    .then(function(response) {
      console.log(response);
      self.users = response.data.users
    })

    //USER LOGIN
    this.login = function(user) {
      return $http({
        url: `${rootUrl}/users/login`,
        method: 'POST',
        data: {user: user}
      })
      .then(function(response){
        console.log(response);
        self.user = response.data.user
        self.id = response.data.user.id
        console.log('Token ~>', response.data.token);
        localStorage.setItem('token', JSON.stringify(response.data.token))
        localStorage.setItem('user', JSON.stringify(response.data.user));
        //GETTING EVENTS OF INTEREST
        return $http.get(`${rootUrl}/users/${self.id}/interests`);
      })
      .then(function(data){
        self.myEvents = data;
        $state.go('user', {url:'/user', user: data.data.user});
        console.log(data);
      })
      .catch(function(err) {
        console.log(err);
      })
    }

    //USER LOGOUT
    this.logout = function(user){
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      $state.go('home', {url: '/'})
    } // end this.logout

    /*
      thid.addToMyInterests = function(id){

      // update Interests table on SERVER
      //something like POST to /users/:user_id/interests

      // update self.myInterests


    }
    */

    //SHOW ALL EVENTS
    $http.get(`${rootUrl}/events`)
    .then(function(response) {
        self.events = response.data;
        console.log(self.events);
        $state.go('events', {url:'/events', events: response.data});
    });

  } //end
})()
