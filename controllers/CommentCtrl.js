slackerNews.controller('CommentCtrl', ['$scope','$state','$stateParams', 'LinkFactory', 'UtilityFactory',
function CommentCtrl($scope, $state, $stateParams, LinkFactory, UtilityFactory){

  $scope.links = LinkFactory.links;
  $scope.LinkFactory = LinkFactory;
  $scope.link = UtilityFactory.findById(LinkFactory.links, $stateParams.linkId);

  $scope.addThenHome = function(link){
    LinkFactory.addComment(link);
    $state.go('newsList');
  }


}]);
