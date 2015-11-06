#!/bin/bash

NODE_ENV=run

echo -e '\nFull Merge:'
node ../app.js ../samples/events.json

echo -e '\nPartial Merge:'
node ../app.js ../samples/events2.json

echo -e '\nNo Merge:'
node ../app.js ../samples/events3.json

echo -e '\nFull Merge with Multiple Unions:'
node ../app.js ../samples/events4.json
