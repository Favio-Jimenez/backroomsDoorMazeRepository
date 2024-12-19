console.log("Preload running...");

// loop through all the content you want to preload
var images = [];
function preload() {
  for (var i = 0; i < arguments.length; i++) {
    images[i] = new Image();
    images[i].src = preload.arguments[i];
  }
}

// images and sounds
preload(
  "images/introCard.mp4",
  "images/introScene.mp4",
  "images/door.jpg",
  "images/note.png",
  "audio/elevenDisc.mp3"
);
