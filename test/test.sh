#!/bin/bash

env NODE_ENV=run
node app.js ../samples/events.json
node app.js ../samples/events2.json
node app.js ../samples/events3.json
node app.js ../samples/events4.json
