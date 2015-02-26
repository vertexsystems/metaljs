#Metal JS

A collection of micro-frameworks and patterns for the JavaScript programming language.

## Motivation

Make common programming patterns intrinsic to the JavaScript language.

## Download

[Latest release](https://github.com/vertexsystems/metaljs/raw/latest/vs-metal.js)

## Usage

```javascript
function A( parameters ) {

	this.a = 'a';

	this.vca = 'vca';

	this.fca = function() { return 'fca'; };

	this.initialize( parameters );
}

Metal.within( A );

A.prototype.initialization = {
	vca: 'vca0',
	vpa: 'vpa0'
};

A.prototype.vpa = 'vpa';
A.prototype.fpa = function() { return 'fpa'; };

var a = new A( { vca: 'vca1' } );

console.log( a );
```


