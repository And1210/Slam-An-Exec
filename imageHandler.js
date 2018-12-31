function imageHandler() {
	this.images = [];

	this.loadImage = function(filename, name) {
		var img = loadImage(filename);
		this.images.push(new imageObj(img, name));
	}

	this.drawImage = function(name, x, y) {
		img = this.getImage(name);
		image(img.img, x, y, img.width, img.height);
	}

	this.drawImageObj = function(img, x, y) {
		image(img.img, x, y, img.width, img.height);
	}

	this.drawImageObjSpec = function(img, x, y, cx, cy, cw, ch) {
		image(img.img, x, y, cw, ch, cx, cy, cw, ch);
	}

	this.resizeImage = function(name, newW, newH) {
		img = this.getImage(name);
		img.resize(newW, newH);
		img.setInitialSize(newW, newH);
	}

	this.getImage = function(name) {
		var img = this.images.find(function(element) {
			return element.name == name;
		});
		return img;
	}

}

function imageObj(img, name) {
	this.img = img;
	this.name = name;

	this.initWidth = img.width;
	this.initHeight = img.height;
	this.width = img.width;
	this.height = img.height;

	this.setInitialSize = function(newW, newH) {
		this.initWidth = newW;
		this.initHeight = newH;
	}

	this.resize = function(newW, newH) {
		this.width = newW;
		this.height = newH;
		if (newW == 0)
			this.width = 1;
		if (newH == 0)
			this.height = 1;
	}
}
