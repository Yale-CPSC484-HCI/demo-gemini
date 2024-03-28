# demo-gemini
Gemini usage demo

This repo contains a demo project on how to use Google Gemini in web application. The demo is a trivia game where Gemini creates the questions and answers. Topic of the trivia is recived from the users using the /sp2tx websocket. Displays have installed push-to-talk microphones installed and they have OpenAI Whisper model running in the background to convert speech to text and flush it over the websocket as string.

The base web application is taken from the following repository
https://github.com/WebDevSimplified/JavaScript-Quiz-App/tree/master

