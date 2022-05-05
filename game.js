// 1) credits to Professor
// 2) credits for assets/images/meadow.jpg: https://opengameart.org/content/meadow-background
// 3) credits for assets/sounds/cute.mp3 to migfus20: https://opengameart.org/content/cute-intro-music
// 4) credits for assets/sounds/thatsItFortoday.mp3 - unable to find for now
// 5) credits for assets/sprites/rabbitBig.png: https://opengameart.org/content/mascot-bunny-character
// 6) credits for assets/sprites/carrot1.png: https://opengameart.org/content/mascot-bunny-character
// 7) credits for assets/sprites/platform.png: https://opengameart.org/content/dark-ground
// 8) credits for assets/sounds/: https://opengameart.org/content/7-eating-crunches
// 9) credits to StumpyStrust for ui sounds (on/off): https://opengameart.org/content/ui-sounds
// 10) credits to p0ss for Interface Sounds Starter Pack (appear-online.ogg): https://opengameart.org/content/interface-sounds-starter-pack
// 11) credits to wobbleboxx for assets/sounds/wrong.mp3 and ../.../levelUp.mp3: https://opengameart.org/content/level-up-power-up-coin-get-13-sounds
// 12) credits to jalastram - Jesús Lastra - for assets/sounds/enter.wav: https://opengameart.org/content/gui-sound-effects-4
// 13) credits to full screen: https://raw.githubusercontent.com/photonstorm/phaser3-examples/master/public/assets/ui/fullscreen-white.png
// 14) credits to assets/sounds/clock.wav: https://opengameart.org/content/ticking-clock-0
// 15) credits to assets/sounds/completeTask.mp3: https://opengameart.org/content/completion-sound

// Meeting 2, thank you to Professor: https://stackoverflow.com/questions/7060750/detect-the-enter-key-in-a-text-input-field
// the keyup() method returns a value to your function. In the example, they capture that value in a local parameter variable they name e. That variable contains a object value with properties. the keyCode property returns number corresponding to key pressed. Enter is number 13.
// Meeting 2, thank you to Professor: https://stackoverflow.com/questions/65854300/how-to-add-a-word-per-minute-calculator-to-a-website-using-javascript-html-or


// May 3, 2022
// issue #1: restart doesn't work
// issue #2: full screen works only on menu screen
// issue #3: can't stop sound when mute is true

// Missing: 
// 1) move Zoom Zoom on each character input that is correct
// 2) WPM score


// Restart scene: https://phaser.discourse.group/t/safely-restarting-a-scene/11557

// credits to icons: https://www.figma.com/file/awrmHskj79PjSAJZnGgPfk/Flex-Icon-Set-(Community)?node-id=901%3A1077

// define scene 1
let scene1 = {
  key: "scene1",
  active: true,
  preload: scene1Preload,
  create: scene1Create,
  update: scene1Update,
};

// define scene 2 (actual game) configuration in its own variable
let scene2 = {
  key: "scene2",
  active: false,
  preload: scene2Preload,
  create: scene2Create,
  update: scene2Update,
};
// define scene 3 (end)
let scene3 = {
  key: "scene3",
  active: false,
  preload: scene3Preload,
  create: scene3Create,
  update: scene3Update,
};
// set up configuration for the game
var config = {
   type: Phaser.AUTO,
  scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
     pixelArt: true,
    },
 
 
 
  
  dom: {
    createContainer: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [scene1, scene2, scene3],
};

// variables for scene 1
let scene1image;
let sound1;
var offNow;
var onNow;
var clock;
var completeTask;

// scene 1 preload
function scene1Preload() {
  // preload our image and audio file
  this.load.image("title", "assets/images/preGame.png");
  console.log("PreGame");
  // load audio asset files use this.load.audio()
  this.load.audio("music", "assets/sounds/cute.mp3");
  // load help button
  this.load.image("help", "assets/sprites/exclude.png");
  // load info button
  this.load.image("info", "assets/sprites/info.png");
  // load full screen button
  this.load.spritesheet('fullscreen', 'assets/sprites/fullscreen-white.png', { frameWidth: 64, frameHeight: 64 });
  // load sound buttons
  this.load.image("soundOn", "assets/sprites/soundOn.png");
  this.load.image("soundOff", "assets/sprites/soundOff.png");
  // load audio for sound buttons
  this.load.audio("appear", "assets/sounds/appear.ogg");
  this.load.audio("on", "assets/sounds/on.ogg");
  this.load.audio("off", "assets/sounds/off.ogg");
  this.load.audio("enterSound", "assets/sounds/enter.wav");
}

// scene 1 create
function scene1Create() {
  // make a image game object to show our bkgnd image
  scene1image = this.add.image(0, 0, "title").setOrigin(0, 0);
  const soundOnButton = this.add
    .image(70, 70, "soundOn")
    .setInteractive({ useHandCursor: true });
  const soundOffButton = this.add
    .image(70, 130, "soundOff")
    .setInteractive({ useHandCursor: true });
  enterSound = this.sound.add("enterSound", { loop: false });  
  appear = this.sound.add("appear", { loop: false });  
  on = this.sound.add("on", { loop: false });  
  off = this.sound.add("off", { loop: false });  
  
  soundOnButton.on("pointerup", playsound, this);
  

  soundOffButton.on("pointerup", mutesound, this);

  const helpButton = this.add
    .image(740, 531, "help")
    .setInteractive({ useHandCursor: true });
  const infoButton = this.add
    .image(70, 531, "info")
    .setInteractive({ useHandCursor: true });
  helpButton.on("pointerup", showText, this);
  infoButton.on("pointerup", infoText, this);
  helpButton.on("pointerover", destroyText, this);

  const startButton = this.add
    .rectangle(400, 500, 177, 77, 0x000)
    .setInteractive({ useHandCursor: true });

  startButton.setInteractive({ useHandCursor: true });
  startButton.on("pointerover", function () {
    startButton.fillColor = 0x2f8085;
  });
  startButton.on("pointerout", function () {
    startButton.fillColor = 0x000;
  });
  startButton.on("pointerdown", function () {
    startButton.fillColor = 0x000;
  });

  
  // thanks to Deisy (classmate for this awesome example)
  startButton.on("pointerup", scene1Transition, this);
  startButton.on("pointerup", enterGame, this);

  const startText = this.add
    .text(startButton.x, startButton.y, "Start to play", {
      fontFamily: "Balsamiq Sans",
      fontSize: "32px",
    })
    .setOrigin(0.5);
  // make a sound audio object (not shown but heard when played)
  sound1 = this.sound.add("music");
  sound1.play({
    volume: 0.2, // set to 50% of volume level
    loop: true, // make audio play repeat over and over
  });
// credits to :https://labs.phaser.io/edit.html?src=src/scalemanager/full%20screen%20game.js&v=3.55.2
  var button = this.add.image(800-16, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive();

        button.on('pointerup', function () {

            if (this.scale.isFullscreen)
            {   
              appear.play();
                button.setFrame(0);

                this.scale.stopFullscreen();
            }
            else
            {  
              appear.play();
                button.setFrame(1);

                this.scale.startFullscreen();
            }

        }, this);

  // credits to: https://codepen.io/samme/pen/XWbReRd
  // credits to: https://www.thepolyglotdeveloper.com/2020/09/switch-between-scenes-phaser-game/

  // credits to: https://codepen.io/samme/pen/XWbReRd
  /*this.input.keyboard.on(
      'keydown_C',
      function() {
        this.scene.switch('scene2');
    
      },
      this
    );
  */
}

//credits to phoenix studios: https://phaser.discourse.group/t/call-a-phaser-function-from-html-js/11350
//OUTSIDE CREATE - GLOBAL FUNCTION
function mutesound() {
  off.play()
  var offNow = sound1.setMute(true);
}
function playsound() {
  on.play();
 var onNow = sound1.setMute(false);
  
}
function enterGame() {
  enterSound.play();

  
}

function showText() {
  appear.play();
  //if (helpText === null) {
  helpText = this.add.text(
    650,
    440,
    "Type the words on \n the screen to get points \n and keep Zoom Zoom \n alive",
    {
      fontFamily: "Balsamiq Sans",

      color: "#fff",
      fontSize: "12px",
    }
  );
 // } else {
   // helpText.setText("");
  //}
}
function infoText() {
  appear.play();
  helpText = this.add.text(
    30,
    450,
    "Created by nathalie baladejo-reynosa\nfor Spring 2022 CS 42 class",
    {
      fontFamily: "Balsamiq Sans",

      color: "#fff",
      fontSize: "12px",
    }
  );
}
function destroyText() {
  helpText = this.add.text(650, 440, "", {
    fontFamily: "Balsamiq Sans",

    color: "#fff",
    fontSize: "12px",
  });
}

// scene 1 update
function scene1Update() {}

// scene 1 transition
function scene1Transition() {
  this.scene.start("scene2");
}
// start new game
var game = new Phaser.Game(config);
// variables for scene 2
var score = 0;
var platforms;
var crunch;
// scene 2 preload
function scene2Preload() {
  this.load.html("nameform", "assets/html/nameform.html");
  this.load.spritesheet("rabbitBig", "assets/sprites/rabbitBig.png", {
    frameWidth: 78,
    frameHeight: 52,
  });
  this.load.audio("clock", "assets/sounds/clock.wav");
  this.load.audio("completeTask", "assets/sounds/completeTask.mp3");
  // load full screen button
  this.load.spritesheet('fullscreen', 'assets/sprites/fullscreen-white.png', { frameWidth: 64, frameHeight: 64 });
  this.load.audio("meadowThoughts", "assets/sounds/thatsItForToday.mp3");
  this.load.audio("levelUp", "assets/sounds/levelUp.mp3");
  this.load.audio("wrong", "assets/sounds/wrong.mp3");
  this.load.audio("crunch", "assets/sounds/crunch.3.ogg");
  this.load.image("meadow", "assets/images/meadow.jpg");
  this.load.image("ground", "assets/sprites/platform.png");
  this.load.image("carrot", "assets/sprites/carrot1.png");
}
// scene 2 create
function scene2Create() {
  sound1.stop();

  // credits to :https://labs.phaser.io/edit.html?src=src/scalemanager/full%20screen%20game.js&v=3.55.2
  var button = this.add.image(800-16, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive();

        button.on('pointerup', function () {

            if (this.scale.isFullscreen)
            {
                button.setFrame(0);

                this.scale.stopFullscreen();
            }
            else
            {
                button.setFrame(1);

                this.scale.startFullscreen();
            }

        }, this);
  
  // credits to jjcapellan: https://phaser.discourse.group/t/countdown-timer/2471/4
  console.log("create timer");
  // 1 minute in seconds
  this.initialTime = 60;

  // Each 1000 ms call onEvent
  timedEvent = this.time.addEvent({
    delay: 1000,
    callback: onEvent,
    callbackScope: this,
    loop: true,
  });
  platforms = this.physics.add.staticGroup();

  platforms.create(640, 560, "ground").setScale(3).refreshBody();

  meadowThoughts = this.sound.add("meadowThoughts", { loop: true, volume: 0.2});
  clock = this.sound.add("clock", { loop: false, volume: 0.7});
  completeTask = this.sound.add("completeTask", { loop: false, volume: 0.2});
  crunch = this.sound.add("crunch", { loop: false });
  levelUp = this.sound.add("levelUp", { loop: false });
  wrong = this.sound.add("wrong", { loop: false });
  
  this.add.image(0, 0, "meadow").setOrigin(0, 0);
  scoreText = this.add.text(450, 15, "score: 0", {
    fontFamily: "Balsamiq Sans",

    color: "#a579d4",
    fontSize: "32px",
  });
  wpmText = this.add.text(300, 15, "WPM: ", {
    fontFamily: "Balsamiq Sans",

    color: "#a579d4",
    fontSize: "32px",
  });
  welcomeText = this.add.text(15, 15, "Type Away", {
    fontFamily: "Balsamiq Sans",

    color: "#a579d4",
    fontSize: "32px",
  });

  timeText = this.add.text(615, 15, "timer: " + formatTime(this.initialTime), {
    fontFamily: "Balsamiq Sans",

    color: "#a579d4",
    fontSize: "32px",
  });

  timedEvent = this.time.addEvent({
    delay: 1000,
    callback: onEvent,
    callbackScope: this,
    loop: true,
  });

  rabbitBig = this.physics.add.sprite(50, 250, "rabbitBig");

  rabbitBig.setBounce(0.2);
  rabbitBig.setCollideWorldBounds(true);
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("rabbitBig", { start: 2, end: 4 }),
    frameRate: 7,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "rabbitBig", frame: 7 }],
    frameRate: 10,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("rabbitBig", { start: 6, end: 8 }),
    frameRate: 7,
    repeat: -1,
  });
  carrots = this.physics.add.group({
    key: "carrot",
    repeat: 7,
    setXY: { x: 200, y: 0, stepX: 77 },
  });

  this.physics.add.collider(rabbitBig, platforms);

  this.physics.add.collider(carrots, platforms);

  const wordsLevel1 = ["of", "oh", "at", "ok"];
  const wordsLevel2 = [
    "all",
    "has",
    "pop",
    "bee",
    "jam",
    "bake",
    "word",
    "list",
    "four",
  ];
  const wordsLevel3 = ["eagle", "evens", "extra", "enure", "enemy"];

  const wordsLevel4 = ["babies", "fabric", "habits", "nachos"];
  const wordsLevel5 = ["abandon", "earache", "pacific", "rabbits"];
  const wordsLevel6 = ["aardvark", "eardrops", "habitant", "quackery"];
  const wordsLevel7 = ["excellence", "magnifying"];
  // credits to Phaser: https://labs.phaser.io/edit.html?src=src%5Cgame%20objects%5Cdom%20element%5Cinput%20test.js
  var text = this.add.text(300, 510, "Please type: ", {
    color: "white",
    fontSize: "20px ",
    fontFamily: "Balsamiq Sans",
  });

  // Generate random array index
  var randIndex = Math.floor(Math.random() * wordsLevel1.length);
  // Output random word
  var currentWord = wordsLevel1[randIndex];

  console.log(currentWord);

  text.setText("Please type: " + currentWord);

  var element = this.add.dom(400, 577).createFromCache("nameform");

  //currentWord = document.querySelector('.form-control').value;
  console.log(currentWord);
  // getElementsByClassName

  element.addListener("click");


// credits to: https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
  // Get the input field

  // issue May 3, 2022: on restart, function doesn't work neither one below
var input = document.getElementById("textField");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    
    // Trigger the button element with a click
    document.getElementById("button-addon2").click();

    // credits: https://stackoverflow.com/questions/10923719/reset-input-value-after-alert-javascript
    document.getElementById('textField').value = "";
  }
}); 

  

  element.on("click", function (event) {
    
    
    if (event.target.name === "playButton") {

     
        
   
      var inputText = this.getChildByName("nameField");
      // var inputText = document.querySelector('.form-control').value;

      //  Have they entered anything?
      if (inputText.value == currentWord || inputText.value == newWord) {
        if (score < 100) {
          this.value = "";

          //  Hide the login element
          this.setVisible(true);

          //  Populate the text with whatever they typed in
          newWord = wordsLevel1[Math.floor(Math.random() * wordsLevel1.length)];

          text.setText("Please type: " + newWord);
          //Move rabbit
          rabbitBig.body.x += 77;
          rabbitBig.x += 77;
          rabbitBig.body.setVelocity(0, 48);
        }
        if (score === 100) {
          this.value = "";

          //  Hide the login element
          this.setVisible(true);

          //  Populate the text with whatever they typed in
          newWord = wordsLevel2[Math.floor(Math.random() * wordsLevel2.length)];

          text.setText("Please type: " + newWord);
          //Move rabbit
          rabbitBig.body.x += 77;
          rabbitBig.x += 77;
          rabbitBig.body.setVelocity(0, 48);
        }
        if (score === 200) {
          this.value = "";

          //  Hide the login element
          this.setVisible(true);

          //  Populate the text with whatever they typed in
          newWord = wordsLevel3[Math.floor(Math.random() * wordsLevel3.length)];

          text.setText("Please type: " + newWord);
          //Move rabbit
          rabbitBig.body.x += 77;
          rabbitBig.x += 77;
          rabbitBig.body.setVelocity(0, 48);
        }
        if (score === 300) {
          this.value = "";

          //  Hide the login element
          this.setVisible(true);

          //  Populate the text with whatever they typed in
          newWord = wordsLevel4[Math.floor(Math.random() * wordsLevel4.length)];

          text.setText("Please type: " + newWord);
          //Move rabbit
          rabbitBig.body.x += 77;
          rabbitBig.x += 77;
          rabbitBig.body.setVelocity(0, 48);
        }
        if (score === 400) {
          this.value = "";

          //  Hide the login element
          this.setVisible(true);

          //  Populate the text with whatever they typed in
          newWord = wordsLevel5[Math.floor(Math.random() * wordsLevel5.length)];

          text.setText("Please type: " + newWord);
          //Move rabbit
          rabbitBig.body.x += 77;
          rabbitBig.x += 77;
          rabbitBig.body.setVelocity(0, 48);
        }
        if (score === 500) {
          this.value = "";

          //  Hide the login element
          this.setVisible(true);

          //  Populate the text with whatever they typed in
          newWord = wordsLevel6[Math.floor(Math.random() * wordsLevel6.length)];

          text.setText("Please type: " + newWord);
          //Move rabbit
          rabbitBig.body.x += 77;
          rabbitBig.x += 77;
          rabbitBig.body.setVelocity(0, 48);
        }
        if (score === 600) {
          this.value = "";

          //  Hide the login element
          this.setVisible(true);

          //  Populate the text with whatever they typed in
          newWord = wordsLevel7[Math.floor(Math.random() * wordsLevel7.length)];

          text.setText("Please type: " + newWord);
          //Move rabbit
          rabbitBig.body.x += 77;
          rabbitBig.x += 77;
          rabbitBig.body.setVelocity(0, 48);
          
        }
      } else {
        wrong.play();
        text.setText("Incorrect! Type: " + newWord);
      }
    }
      
  })
    ;
 /* creds to: https://www.w3schools.com/howto/howto_js_trigger_button_enter.aspvar inputStuff = document.querySelector('.form-control').value;

// Execute a function when the user presses a key on the keyboard
inputStuff.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("button-addon2").click();
  }
 }); */
  if (offNow)
  {
    meadowThoughts.stop;
  }
   else {
  meadowThoughts.play();
   }
  //  Checks to see if the rabbitBig overlaps with any of the carrots, if she does call the collectcarrot function
  this.physics.add.overlap(rabbitBig, carrots, collectcarrot, null, this);

  this.time.addEvent({
    delay: 1000000,
    loop: false,
    callback: () => {
      this.scene.start("scene3");
    },
  });
}

function scene2Update() {}

function collectcarrot(rabbitBig, carrots) {
  carrots.disableBody(true, true);
  crunch.play();

  //  Add and update the score
  score += 100;
  scoreText.setText("score: " + score);

  if (score === 0) {
    welcomeText.setText("");
  }
  if (score === 100) {
    levelUp.play();
    welcomeText.setText("Level 1: passed");
  }
  if (score === 200) {
    levelUp.play();
    welcomeText.setText("Level 2: passed");

    var x =
      rabbitBig.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);
  }
  if (score === 300) {
    levelUp.play();
    welcomeText.setText("Level 3: passed");

    var x =
      rabbitBig.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);
  }
  if (score === 400) {
    levelUp.play();
    welcomeText.setText("Level 4: passed");

    var x =
      rabbitBig.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);
  }
  if (score === 500) {
    levelUp.play();
    welcomeText.setText("Level 5: passed");

    var x =
      rabbitBig.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);
  }
  if (score === 600) {
    levelUp.play();
    welcomeText.setText("Level 6: passed");

    var x =
      rabbitBig.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);
  }
  if (score === 700) {
    levelUp.play();
    welcomeText.setText("Level 7: passed...You won!");

    this.physics.pause();

    byeBye = true;
    meadowThoughts.stop();
    this.scene.start("scene3");
  }

  var x =
    rabbitBig.x < 400
      ? Phaser.Math.Between(400, 800)
      : Phaser.Math.Between(0, 400);
}
// credits to: https://phaser.discourse.group/t/countdown-timer/2471/4

// credits to jjcapellan: https://phaser.discourse.group/t/countdown-timer/2471/4
// formatTime function to format the way the time looks
function formatTime(seconds) {
  // Minutes
  var minutes = Math.floor(seconds / 60);
  // Seconds
  var partInSeconds = seconds % 60;
  // Adds left zeros to seconds
  partInSeconds = partInSeconds.toString().padStart(2, "0");
  // Returns formated time
  return `${minutes}:${partInSeconds}`;
}

// credits to jjcapellan: https://phaser.discourse.group/t/countdown-timer/2471/4
// onEvent function
function onEvent() {
  this.initialTime -= 1; // One second
  timeText.setText("timer: " + formatTime(this.initialTime));
  if (this.initialTime < 10) {
    clock.play();
  }
  if (this.initialTime < 0) {
    timeText.setText("game over");
    clock.stop();
    completeTask.play();
    completeTask.stop();
  }
}

// scene 3 Preload
function scene3Preload() {
  // load restart button
  this.load.image("restart", "assets/sprites/restart.png");
  // load menu button
  this.load.image("menu", "assets/sprites/menu.png");
  this.load.audio("enterSound", "assets/sounds/enter.wav");
}
// scene 3 Create
function scene3Create() {
   enterSound = this.sound.add("enterSound", { loop: false });  
  //meadowThoughts.stop();
  const restartButton = this.add
    .image(200, 500, "restart")
    .setInteractive({ useHandCursor: true });
  restartButton.on("pointerup", destroyGame, this);
  restartButton.on("pointerup", restartGame, this);
  restartButton.on("pointerup", enterSoundNow, this);
  restartText = this.add.text(100, 400, "5322 - Restart n/work", {
    fontFamily: "Balsamiq Sans",

    color: "#fff",
    fontSize: "20px",
  });
  const menuButton = this.add
    .image(550, 500, "menu")
    .setInteractive({ useHandCursor: true });
  menuButton.on("pointerup", backToMenu, this);
  menuButton.on("pointerup", enterSoundNow, this);
  
  menuText = this.add.text(500, 400, "Back to menu", {
    fontFamily: "Balsamiq Sans",

    color: "#fff",
    fontSize: "20px",
  });
  byeByeText = this.add.text(200, 200, "Thank you for playing, bye!", {
    fontFamily: "Balsamiq Sans",

    color: "#a579d4",
    fontSize: "32px",
  });
}
// scene 3 Upload
function scene3Update() {}
// scene 3 transition
function scene2Transition() {
  this.scene.start("scene3");
}
function destroyGame() {

  // issue May 3, 2022 - scene not restarting well???
   this.scene.stop("scene2");

}
function restartGame() {

 

   this.scene.start('scene2');
}
function backToMenu() {
  this.scene.start("scene1");
}

function enterSoundNow(){
  enterSound.play();
}

/* notes for calculating WPM: https://stackoverflow.com/questions/65854300/how-to-add-a-word-per-minute-calculator-to-a-website-using-javascript-html-or
// Split the string to an array of words
var words = string.split(" ");

text.innerHTML = "";
// For each word, add it as a span element in the text
words.forEach(w => {
    let el = document.createElement("span");
    el.innerText = w;
    text.appendChild(el);
    text.innerHTML += " ";
});

input.addEventListener("keyup", () => {
    // Split the input to an array of words
    let input_words = input.value.split(" ");
    let good = true;

    if (finished)
        return;
    if (!start)
        start = Date.now();

    // Iterate over all the words
    for (let i = 0; i < words.length; i++) {
        let element = words[i];
        // If the word is not the same as the word at same position in the input, set 'good' at false
        if (input_words[i] != element)
            good = false;
        // Set the background color for the word, selecting the element
        // by the parent's children index (corresponding to i) to avoid the usage of ids
        text.children[i].style.backgroundColor = good ? "green" : null;
    }
    // If all words are correct, the variable is still true
    if (good)
    {
        finished = true;
        // Get the difference in seonds between start and now
        let elapsed = (Date.now() - start) / 1000;
        // Get words per seconde
        let words_per_seconde = words.length * 60 / elapsed;
        // Round to the fourth decimal
        words_per_seconde = Math.round(words_per_seconde * 1000) / 1000;
        alert(words_per_seconde + " words per minute.");
    }
});

*/
