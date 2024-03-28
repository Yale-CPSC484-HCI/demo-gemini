# demo-gemini
Gemini usage demo

This repo contains a demo project on how to use Google Gemini in web application. The demo is a trivia game where Gemini creates the questions and answers. Topic of the trivia is recived from the users using the /sp2tx websocket. Displays have installed push-to-talk microphones installed and they have OpenAI Whisper model running in the background to convert speech to text and flush it over the websocket as string.

## Requirements

installl http-server for launching
```
npm install -g http-server
```

install Google GenerativeAI package
```
npm install @google/generative-ai
```

## Running
In the same directory run the following

```
http-server -c-1
```
or use python to run like the following

```
python3 -m http.server -b 127.0.0.1 8080
```

## Modifications
By supressing the /sp2tx socket this can be turned into a static trivia game.

## Reference
The base web application is taken from the following repository
https://github.com/WebDevSimplified/JavaScript-Quiz-App/tree/master

