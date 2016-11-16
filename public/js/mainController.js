(function(){
  angular.module('concert')
  .controller('MainCtrl', MainCtrl);

  function MainCtrl($http, $state, $stateParams){
    var self = this;
    var rootUrl = "http://localhost:3000";

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
          console.log('User registration successful');
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

  // this.login = function(user) {
  //   return $http ({
  //     url: `${rootUrl}/users/login`,
  //     method: 'POST',
  //     data: {user: user}
  //   })
  //   .then(function(response){
  //     if (response.data.status == 401) {
  //       failAlert('Unauthorized! Check your username and password!')
  //       self.user.password = '',
  //     }
  //     console.log(response);
  //     passAlert('<strong>Success!</strong> Hi there, ' + response.data.user.username + '.')
  //     self.user = response.data.user;
  //     self.id = response.data.user.id;
  //     console.log('Token ~>', response.data.token);
  //     localStorage.setItem('token', JSON.stringify(response.data.token))
  //     $state.go('profile', {url:'/profile', user: response.data.user})
  //   })
  //   .catch(function(err) {
  //     console.log(err);
  //   })
  // }

  $http.get(`${rootUrl}/users`)
  .then(function(response) {
    console.log(response);
    self.users = response.data.users
  })


  } //end
})()
