	/*
App Name 	: Trending Last 30 days Repository 	-->
Author 		: Amine EL YOUBI					-->
Created 	: 22/July/2020 						-->
Last Modif	: NaN 								-->
Scope 		: Front End Challenge				-->
File 		: assets/jscript.js					-->
*/

// Description of section : Declaration of variables var add = '';
var add = '';
var name = '';
var score = '';
var desc = '';
var issues = '';

// Description of section : Implementation of the main function responsible for adding repo elements
function AddElement(name, owner, description, score, issues){
					add += 	'<div id="repository">';
					add += 	'<div id="owner">';					
					add += 	owner + '</div>';
					add += 	'<div id="description">';
					add += 	'<h2 id="repoName">'+ name +'</h2>';
					add += 	'<p id="repoDescription">'+desc+'</p>';
					add += 	'<ul id="list">';
					add += 	'<li id="Issues"> Issues :'+issues+'</li>';
					add += 	'<li id="score"> Score :'+score+'</li>';
					add += 	'<li>Submitted 30 days ago by '+name+'</li>';
					add += 	'</ul>';
					add += 	'</div>';
					add += 	'</div>';
					$('#container').append(add);
}

// Description of section : Implementation of the main function responsible for adding repo elements
function showElements(link){
	$.getJSON(link, function(data){
			$.each(data, function(key, value){
				if(key == 'items'){
					$.each(data['items'], function(k, v){
					$.each(v, function(k1, v1){
						if(k1 == "owner"){
							$.each(v1, function(k2, v2){
							if(k2 == "login"){
								owner = v2;
							}
							});
						}
						else if(k1 =="name"){
							name = v1;
							}
						else if (k1 == "score"){
							score = v1;
						}
						else if (k1 == "description"){
							desc = v1;
						}
						else if (k1 == "open_issues"){
							issues = v1;
						}	
					});
					AddElement(name, owner, desc, score, issues);
				});
				}	
			});
		});
}

// Description of section : Process when the page is ready
$(document).ready(function(){
		// Get Json data for external (http)
			var link1 = "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc";
			var link2 = "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=2";
			var link3 = "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=3";		

			showElements(link1);	
			$('#page2').on('click',function(){

					$('#container').empty();
					showElements(link2);	
			});
			$('#page3').on('click',function(){
					$('#container').empty();
					showElements(link3);	
			});
});