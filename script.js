const robot = document.getElementById('robot');
const terminalInput = document.getElementById('terminal-input');
const commandOutput = document.getElementById('command-output');

// Define the text for each landmark
const landmarkText = {
    project1: "I first became involved with robotics when I started my high school's first FIRST Robotics Team. During this time, I learned how to code robots in C/C++, design robots with Autodesk Inventor and SolidWorks, and assemble robots with a team.",
    project2: "This experience drove me to pursue a degree in engineering, ultimately deciding to go to the South Dakota School of Mines and Technology. Here I joined the ROCKIN (Robotics and Computational Kinematics Innovation Lab) where I have been working for the past three years.",
    project3: "My first project in the ROCKIN Lab was to learn the operation of the Yaskawa Motoman GP12. Once I learned basic programming of jobs, I moved to control with Siemens PLCs. I learned ladder programming and how to interface the PLCs with the Motoman. My first demo had the robot cap bottles on a conveyor belt and since then I have moved to multi-robot fleets involving the Motoman, Turtlebot4s, and a Unitree Go2 robotic dog.",
    turtlebot: "The turtlebot4 is a ROS2-based robot that is mainly used for research and development. I have used the turtlebot4 mainly for its autonomous navigation capabilities and when the lab receieved a second Turtlebot4, I began researching multi-robot fleets. With both Turtlebot4's working in tandem, I created a mail delivery service for the mechanical engineering department; which utlizes a robotic servo arm attatched to the top plate of one of the Turtlebot4's.",
    unitree: "The navigation systems I have used for the multi-robot fleet include LiDAR, RGB cameras, and depth cameras. I use the LiDAR scanners for obstacle avoidance and area mapping; and the cameras for localization, utlizing ArUco tags for poze estimation. The combination of cameras and LiDAR scanners ensures effective mapping, localization, and obstacle avoidance. "
};

let robotPosition = { x: 50, y: 50 };
let canMove = false; // Restrict movement until the correct command is entered
let currentLandmark = null; // Track the current landmark for showing/hiding info
let typingTimeout; // Timeout for typing effect
let locationTimeout; // Timeout for updating coordinates continuously
let rotationAngle = 0; // Track the current rotation angle of the turtle

// Set initial robot position
function updateRobotPosition() {
    robot.style.top = robotPosition.y + 'px';
    robot.style.left = robotPosition.x + 'px';
    robot.style.transform = `rotate(${rotationAngle}deg)`; // Apply rotation to turtle
}
updateRobotPosition();

// Display robot coordinates when not on a landmark
function displayCoordinates() {
    clearTimeout(locationTimeout); // Clear any previous update to avoid flickering
    commandOutput.innerText = `Robot Position: X=${robotPosition.x}, Y=${robotPosition.y}`;
    locationTimeout = setTimeout(displayCoordinates, 500); // Update every 500 ms
}

// Command verification
function executeCommand() {
    const command = terminalInput.value.trim();
    if (command === 'ros2 run teleop_twist_keyboard') {
        commandOutput.innerText = "Command executed successfully! Use arrow keys to control the robot.";
        commandOutput.style.color = '#9cfb00'; // Success in green
        canMove = true; // Allow movement
        terminalInput.disabled = true;
        terminalInput.style.borderBottom = '1px solid #9cfb00';
    } else {
        commandOutput.innerText = "Error: Command not recognized. Try 'ros2 run teleop_twist_keyboard'.";
        commandOutput.style.color = '#ff4f4f'; // Error in red
    }
}

// Listen for Enter and Tab key presses on the input
terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        executeCommand();
    } else if (e.key === 'Tab') {
        e.preventDefault(); // Prevent the default Tab behavior
        const command = terminalInput.value.trim();
        
        // Autocomplete functionality
        if (command.startsWith('ros2 run')) {
            const remainingText = 'teleop_twist_keyboard'.slice(command.length - 'ros2 run '.length);
            terminalInput.value = command + remainingText;
        }
    }
});

// Handle keyboard movement with rotation
document.addEventListener('keydown', (e) => {
    if (!canMove) return; // Prevent movement until command is executed

    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault(); // Prevent page scrolling for arrow keys
    }

    const speed = 10;
    switch (e.key) {
        case 'ArrowUp':
            robotPosition.y = Math.max(0, robotPosition.y - speed);
            rotationAngle = 0; // Face up
            break;
        case 'ArrowDown':
            robotPosition.y = Math.min(370, robotPosition.y + speed); // Adjusted for smaller grid height
            rotationAngle = 180; // Face down
            break;
        case 'ArrowLeft':
            robotPosition.x = Math.max(0, robotPosition.x - speed);
            rotationAngle = 270; // Face left
            break;
        case 'ArrowRight':
            robotPosition.x = Math.min(570, robotPosition.x + speed); // Adjusted for smaller grid width
            rotationAngle = 90; // Face right
            break;
    }
    updateRobotPosition();
    checkLocation();
});

// Typing effect function using setTimeout with debug logging
function typeText(text) {
    let index = 0;
    commandOutput.innerText = ''; // Clear output

    function typeCharacter() {
        if (index < text.length) {
            const char = text.charAt(index);
            commandOutput.innerText += char;
            index++;
            typingTimeout = setTimeout(typeCharacter, 30); // Call typeCharacter again for the next character
        }
    }

    clearTimeout(typingTimeout); // Clear any existing typing timeout
    typeCharacter(); // Start typing the first character
}

// Check if robot is at a location and start typing
function checkLocation() {
    let landmarkDetected = false;

    document.querySelectorAll('.location').forEach(location => {
        const rect1 = robot.getBoundingClientRect();
        const rect2 = location.getBoundingClientRect();

        if (
            rect1.left < rect2.left + rect2.width &&
            rect1.left + rect1.width > rect2.left &&
            rect1.top < rect2.top + rect2.height &&
            rect1.top + rect1.height > rect2.top
        ) {
            landmarkDetected = true;
            if (currentLandmark !== location) {
                clearTimeout(locationTimeout); // Stop coordinate display
                clearTimeout(typingTimeout); // Stop typing effect
                currentLandmark = location;
                const text = landmarkText[location.id]; // Retrieve text from the landmarkText object
                typeText(text); // Start typing the landmark info
            }
        }
    });

    if (!landmarkDetected) {
        if (currentLandmark) {
            clearTimeout(typingTimeout); // Stop typing immediately
            currentLandmark = null; // Reset current landmark when moving off a landmark
        }
        displayCoordinates(); // Display robot coordinates continuously
    }
}
