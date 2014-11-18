console.log("loaded: contest services");

'use strict'

angular
	.module('yote')

	.factory('ContestFactory', ['$http', '$rootScope', '$q', function($http, $rootScope, $q) {
		
		var urlBase = "/api/contest";
		var ContestFactory = {};

		ContestFactory.create = function(postData) {
			console.log("Creating a new contest");
			var deferred = $q.defer(postData);
			$http.post(urlBase, postData)
				.success(function(contest) {
					console.log("SUCCESS!")
					deferred.resolve(contest)
				})
			return deferred.promise;
		}

		ContestFactory.edit = function(postData) {
			console.log("Edit contest");
			var deferred = $q.defer(postData);
			$http.put(urlBase, postData)
				.success(function(contest) {
					console.log("SUCCESS!")
					deferred.resolve(contest)
				})
			return deferred.promise;
		}

		ContestFactory.deleteContest = function(_id) {
			console.log("Deleting contest");
			var deferred = $q.defer();
			$http.delete(urlBase + "/" + _id)
				.success(function(contest) {
					console.log("SUCCESS!")
					deferred.resolve(contest)
				})
			return deferred.promise;
		}

		ContestFactory.getContestByString = function(str) {
			console.log("Getting contests by string");
			var deferred = $q.defer();
			$http.get(urlBase + "/byString/" + str)
				.success(function(contest) {
					console.log("SUCCESS!")
					deferred.resolve(contest)
				})
			return deferred.promise;				
		}

		ContestFactory.getContestsByOwner = function() {
			console.log("Getting contests by owner");
			var deferred = $q.defer();
			$http.get(urlBase + "/byOwner/" + $rootScope.currentUser._id)
				.success(function(contest) {
					console.log("SUCCESS!")
					deferred.resolve(contest)
				})
			return deferred.promise;			
		}

		ContestFactory.getContestById = function(id) {
			console.log("Getting contest by id");
			var deferred = $q.defer();
			$http.get(urlBase + "/byId/" + id)
				.success(function(response) {
					console.log("SUCCESS!")
					deferred.resolve(response)
				})
			return deferred.promise;			
		}

		ContestFactory.uploadBanner = function(id) {
			console.log("uploading banner");
			var deferred = $q.defer();
			$http.post(urlBase + "/banner")
				.success(function(response) {
					console.log("SUCCESS!")
					deferred.resolve(response)
				})
			return deferred.promise;			
		}

		ContestFactory.getCompeteStateByUser = function(contestId, userId) {
			console.log("getting compete state by user");
			var deferred = $q.defer();
			$http.get(urlBase + "/byId/" + contestId)
				.success(function(response) {
					console.log("SUCCESS!");
					deferred.resolve("can");
				})
			return deferred.promise;			
		}

		ContestFactory.getJudgeStateByUser = function(contestId, userId) {
			console.log("getting judge state by user");
			var deferred = $q.defer();
			$http.get(urlBase + "/byId/" + contestId)
				.success(function(response) {
					console.log("SUCCESS!");
					deferred.resolve("can");
				})
			return deferred.promise;			
		}

		return ContestFactory;
	}])
	;
