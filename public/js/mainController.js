(function(){
  angular.module('concert')
  .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$http', '$state', '$scope'];

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
        //GETTING RSVP EVENTS
        // return $http.get(`${rootUrl}/users/${self.id}/rsvps`);
        return $http.get(`${rootUrl}/users`);
        // return $http.get(`${rootUrl}/events`); //********This works
      })
      .then(function(data){
        // self.myRsvpEvents = data;
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
    }

    //Adding RSVP
    this.addToMyRsvps = function(id){
      console.log("Hello from RSVP", id);
      localStorage.getItem('token');
      $http.post (`${rootUrl}/users/${self.id}/rsvps`, {rsvp: id})
      .then(function(response){
        console.log("From ADDING RSVPS", response);
      })
    }

    /*
      thid.addToMyInterests = function(id){

      // update Interests table on SERVER
      //something like POST to /users/:user_id/interests

      // update self.myInterests
    }
    */

    // EVENTS STATE
    //=============
    // SHOWING ALL THE EVENTS
    $http.get(`${rootUrl}/events`)
    // $http.get(`${rootUrl}/users/${self.id}/events`)
    .then(function(response) {
        self.events = response.data;
        console.log(self.events);
    });

    this.isCreating = false;
    this.isEditing = false;
    this.editedEvent = null;

    function startCreating(){
      this.isCreating = true;
      this.isEditing = false;
    }

    function startEditing(){
      this.isCreating = false;
      this.isEditing = true;
    }

    function setEventToEdit(event){
      this.editedEvent = event;
    }

    function reset(event){
      this.isCreating = false;
      this.isEditing = false;
    }

    //ADD A NEW EVENT
    function addEvent(newEvent){
      console.log(newEvent);
      $http.post(`${rootUrl}/events`, newEvent)
      // $http.post(`${rootUrl}/users/${user._id}/events`, newEvent)
      .then(function(response){
        console.log("Response", response);
        self.event = response.data.event;
        self.events.push(newEvent);
        //Clearing form ''
        console.log("Clearing form");
        self.newEvent ="";
        $state.go('events', {url:'events', events: response.data});
      })
      .catch(function(err){
        console.log(err)
      });
    }

   //DELETE EVENT
   function deleteEvent(id){
    console.log("Hello from id", id);
    $http.delete(`${rootUrl}/events/${id}`)
    .then(function(response){
      console.log(response);
      // self.events = response.data.events
      var indexToRemove = self.events.findIndex(function(element){
        return element.id=== id;
      });
      self.events.splice(indexToRemove, 1);
    })
  }

  //UPDATE EVENT
  function editEvent(event){
    // console.log('Hello from editing',event)
    $http.put(`${rootUrl}/events/${event.id}`, event)
    .then(function(response){
      console.log(response);
      // self.events = response.data.events;
      self.isEditing = false;
      $state.go('events');
    })
    .catch(function(err){
      console.log(err)
    });

  }

  //Public Methods
  //==============================
   this.startCreating = startCreating;
   this.addEvent = addEvent;
   this.deleteEvent = deleteEvent;
   this.startEditing = startEditing;
   this.setEventToEdit = setEventToEdit;
   this.editEvent = editEvent;
   this.reset = reset;

  } //end
})()
