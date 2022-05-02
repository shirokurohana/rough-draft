// 1) credits to Professor
// 2) credits for images/meadow.jpg: https://opengameart.org/content/meadow-background
// 3) credits for sounds/cute.mp3 to migfus20: https://opengameart.org/content/cute-intro-music 
// 4) credits for sounds/thatsItFortoday.mp3 - unable to find for now
// 5) credits for sprites/rabbitBig.png: https://opengameart.org/content/mascot-bunny-character
// 6) credits for sprites/carrot1.png: https://opengameart.org/content/mascot-bunny-character
// 7) credits for sprites/platform.png: https://opengameart.org/content/dark-ground

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
    parent: 'phaser-example',
    width: 800,
   pixelArt: true,
    height: 600,
    dom: {
        createContainer: true
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

// scene 1 preload
function scene1Preload() {
  // preload our image and audio file
  this.load.image("title", "assets/images/preGame.png");
  console.log("PreGame");
  // load audio asset files use this.load.audio()
  this.load.audio("music", "assets/sounds/cute.mp3");
  // load help button
  this.load.image("help", "assets/sprites/exclude.png");
  // load sound buttons
  this.load.image("soundOn", "assets/sprites/soundOn.png");
  this.load.image("soundOff", "assets/sprites/soundOff.png");

}

// scene 1 create
function scene1Create() {
  // make a image game object to show our bkgnd image
  scene1image = this.add.image(0, 0, "title").setOrigin(0, 0);
   const soundOnButton = this.add.image(70, 70, "soundOn").setInteractive({ useHandCursor: true })
  const soundOffButton = this.add.image(70, 130, "soundOff").setInteractive({ useHandCursor: true });

  soundOnButton.on('pointerup', playsound, this);

   soundOffButton.on('pointerup', mutesound, this);

  const helpButton = this.add.image(740, 531, "help").setInteractive({ useHandCursor: true })
  helpButton.on('pointerup', showText, this);
  helpButton.on('pointerover', destroyText, this)
  
   const startButton = this.add.rectangle(400, 500, 177, 77, 0x000).setInteractive({ useHandCursor: true })

        startButton.setInteractive({ useHandCursor: true })
      startButton.on('pointerover', function(){startButton.fillColor = 0x2F8085})
      startButton.on('pointerout', function(){startButton.fillColor = 0x000})
      startButton.on('pointerdown', function(){startButton.fillColor = 0x000})
      // thanks to Deisy (classmate for this awesome example)
        startButton.on('pointerup', scene1Transition, this)
  
  
       
        
        const startText = this.add.text(startButton.x, startButton.y, 'Start to play', {fontFamily: "Balsamiq Sans", fontSize: "32px",}).setOrigin(0.5)
  // make a sound audio object (not shown but heard when played)
  sound1 = this.sound.add("music");
  sound1.play({
    volume: 0.2, // set to 50% of volume level
    loop: false, // make audio play repeat over and over
  });

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
  sound1.setMute(true);
};
function playsound() {
  sound1.setMute(false);
};

function showText() {
  helpText = this.add.text(650, 440, "Type the words on \n the screen to get points \n and keep Zoom Zoom \n alive", {
    fontFamily: "Balsamiq Sans",

    color: "#fff",
    fontSize: "12px",
  });
};
function destroyText() {
  helpText = this.add.text(650, 440, "", {
    fontFamily: "Balsamiq Sans",

    color: "#fff",
    fontSize: "12px",
  });
};


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
// scene 2 preload
function scene2Preload() {

    this.load.html('nameform', 'assets/html/nameform.html');
  this.load.spritesheet("rabbitBig", "assets/sprites/rabbitBig.png", {
    frameWidth: 78,
    frameHeight: 52,
  });
  this.load.audio("meadowThoughts", "assets/sounds/thatsItForToday.mp3");
  this.load.image("meadow", "assets/images/meadow.jpg");
  this.load.image("ground", "assets/sprites/platform.png");
  this.load.image("carrot", "assets/sprites/carrot1.png");

  
}
// scene 2 create
function scene2Create() 
{
sound1.stop();

  // credits to jjcapellan: https://phaser.discourse.group/t/countdown-timer/2471/4
   console.log('create timer');
    // 2:30 in seconds
    this.initialTime = 60;

    // Each 1000 ms call onEvent
    timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
  platforms = this.physics.add.staticGroup();

  platforms.create(640, 560, "ground").setScale(3).refreshBody();
  
  meadowThoughts = this.sound.add("meadowThoughts", { loop: true });
  this.add.image(0, 0, "meadow").setOrigin(0, 0);
  scoreText = this.add.text(415, 15, "score: 0", {
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

   timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });

   
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
    key: 'carrot',
    repeat: 7,
    setXY: { x: 200, y: 0, stepX: 77 }
});


    this.physics.add.collider(rabbitBig, platforms);

  this.physics.add.collider(carrots, platforms);



const wordsLevel1 = [
    'of', 
    'oh', 
    'at', 
    'ok'
 
];
const wordsLevel2 = [ 'all', 
  'has', 
  'pop', 
  'bee', 
  'jam',
  'bake', 
  'word',	
  'list',
  'four'
  ];
const wordsLevel3 = [  
  'eagle', 
  'evens', 
  'extra', 
  'enure', 
  'enemy' ];

  const wordsLevel4 = [
  'babies',
  'fabric', 
  'habits',
  'nachos'
    ];
  const wordsLevel5 = [
  'abandon', 
  'earache', 
  'pacific',
  'rabbits'
    ];
  const wordsLevel6 = [
  'aardvark',
  'eardrops',
  'habitant',
  'quackery'
    ];
   const wordsLevel7 = [
  'excellence',
     "magnifying"

    ];
    // credits to Phaser: https://labs.phaser.io/edit.html?src=src%5Cgame%20objects%5Cdom%20element%5Cinput%20test.js
    var text = this.add.text(300, 510, 'Please type: ', { color: 'white', fontSize: '20px ', fontFamily: "Balsamiq Sans"});
    
  // Generate random array index
  var randIndex = Math.floor(Math.random() * wordsLevel1.length);
  // Output random word
  var currentWord = wordsLevel1[randIndex];
  
  console.log(currentWord)

  

  text.setText('Please type: ' + currentWord) 


    var element = this.add.dom(400, 577).createFromCache('nameform');

    element.addListener('click');

    element.on('click', function (event) {

        if (event.target.name === 'playButton')
        {
            var inputText = this.getChildByName('nameField');

            //  Have they entered anything?
            if (inputText.value == currentWord || inputText.value == newWord)
              
            {
              if (score < 100) {
                this.value = "";
              
                //  Hide the login element
                this.setVisible(true);

                //  Populate the text with whatever they typed in
                newWord = wordsLevel1[Math.floor(Math.random() * wordsLevel1.length)];

                text.setText('Please type: ' + newWord);
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

                text.setText('Please type: ' + newWord);
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

                text.setText('Please type: ' + newWord);
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

                text.setText('Please type: ' + newWord);
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

                text.setText('Please type: ' + newWord);
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

                text.setText('Please type: ' + newWord);
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

                text.setText('Please type: ' + newWord);
              //Move rabbit
              rabbitBig.body.x += 77;
        rabbitBig.x += 77;
        rabbitBig.body.setVelocity(0, 48);
            }
            }
            else  
            {
              text.setText('Incorrect! Type: ' + newWord)
                        }
        }

    });
  meadowThoughts.play();
  //  Checks to see if the rabbitBig overlaps with any of the carrots, if she does call the collectcarrot function
  this.physics.add.overlap(rabbitBig, carrots, collectcarrot, null, this);

  this.time.addEvent({
        delay: 1000000,
        loop: false,
        callback: () => {
            this.scene.start("scene3");
        }
    });

}

function scene2Update() {

}

function collectcarrot(rabbitBig, carrots) {
  carrots.disableBody(true, true);

  //  Add and update the score
  score += 100;
  scoreText.setText("score: " + score);

  if (score === 0) {
    welcomeText.setText("");
  }
  if (score === 100) {
    welcomeText.setText("Level 1: passed");
  }
  if (score === 200) {
    welcomeText.setText("Level 2: passed");

    var x =
      rabbitBig.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);
  }
  if (score === 300) {
    welcomeText.setText("Level 3: passed");

    var x =
      rabbitBig.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);
  }
  if (score === 400) {
    welcomeText.setText("Level 4: passed");

    var x =
      rabbitBig.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);
  }
  if (score === 500) {
    welcomeText.setText("Level 5: passed");

    var x =
      rabbitBig.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);
  }
  if (score === 600) {
    welcomeText.setText("Level 6: passed");

    var x =
      rabbitBig.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);
  }
  if (score === 700) {
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
function formatTime(seconds){
    // Minutes
    var minutes = Math.floor(seconds/60);
    // Seconds
    var partInSeconds = seconds%60;
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2,'0');
    // Returns formated time
    return `${minutes}:${partInSeconds}`;
}

// credits to jjcapellan: https://phaser.discourse.group/t/countdown-timer/2471/4
// onEvent function
function onEvent ()
{
    this.initialTime -= 1; // One second
    timeText.setText('timer: ' + formatTime(this.initialTime));
   if (this.initialTime < 0) {
     timeText.setText('GAME OVER');
   }
}

// scene 3 Preload
function scene3Preload() {

}
// scene 3 Create
function scene3Create() {
  meadowThoughts.stop();
  byeByeText = this.add.text(200, 200, "Thank you for playing, bye!", {
    fontFamily: "Balsamiq Sans",

    color: "#a579d4",
    fontSize: "32px",
  });

}
// scene 3 Upload
function scene3Update() {

}
// scene 3 transition
function scene2Transition() {
  this.scene.start("scene3");
  
}