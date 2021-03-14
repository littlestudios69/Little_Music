# Little Music

Little Music is another Bot from the Little Studios Family!
It is a Lavalink Powered all in one Music Bot that supports Reaction Crontros, Autoplay, Youtube & Spotify & Deezer & Soundcloud and even 180+ Radio Stations!

![](https://i.imgur.com/TfybnQm.png)


## Table of Content
- [Functions](#functions)
- [Arguments to use Little Music](#arguments-to-use-little-music)
- [More by Little Studios](#more-by-little-studios)
- [Disclaimer](#disclaimer)
- [Selfhosting](#selfhosting)


## Functions


### Reaction Controls

Just simply start an Song by Typing `m!play <name/url>` and the Embed with the Menu should popup!

![](https://i.imgur.com/ikdmUey.gif)


### Request Channel

Start by typing in `m!setup` and the Bot will create an Category and will set up everything (this can only be done by Admins and can only be reset by the Server Owner! Commands will not work in other channels unless you turn it back on with `m!togglerequestonly`)

![](https://i.imgur.com/jX9tXyq.gif)


### Radios

Just simply type in `m!radio` to see all Radios! Type `m!radio <number>` to turn a Radio on.


### Song of the Day

See the Current song of the day with `m!songoftheday` to play it use `m!playsongoftheday`


### Filters

We have many Filters like `m!bassboost` and more! Check it out in the help Command!


## Arguments to use Little Music


### High Quality Music
Due to our High Performance Lavalink Audio Nodes we can provide you with the Best Audio Quality that you can get right now!

### 99,99% Uptime

With our High End Servers we can Provide you a 99,99% Uptime!

### Frequent Updates

Due to our Team of Developers we are able to push Frequent Updates!

### User Friendly

Our Bot is very User Friendly due to it doing mostly everything automatically

### No Paywall

We do have a Premium Mode but it is FREE for everyone! 
And we dont hide Commands that make the Expierience better behind some shady Paywalls

### Open Source

Our Bot is Open Source so you can see what is going on behind the Scenes!


## More by Little Studios

As we said this Bot is just another Bot of the Little Studios Family! Make sure to checkout [Little Pika 2.0](https://top.gg/bot/660798952123400202)


#### Disclaimer
This Bot is a Modified fork from [Tomato6966/discord-js-lavalink-Music-Bot-erela-js](https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js) make sure to check it out!

## Selfhosting

 **1.** Install [node.js v12+](https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode) or higher

 **2.** Download this repo and unzip it    |    or git clone it

 **3.** Install all of the packages with **`npm install`**     |  the important packages are   **`npm install discord.js erela.js`**

 **4** Fill in the parameters, RIGHT in `botconfig/config.sample.json` and rename it to `config.json`!

 **5.** [Download Lavalink](https://ci.fredboat.com/repository/download/Lavalink_Build/8735:id/Lavalink.jar) and download Java 15 (Java 13 recommended)

 **5.1** Run the Lavalink file with: **`java -jar Lavalink.jar`**

 **MAKE SURE THAT THERE IS THE `application.yml` FILE OTHERWISE IT WILL NOT WORK!

 **6.** start the bot with **`node index.js`**

#### **NOTE:**

*If you are having errors/problems with starting delete the package.json file and do, before you install the packages `npm init`*


# THIS IS HOW IT SHOULD LOOK LIKE!

![](https://github.com/littlestudios69/Little_Music/blob/main/Folder_structure.png)


## Windows start Command .bat file
```bat
@ECHO OFF
ECHO ==========================
ECHO Starting Lavalink
ECHO ==========================
start cmd /k java -jar ./Lavalink.jar
ECHO ==========================
@ECHO Taking a 5 Second Break for Lavalink
ECHO ==========================
timeout /T 5 /nobreak
ECHO ==========================
@ECHO Starting BOT
ECHO ==========================
start cmd /k node .
exit /s'
```
Windows `start.bat` file
Which starts Lavalink and the Bot together via one click ;)

Have it in the Same folder as `index.js` and `Lavalink.jar`


