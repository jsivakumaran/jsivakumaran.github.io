slackerNews.factory("LinkFactory", ['$firebase', function LinkFactory($firebase) {
  var factory = {};

  var ref = new Firebase("https://glaring-inferno-5851.firebaseio.com/links");
  // create an AngularFire reference to the data
  var sync = $firebase(ref);
  var syncArray = sync.$asArray();
  // synchronize the object with a three-way data binding
  factory.links = syncArray;

  factory.addLink = function() {
    factory.links.$add({ title: factory.title,
      link: factory.link,
      id: factory.links.length + 1,
      upvotes: 0,
      rankVal: 0
    });
  };

  factory.upvote = function(link) {
    link.upvotes++;
    factory.rank();
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
    var upvoteMultiplier = 100 / totalUpvotes;
    factory.links.forEach(function(link) {
      link.rankVal = link.id * idMultiplier * 0.20
        + link.upvotes * upvoteMultiplier * 0.80;
    });
    factory.links.$save();
  };

  return factory;
}]);
