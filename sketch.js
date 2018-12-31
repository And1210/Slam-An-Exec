const jacketW = 65, jacketH = 50;

var menus = true;

var imageHandler;
var jacket;
var game;
var font;

var names = ["alex", "andrew", "vasila", "aya", "chas", "christina", "emily", "graeme", "mackenzie", "matt", "mia", "mitch", "thomas", "ben"]

function preload() {
	// font = loadFont("");
}

function setup() {
	createCanvas(550, 400);

	textSize(18);// textFont(font, 18);
	textAlign(CENTER, CENTER);

	imageHandler = new imageHandler();
	imageHandler.loadImage("bg.jpg", "bg");
	imageHandler.resizeImage("bg", width, height);
	imageHandler.loadImage("gpa_back.png", "gpa0");
	imageHandler.resizeImage("gpa0", jacketW, jacketH);
	imageHandler.loadImage("gpa_front.png", "gpa1");
	imageHandler.resizeImage("gpa1", jacketW, jacketH);

	for (name of names) {
		imageHandler.loadImage("" + name + ".png", name);
		imageHandler.resizeImage(name, jacketW*3/4, jacketH*3/4);
	}

	jacket = new animator("slam", 200, 20);

	game = new gameController();
	game.restart();

	background(255);
}

function draw() {
	background(255);
	imageHandler.drawImage("bg", 0, 0);

	if (!menus) {
		game.update();
	} else {
		stroke(255);
		fill(255);
		textSize(30);//textFont(font, 30);
		text("SLAM-AN-EXEC", width/2, height/2 - 20);
		textSize(20);//textFont(font, 20);
		text("Click To Play", width/2, height/2 + 20);
		textSize(18);//textFont(font, 18);
		stroke(0);
		fill(0);

		if (mouseIsPressed)
			menus = false;
	}
}

function mousePressed() {
	jacket.active = true;
}
