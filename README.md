HTML.next-inert
===============

A jQuery plugin to disable any HTML element and its descendents.
This is especially useful for form submission and when waiting for data from an Ajax call.

```javascript
.inert([set], [callback])
```

**set** (boolean), true to  make the matched elements inert, false to remove the inert status
	the default value is true

**callback** (function), a callback function to run after the inert animation has finished


```javascript
.inert(options)
```

**options** (array), containing a boolean and/or callback function


And like any good jQuery plugin, .inert() returns the jQuery object so you can string more commands after it.
