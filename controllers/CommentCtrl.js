slackerNews.controller('CommentCtrl', ['$scope','$state','$stateParams','$firebase', 'LinkFactory', 'UtilityFactory',
function CommentCtrl($scope, $state, $stateParams, $firebase, LinkFactory, UtilityFactory){

  $scope.links = LinkFactory.links;
  $scope.LinkFactory = LinkFactory;
  $scope.link = UtilityFactory.findById(LinkFactory.links, $stateParams.linkId);

  $scope.addComment = function() {
    LinkFactory.addComment($scope.link,$scope.comment)
  };


}]);
