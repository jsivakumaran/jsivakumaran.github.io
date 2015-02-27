slackerNews.factory("LinkFactory", ['$firebase', function LinkFactory($firebase) {
  var factory = {};

  var ref = new Firebase("https://glaring-inferno-5851.firebaseio.com/links");
  // create an AngularFire reference to the data
  var links = $firebase(ref).$asArray();
  // synchronize the object with a three-way data binding
  factory.links = links;


factory.login = function(){
  ref.authWithOAuthPopup("google", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
    }
  });
}

  factory.addLink = function() {
    factory.links.$add({ title: factory.title,
      link: factory.link,
      id: factory.links.length + 1,
      upvotes: 0,
      rankVal: 3.1415936,
      comments: {count: 0},
      date: Date.now()
    });
    links.$loaded().then(factory.rank());
  };

  factory.upvote = function(link) {
    link.upvotes++;
    factory.rank();
  };

  factory.timeElapsed = function(date){
    var date_string = "";
    var millisec =  Date.now() - date;
    var days = Math.floor(millisec / 86400000);
    var hours = Math.floor((millisec % 86400000)/3600000);
    var minutes = Math.floor(((millisec % 86400000)%3600000)/60000);
    if (days !== 0){
      date_string += days + " days ";
    }
    if(hours !==0){
      date_string += hours +" hours ";
    }

    return date_string += minutes + " minute(s) ago";
  };

  factory.rank = function() {
    var totalUpvotes=0;
    var highId = 0;
    factory.links.forEach(function(link){
      totalUpvotes += link.upvotes;
      if (link.id > highId) {
        highId = link.id;
      }
    });
    var idMultiplier = 100 / highId;
    var upvoteMultiplier = 100 / (totalUpvotes + 1);
    factory.links.forEach(function(link) {
      link.rankVal = link.id * idMultiplier * 0.20
        + link.upvotes * upvoteMultiplier * 0.80;
      factory.links.$save(link);
    });
  };

  factory.addComment = function(link, comment){
    var newCount = link.comments.count + 1
    link.comments.count = newCount
    link.comments[newCount] = comment

    factory.links.$save(link);
  }

  return factory;
}]);
