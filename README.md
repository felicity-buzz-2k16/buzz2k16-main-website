# buzz2k16-main-website
- Pokemon clone
- Basic response saving in JSON
- Using tiled to make a map
- Using PhaserJS
- Order nachos with sals-shit wrong list

How to work with the project:
1) Clone the repo/download the zip.  
2) cd into the directory and set up a server:  
  a) Using Python:  
  python -m SimpleHTTPServer  
  By default, use your browser to go to localhost:8000 or you can select your port with 'python -m SimpleHTTPServer <yourport>'  
  b) Using node:  
  npm install http-server -g  
  http-server  
  By default, you should find it on http://127.0.0.1:8080/  

Working on the project:  
1) Game Framework used:  
  PhaserJS (http://phaser.io/)  
2) To open the TMX files/make your own tilemap (that retro tile/block based map), download Tiled (http://www.mapeditor.org/). Open the tmx file using Tiled and hit on layers on the right hand corner to see the 2 layers existent as of now: The 'Ground' layer for the part that the user can walk on and the 'Walls' layer for the part that the user collides with and cannot walk through(walls, water,etc).  

