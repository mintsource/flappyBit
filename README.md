

![image](support/images/flappyBit-logo.png)

![image](support/images/flappyBit-tagline.png)

## Overview


flappyBit is a simple Flappy Birds demo controlled via littleBits using an input trigger and the arduino module.

It allows you to control a littleBits themed Flappy Birds clone, called flappyBit, using an input attached to the Arduino module, Scratch and a browser based Flappy Bird game.

It was put together for using during talks and demos of littleBits and it may be useful for others who are wannting to connect up their littleBits collection to other things. *rework*

![image](support/images/flappyBit-screenshot.png)

The purpose of this project is that we are trying to connect the game up to input from littleBits so we have to deal with how a game running in the browser can listen for when the input is triggered from the littleBits. 

## Technical Overview

There are other ways in which the connection between the arduino triggered input and the game can be made. Scratch was chosen as it 

The basic flow is:

- A process is listening for a input trigger from the littleBits Arduino module.(Scratch)
- When the input is received a message is created and sent to subscrbers listening on Scractches, remote sensor stream. (flappyBits-Game node.js app)
- The subscribers do something when they get the message (Browser based HTML5 game)


It is comprised of the following:

- [littleBits Arduino module](http://). In this setup the wireless transceiver/receiver will be used to seperate the controller from the Arduino but basically it needs to have a trigger from an input bit connected to the Arduino.
- [Scratch](http://) communicating with the littleBits Arduino module. 
- A Flappy Birds clone built using [Phaser](http:) and based on LessMilk's [excellent tutorial](http://blog.lessmilk.com/how-to-make-flappy-bird-in-html5-1/) running in the browser that received input from the littleBits to make. It is packaged as a Node.js application in order to communicate to Scratch over a regular socket connection and the browser with websockets.





##Setup

### littleBits

- Attach an input bit such as a button or a roller to you the Arduino's d0 connector. This could simply be connected directly or a more elaborate setup - providing a wireless controller on a mounting board as shown below.
- Connect up the Arduino to a USB port and power on your computer. 

![image](support/images/flappyBit-wireless-controller.png) ![image](support/images/flappyBit-arduino.png)


### Scratch

littleBits recently released an extension for the Scratch environment which makes it very simple to connect the two together. This project uses 


- Download and install Scratch 1.4 
- Connect the littleBits Arduino module with a input, such as a button to the d0 connector as shown below.


- Open the following [scratch project](http://)

On the right you can see the image of the littleBits Arduino. If you board is connected 

![image](support/images/flappyBit-scratch.png)


- In the right hand preview window, the "Searching board..." message should disappear once it has successfully found the board.
- Click the littleBits input button that is connected to d0 and check the value in the Digital0 reading changes from false to true when the button is pressed.


- Right click on the `If` block and `enable remote sensor connections`. This mean Scratch will send out `broadcast` activities to anything listening on a TCP/IP socket, by default running on port 14000.

### Game setup


The game runs within the browser but as it needs to use




