  // Load the handtrack.js model
handTrack.load().then(model => {
    // Start the video
    const video = document.getElementById("video");
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        video.srcObject = stream;
    });

    // Set up the canvas
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    // Store the previous hand gesture
    let previousGesture = "";

    // Run the hand detection
    setInterval(() => {
        model.detect(video).then(predictions => {
            // Clear the canvas
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Draw bounding boxes around the hands
            model.renderPredictions(predictions, canvas, context, video);

            // Process the hand predictions
            if (predictions.length > 0) {
                // Loop through the predictions
                for (let i = 0; i < predictions.length; i++) {
                    const hand = predictions[i];
                    const { bbox } = hand;

                    // Calculate the hand area
                    const area = (bbox[2] - bbox[0]) * (bbox[3] - bbox[1]);

                    // Determine the hand gesture based on the area
                    let gesture;
                    if (area < 2000) {
                        gesture = "Closed";
                    } else {
                        gesture = "Open";
                    }

                    // Display the hand gesture on the canvas
                    context.fillStyle = "#FF0000"; // Red color
                    context.font = "24px Arial";
                    context.fillText(gesture, bbox[0], bbox[1] - 10);

                    // Check for hand gesture change
                    if (gesture !== previousGesture) {
                        // Perform actions based on the hand gesture
                        if (gesture === "Open") {
                            // Hand is open, do something
                            var raceCarLeft = parseInt(window.getComputedStyle(raceCar).getPropertyValue("left"))
                            if(raceCarLeft<120){raceCar.style.left = (raceCarLeft + 120) + "px"}
                            console.log("Hand is open!");
                        } else if (gesture === "Closed") {
                            // Hand is closed, do something else
                          var raceCarLeft = parseInt(window.getComputedStyle(raceCar).getPropertyValue("left"))
                          if(raceCarLeft>0){raceCar.style.left = (raceCarLeft - 120) + "px"}
                            console.log("Hand is closed!");
                        }
                       else if (label === "face") {
                        // Do something for faces
                            console.log("Face detected!");
                          }

                        // Update the previous gesture
                        previousGesture = gesture;
                    }
                }
            }
        });
    }, 100); // Run the detection every 100ms
});

