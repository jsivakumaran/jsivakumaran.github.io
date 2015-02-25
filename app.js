var slackerNews = angular.module('slackerNews', ['ui.router', 'firebase']);

slackerNews.config(function($stateProvider) {

  $stateProvider.state('newsList', {
    url: "",
    templateUrl: "partials/newsList.html"
  });

  $stateProvider.state('addContent', {
    url: "/add",
    templateUrl: "partials/addContent.html"
  });


});
