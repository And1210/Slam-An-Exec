function animator(name, time, speed) {
	this.animation = name;
	this.frame = 0;
	this.speed = speed;
	this.frameNum = int(time/speed);

	this.lastUpdate = 0;
	this.active = false;

	this.person = random(names);

	switch(this.animation) {
		case "slam":
			break;
		case "popup":
			this.active = true;
			break;
		default:
			console.log("Unrecognized animation name.");
			break;
	}

	this.animate = function(x, y) {
		switch(this.animation) {
			case "slam":
				imageHandler.drawImageObj(this.slam(), x, y);
				var out = {
					finished: this.frame == this.frameNum - 1,
					x: x,
					y: y
				}
				return out;
				break;
			case "popup":
				var popUp = this.popUp(x, y);
				imageHandler.drawImageObj(popUp.imgObj, popUp.x, popUp.y);
				// imageHandler.drawImageObjSpec(popUp.imgObj, popUp.x, popUp.y, 0, 0, popUp.imgObj.initWidth, popUp.cYOut);
				break;
			default:
				console.log("Unrecognized animation name.");
				break;
		}
	}

	this.slam = function() {
		var img0 = imageHandler.getImage("gpa0");
		var img1 = imageHandler.getImage("gpa1");
		if (!this.active) return img0;

		var initW = img0.initWidth;
		var initH = img0.initHeight;

		if (millis() - this.lastUpdate > this.speed) {
			this.frame++;
			if (this.frame >= this.frameNum) {
				this.active = false;
				this.frame = 0;
				img0.resize(initW, initH);
				return img0;
			}

			this.lastUpdate = millis();
		}

		var use0 = true;
		if (this.frame >= this.frameNum / 2) {
			use0 = false;
			initW = img1.initWidth;
			initH = img1.initHeight;
		}

		if (use0) {
			img0.resize(initW, initH * (1-(this.frame+1) / (this.frameNum/2)));
			return img0;
		} else {
			img1.resize(initW, -initH * ((this.frame+1) / (this.frameNum/2) - 1));
			return img1;
		}
	}

	this.popUp = function(x, y) {
		var img = imageHandler.getImage(this.person);

		if (millis() - this.lastUpdate > this.speed) {
			this.frame++;
			if (this.frame >= this.frameNum) {
				this.active = false;
			}
		}

		var xOut = x;
		var yOut = y;
		// var yOut = map(this.frame, 0, this.frameNum, y + 0.05*width, y);
		// var cYOut = map(this.frame, 0, this.frameNum, 0, img.initHeight);

		var out = {
			imgObj: img,
			x: xOut,
			y: yOut
		}
		return out;
	}
}
