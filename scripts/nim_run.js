//delay loading javascript until the page is loaded 
document.addEventListener("DOMContentLoaded", nimMain, false);

function nimMain() {
	
	// variables for game control
	var maxSelect = 3;
	var pickAny = false;
	var startPlayer = "Player1";

	// set the player button controls - initial state is disabled
	//document.getElementById("Player1_btn").disabled = true;
	//document.getElementById("Player2_btn").disabled = true;
	
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
				img.setAttribute("width", "72px");
				img.setAttribute("height", "45px");
				img.setAttribute("class", "rockUnsel");
				img.addEventListener("click", function() {
					toggleSelectRock(this);
				});
				divPile.appendChild(img);
			}
		}
		// disable game set areas and enable first player button
		var setDivs = document.getElementsByClassName("showSetup");
		var numDivs = setDivs.length;
		for (var i=0; i < numDivs; i++) {
			setDivs[0].className = "hideSetup";
		}
		document.getElementById(startPlayer).className = "active";
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
	document.getElementById("Player1_btn").addEventListener("click", function() {
		pickRocks("Player1");
	});
	document.getElementById("Player2_btn").addEventListener("click", function() {
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
			declareWinner(playerNum);
		} else {
			// switch to other player
			if (playerNum == "Player1") {
				document.getElementById("Player1").className = "inactive";
				document.getElementById("Player2").className = "active";
			} else {
				document.getElementById("Player1").className = "active";
				document.getElementById("Player2").className = "inactive";
			}
			
		}
	}
	
	function declareWinner( playerNum ) {
		// add a "counter" rock into their pile for keeping tabs
		var img = document.createElement("img");
		img.setAttribute("src", "images/rock.png");
		img.setAttribute("width", "40px");
		img.setAttribute("height", "25px");
		document.getElementById(playerNum).appendChild(img);
		// reset the game for next round
		document.getElementById("Player1").className = "inactive";
		document.getElementById("Player2").className = "inactive";
		if (playerNum == "Player1") {
			startPlayer = "Player2";
		} else {
			startPlayer = "Player1";
		}
		var setDivs = document.getElementsByClassName("hideSetup");
		var numDivs = setDivs.length;
		for (var i=0; i < numDivs; i++) {
			setDivs[0].className = "showSetup";
		}
	}

}