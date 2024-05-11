// Initialize annyang
if (annyang) {
  // Add voice command
  annyang.addCommands({
    'start': function() {
      window.location.href = "game.html";
    },
    'reload': function() {
      location.reload();
    },
    'open rules': openPopup,
    'close': closePopup
  });


  // Start listening for voice commands
  annyang.start();
}
// Open the popup
function openPopup() {
  var popup = document.getElementById('popup');
  popup.style.visibility = 'visible';
  popup.style.opacity = '1';
}

// Close the popup
function closePopup() {
  var popup = document.getElementById('popup');
  popup.style.visibility = 'hidden';
  popup.style.opacity = '0';
}
