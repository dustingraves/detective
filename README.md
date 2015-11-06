
[![Circle CI](https://circleci.com/gh/dustingraves/detective.png?style=shield)](https://circleci.com/gh/dustingraves/detective)

# Detective

###This app will take a file with an array of arrays and return the minimum unique paths

1. `npm install`
2.  `node app.js samples/events.js`


##Sample input
####events.js
<pre class="prettyprint linenums">[
    ['test1', 'test2'], 
    ['test2', 'test3']
]</pre>

##Sample output
<pre class="prettyprint linenums">[
    ['test1', 'test2', 'test3]
]</pre>



##Test

`npm test --coverage`
