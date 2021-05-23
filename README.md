## Live demo
(TODO, will be deployed to yataw.com) 

## Level passwords
- JustWarmingUp
- ...

## How to start
- npm i
- npm run dev
- open http://localhost:3000

## Architecture and design
- Puzzle class handles API requests to the server. The class contains Transport instance,
which technically allows using different transports (Websocket, http long polling, persistent Websocket connection like next-app backend-side Websocket) and mocks with ease.
- in GUI mode the response from the server is hydrated (strings characters transforms to 3x3 state blocks). Also the state machine for each block is settled up (currently not used).
- CLI mode allows using API as is
- GUI mode allows interacting with the puzzle by clicking (touching)
- Explore allows producing reverse engineering and validate concepts aka "Rotating one particular fragment doesn't change the neighbours values in server response" 

## External dependencies
- nextJS, redux - framework
- materialUI - UI lib
- react-console-emulator - console emulator
