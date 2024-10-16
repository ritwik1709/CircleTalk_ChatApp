InterViewCode
InterViewCode is a real-time code collaboration web application that allows multiple users to collaborate on code in the same virtual room. It's built using the Express.js, React, Node.js, Bootstrap and Socket.IO for real-time communication.

Features
Create or join a virtual "room" by entering a room ID.
Set your username to identify yourself in the room.
Real-time code collaboration with other users in the same room.
Changes made by one user are instantly reflected on all connected clients.
Code highlighting and editor customization options.
Technologies Used
Express.js: Handling API requests.
React: Building the front-end interface.
Node.js: Running the server.
Socket.IO: Enabling real-time communication.
uuid: Generating unique room IDs.
CodeMirror: Providing the code editor.
Usage
Open the InterViewCode Application Home Page.
Enter a Room ID or generate a new one.
Set your username.
Start collaborating with others in the same room.
Video
 InterViewCode.Intro.mp4 
Photos
Home Page
image

Editor Page
image

Run Locally
Clone the project

  git clone https://github.com/YOUR-USERNAME/InterViewCode.git
Go to the project directory

  cd InterViewCode
Install dependencies

  cd client
  npm install
  cd server
  npm install
Start Application

Backend:

  cd server
  npm start
Frontend:

  cd client
  npm start
