//delay loading javascript until the page is loaded 
document.addEventListener("DOMContentLoaded", nimMain, false);

function nimMain() {
	
	// variables for game control
	var maxSelect = 3;
	var pickAny = false;
	var startPlayer = "plyr1";

	// set the player button controls - initial state is disabled
	document.getElementById("plyr1_btn").disabled = true;
	document.getElementById("plyr2_btn").disabled = true;
	
	// set the action for the Start Game button
	document.getElementById("start").addEventListener("click", function() {
		// retrieve and reset game variables
		maxSelect = document.getElementById("maxNum").value;
		pickAny = document.getElementById("pickAny").checked;
		
		// set the rock piles up
		for (var p=1; p<4; p++) {
			var numRocks = document.getElementById("numRock"+p).value;
			var divPile = document.getElementById("pile"+p);
			var rockPile = divPile.getElementsByTagName("img");
			for ( var i = 0; i < numRocks; i++ ) {
				var img = document.createElement("img");
				img.setAttribute("src", "images/rock.png");
				img.setAttribute("width", "80px");
				img.setAttribute("height", "50px");
				img.setAttribute("class", "rockUnsel");
				img.addEventListener("click", function() {
					toggleSelectRock(this);
				});
				divPile.appendChild(img);
			}
		}
		// disable game set areas and enable first player button
		this.disabled = true;
		document.getElementById("gameSet").className = "hideSetup";
		document.getElementById("setRocks").className = "hideSetup";
		document.getElementById("plyr1_btn").disabled = false;
	});
	
	function toggleSelectRock( rockImg ) {
		if (rockImg.className == "rockSel") {
			rockImg.className = "rockUnsel";
		} else if (rockImg.className == "rockUnsel") {
			// check the value of pickAny
			if (pickAny==true) {
				// be sure it doesn't exceed maximum
				var numRocks = document.getElementsByClassName("rockSel").length;
				if (numRocks < maxSelect) {
					rockImg.className = "rockSel";
				}
			} else {
				// toggle only the rocks in the same division - otherwise they can't be set
				var parDiv = rockImg.parentElement.id;
				var allDivs = document.getElementsByClassName("piles");
				for (var i=0; i < allDivs.length; i++) {
					if (allDivs[i].id == parDiv) {
						// be sure it doesn't exceed max selectable
						var numRocks = allDivs[i].getElementsByClassName("rockSel").length;
						if (numRocks < maxSelect) {
							rockImg.className = "rockSel" ;
						} 
					} else {
						var turnRocks = allDivs[i].getElementsByClassName("rockSel");
						var numRocks = turnRocks.length;
						for (var j=0; j < numRocks; j++) {
							turnRocks[0].className = "rockUnsel";
						}
					}
				}				
			} 
		}
	}
	
	// set the removal of rocks event for both buttons
	document.getElementById("plyr1_btn").addEventListener("click", function() {
		pickRocks("Player1");
	});
	document.getElementById("plyr2_btn").addEventListener("click", function() {
		pickRocks("Player2");
	});
	
	function pickRocks( playerNum ) {
		var totalRocks = 0;
		var selectedRocks = 0;
		var allDivs = document.getElementsByClassName("piles");
		for (var i=0; i < allDivs.length; i++) {
			var pickRocks = allDivs[i].getElementsByClassName("rockSel");
			var numRocks = pickRocks.length;
			selectedRocks += numRocks;
			for (var j=0; j < numRocks; j++) {
					allDivs[i].removeChild(pickRocks[0]);
			}
			
			var remRocks = allDivs[i].getElementsByClassName("rockUnsel");
			totalRocks += remRocks.length;
		}
		if (selectedRocks==0) {
			// Player didn't pick
		} else if (totalRocks==0) {
			// Player wins
		} else {
			// switch to other player
			if (playerNum == "Player1") {
				document.getElementById("plyr1_btn").disabled = true;
				document.getElementById("plyr1_btn").innerHTML = "Waiting";
				document.getElementById("plyr2_btn").disabled = false;
				document.getElementById("plyr2_btn").innerHTML = "Select";
			} else {
				document.getElementById("plyr2_btn").disabled = true;
				document.getElementById("plyr2_btn").innerHTML = "Waiting";
				document.getElementById("plyr1_btn").disabled = false;
				document.getElementById("plyr1_btn").innerHTML = "Select";
			}
			
		}
	}
	

}