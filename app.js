var GeoJSON = Backbone.Model.extend({});

var GeoJSONList = Backbone.Collection.extend({
	model: GeoJSON
});

<<<<<<< HEAD
=======
var AppRouter = Backbone.Router.extend({
	routes: {
		":username" : "getUser"
	}
});

>>>>>>> gh-pages
var Repo = Backbone.Model.extend({});
var UsersRepos = Backbone.Collection.extend({
	model: Repo,
	initialize: function(models, options){
		this.user = options.user;
	},
	fetch: function(){
		var self = this;
		CORSRequest('https://api.github.com/users/' + self.user + '/repos', function(response){
			var usersRepos = [];
		    for(var i = 0; i < response.length; i++){
		      if(!response[i].fork) usersRepos.push(response[i]);
		    }
			self.add(usersRepos);
			for(var i = 0; i < usersRepos.length; i++){
				var reposProcessed = 0;
				var numRepos = usersRepos.length;
				var repo = usersRepos[i].name;
<<<<<<< HEAD
				listGeoJSONsInRepo(self.user, usersRepos[i].name, function(GeoJSONs, repo){
					var repoModel = self.findWhere({name: repo});
					if(GeoJSONs.length === 0) self.remove(repoModel);
					else {
						var collection = new GeoJSONList([]);
						collection.add(GeoJSONs);
						repoModel.set('GeoJSONs', collection);
					}
					reposProcessed++;
					if(reposProcessed == numRepos) {
						self.trigger('loaded');
						foo =  user.pluck("GeoJSONs");
					}
				})
=======

				getSHAforRepo(self.user, usersRepos[i].name, function(repo, response){
					var masterRepo;
					for(var i = 0; i < response.length; i++){
						if(response[i].ref == "refs/heads/master") {
							masterRepo = true;
							listGeoJSONsInRepo(self.user, repo, response[i].object.sha, function(GeoJSONs, repo){
								var repoModel = self.findWhere({name: repo});
								if(GeoJSONs.length === 0) self.remove(repoModel);
								else {
									var collection = new GeoJSONList([]);
									collection.add(GeoJSONs);
									repoModel.set('GeoJSONs', collection);
								}
								reposProcessed++;
								if(reposProcessed == numRepos) {
									self.trigger('loaded');
								}
							})
						}
					}
					if(!masterRepo){
						listGeoJSONsInRepo(self.user, repo, response[0].object.sha, function(GeoJSONs, repo){
								var repoModel = self.findWhere({name: repo});
								if(GeoJSONs.length === 0) self.remove(repoModel);
								else {
									var collection = new GeoJSONList([]);
									collection.add(GeoJSONs);
									repoModel.set('GeoJSONs', collection);
								}
								reposProcessed++;
								if(reposProcessed == numRepos) {
									self.trigger('loaded');
								}
							})
					}
				})	
>>>>>>> gh-pages
			}
		})
	}
});

var GeojsonIFrame = Backbone.View.extend({
	el: '#map',
	render: function(GeoJSON){
		$('#map').html('<iframe id="ifrm" src="https://render.github.com/view/geojson?url=' + GeoJSON.get('raw') + '"> </iframe>');
	}
})


var UserInfoView = Backbone.View.extend({
	initialize: function(){
		this.template = Handlebars.compile($('#UserViewTemplate').html());
<<<<<<< HEAD
=======
		this.tweetTemplate = Handlebars.compile($('#TweetTemplate').html());
>>>>>>> gh-pages
		this.listenTo(this.collection, 'loaded', this.render);
	},
	render: function(){
		var self = this;
		templateData = {
			user: this.collection.user,
			numGeoJSONs: 0,
			GeoJSONs: this.collection.pluck('GeoJSONs')
		};
		for(var i = 0; i < this.collection.length; i++){
			templateData.numGeoJSONs += this.collection.at(i).get('GeoJSONs').length;
		}
<<<<<<< HEAD
		$('#userInfo').html(this.template(templateData));
		$('.geojson_link').click(function(){
			var rawURL = $(this).attr('ghraw');
			var GeoJsonModel;
			console.log(rawURL);
=======
		if(templateData.numGeoJSONs == 1) templateData.equalToOne = true;
		if(templateData.numGeoJSONs > 1)  templateData.greaterThanOne = true;
		if(templateData.numGeoJSONs == 0) templateData.equalToZero = true;
		for(var i = 0; i < templateData.GeoJSONs.length; i++) {
			for(var k = 0; k < templateData.GeoJSONs[i].models.length; k++) {
				// console.log(templateData.GeoJSONs[i].models[k].attributes.size);
				if(templateData.GeoJSONs[i].models[k].attributes.size > 10000000) {
					templateData.GeoJSONs[i].models[k].attributes.over10mb = true;
				 }
			}
		}	
		$('#userSearchDiv').empty();
		$('#userInfo').html(this.template(templateData));
		if(!templateData.equalToZero) $('#map').html("<div id='mapHelp'> Click a file to show it's map </div>")
		$('#tweetDiv').html(this.tweetTemplate(templateData));
		$('.geojson_link').click(function(){
			var rawURL = $(this).attr('ghraw');
			var GeoJsonModel;
>>>>>>> gh-pages
			for(var i = 0; i < templateData.GeoJSONs.length; i++){
				var temp = templateData.GeoJSONs[i].findWhere({raw: $(this).attr('ghraw')});
				if(temp) GeoJsonModel = temp;
			}
			mapIFrame.render(GeoJsonModel);
		})
	}
});

var UserSearchView = Backbone.View.extend({
<<<<<<< HEAD
	el: '#userInfo',
=======
	el: '#userSearchDiv',
>>>>>>> gh-pages
	initialize: function(){
		this.template = Handlebars.compile($('#UserSearchTemplate').html());

	},
	render: function(){
<<<<<<< HEAD
		$('#userInfo').html(this.template());
		$('#UserSearchForm').submit(function(e) {   
			var user = new UsersRepos([],{user: $("#GHUserNameSearch").val()});
    		user.fetch(); 
        	var userView = new UserInfoView({collection: user});
        	$('#userInfo').html('loading..');
		  	e.preventDefault(); 
=======
		$(this.el).html(this.template());
		$('#UserSearchForm').submit(function(e) {
			var username = $("#GHUserNameSearch").val();
			var user = new UsersRepos([],{user: username});
    		user.fetch(); 
        	var userView = new UserInfoView({collection: user});
        	$('#usersearch').html('loading..');
		  	e.preventDefault(); 
		  	document.location.hash = username;
>>>>>>> gh-pages
		});
	}
})

<<<<<<< HEAD

function listGeoJSONsInRepo(user, repo, callback){
  var url = 'https://api.github.com/repos/' + user + '/' + repo + '/contents/';
  CORSRequest(url, function(response){
    var extension = '.geojson';
    var regEx = new RegExp('\\b' + extension + '\\b');
    var GeoJSONs = [];
    for(var i =0; i < response.length; i++){
      if(regEx.test(response[i].name)) { 
      	GeoJSONs.push({path: response[i].path, size: response[i].size, raw: 'https://raw.github.com/'+ user + '/' + repo + '/master/' + response[i].path + '/' });
      }
    }
    // console.log(GeoJSONs);
=======
var app_router = new AppRouter;
app_router.on('route:getUser', function(username){
	$(document).ready(function(){   
		var user = new UsersRepos([],{user: username});
	    user.fetch(); 
	    var userView = new UserInfoView({collection: user});
	    $('#usersearch').html('<span class="loading"> loading.. </span>');
	 });
});

Backbone.history.start();

function listGeoJSONsInRepo(user, repo, sha, callback){
  var url = 'https://api.github.com/repos/' + user + '/' + repo + '/git/trees/' + sha + '?recursive=1';
  CORSRequest(url, function(response){
    var regEx = new RegExp('^.*\.(geojson|topojson|GEOJSON|TOPOJSON)$'); 
    var GeoJSONs = [];
    for(var i =0; i < response.tree.length; i++){
      if(regEx.test(response.tree[i].path)) { 
      	var name = response.tree[i].path.replace(new RegExp('[^\"]+/'), '');
      	GeoJSONs.push({
      		path: response.tree[i].path, 
      		name: name, 
      		size: response.tree[i].size, 
      		raw: 'https://raw.github.com/'+ user + '/' + repo + '/master/' + response.tree[i].path + '/',
      		blob: 'https://www.github.com/' + user + '/' + repo + '/blob/master/' + response.tree[i].path + '/'
      		});
      }
    }
>>>>>>> gh-pages
    if(callback) callback(GeoJSONs, repo);
  })
}

<<<<<<< HEAD
=======
function getSHAforRepo(user, repo, callback){
	var url = "https://api.github.com/repos/" + user + "/" + repo + "/git/refs";
	CORSRequest(url, function(response){
		callback(repo, response);
	})
}
>>>>>>> gh-pages
function CORSRequest(url, callback, header){
  var createCORSRequest = function(method, url) {
      var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      // Most browsers.
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
      // IE8 & IE9
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      // CORS not supported.
      xhr = null;
     }
    return xhr;
  };

  var xhr = createCORSRequest('GET', url);

  xhr.onreadystatechange = function() {
   if (xhr.readyState != 4)  { return; }
   var serverResponse = JSON.parse(xhr.responseText);
   callback(serverResponse);
  };

  xhr.onerror = function() {
    console.log('Error!')
  };
  xhr.setRequestHeader('Accept', 'application/vnd.github.v3.raw+json');
  xhr.setRequestHeader('Authorization', 'token 43c3a3e7af262b88906dfd07418f46f934718791');
  xhr.send();
<<<<<<< HEAD
}
=======
}

//Twitter tweet button javascript
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
>>>>>>> gh-pages
