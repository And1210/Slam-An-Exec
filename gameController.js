function gameController() {
	this.possibleX = [0.26, 0.25, 0.23, 0.43, 0.42, 0.41, 0.58, 0.59, 0.60, 0.74, 0.75, 0.76];
	this.possibleY = [0.35, 0.56, 0.80];

	this.time = 60;
	this.timeTimer = millis();
	this.score = 0;
	this.active = false;
	this.gameOver = false;

	this.lastPopup = 0;
	this.popupInterval = 500;
	this.popUps = [];
	this.slammed = false;

	this.restart = function() {
		this.reset();
		this.active = true;
	}

	this.reset = function() {
		this.time = 60;
		this.timeTimer = millis();
		this.gameOver = false;
		this.popUps = [];
		this.slammed = false;
		this.lastPopup = 0;
		this.score = 0;
	}

	this.update = function() {
		var toRemove = [];
		imageMode(CENTER);
		for (var i = 0; i < this.popUps.length; i++) {
			var popUp = this.popUps[i];
			var anim = popUp.animator;
			if (anim.active == false) {
				toRemove.push(i)
			} else {
				anim.animate(popUp.x, popUp.y);
				if (this.slammed.finished) {
					if (this.slammed.x > popUp.x - 0.35*width && this.slammed.x < popUp.x + 0.35*width) {
						if (this.slammed.y > popUp.y + 0.03*height && this.slammed.y < popUp.y + 0.1*height) {
							toRemove.push(i);
							this.score += 100;
						}
					}
				}
			}
		}
		imageMode(CORNER);
		for (var i = toRemove.length-1; i >= 0; i--) {
			this.popUps.splice(toRemove[i], 1);
		}

		if (this.active) {
			if (millis() - this.lastPopup > this.popupInterval) {
				this.triggerPopup();
				this.lastPopup = millis();
			}

			if (millis() - this.timeTimer > 1000) {
				this.time--;
				this.timeTimer = millis();
				if (this.time <= 0) {
					this.active = false;
					this.gameOver = true;
				}
			}
		}

		this.slammed = jacket.animate(mouseX-jacketW/2, mouseY);

		stroke(255);
		fill(255);
		textAlign(CENTER, CENTER);
		text(this.time, 0.25*width, 0.1*height);
		textAlign(RIGHT, CENTER);
		text(this.score, 0.8*width, 0.1*height);

		if (this.gameOver) {
			textAlign(CENTER, CENTER);
			textSize(30);//textFont(font, 30);
			text("GAME OVER", width/2, height/2);
			textSize(18);//textFont(font, 18);

			if (mouseIsPressed) {
				this.restart();
			}
		}
	}

	this.triggerPopup = function() {
		var i = Math.floor(random(0, 3));
		var iPrime = Math.floor(random(0, 4));
		var x = this.possibleX[i + 3*iPrime] * width;
		var y = this.possibleY[i] * height;
		this.popUps.push({
			animator: new animator("popup", 1000, 10),
			x: x,
			y: y
		})
	}
}
