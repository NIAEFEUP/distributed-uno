var turn=0;

function Card(color,value) {
	this.color = color;
	this.value = value;
	if (value=="stop") {
		this.value="<i class='icon-blocked'></i>";
	}
	else if (value=="reverse") {
		this.value="<i class='icon-loop'></i>";
	}
}

Card.prototype.render = function() {
	$("#cardPile").html(
		'<div class="card '+this.color+'">' +
		'<div class="cardsmall cardtop">' +
		this.value +
		'</div>' +
		'<div class="cardbody">' +
		this.value +
		'</div>' +
		'<div class="cardsmall cardbot">' +
		this.value +
		'</div>' +
		'</div>');
}

function updatePileSize(size) {
	$("#pileSize").html(size);
	if (size==0) {$("#cardPile").html("");}
}

function recieveCard(color,value) {
	(new Card(color,value)).render();
}

function update() {
	$.getJSON("getGameStatus", function(data) {
		console.log(data);
		if (data.turn!=turn) {
			recieveCard(data.cardColor,data.cardValue);
			updatePileSize(data.pileSize);
		}
		setTimeout(update,1000);
	});
}

update();