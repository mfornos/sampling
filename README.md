# Alias Method for Sampling

Library for sampling of random values from a discrete probability distribution, using the Walker-Vose alias method.

[![NPM](https://nodei.co/npm/alias-sampling.png?mini=true)](https://nodei.co/npm/alias-sampling/)

## Usage

```javascript
var s = sample([0.5, 0.25, 0.25], ['A', 'B', 'C']);
s.next(); // => random outcome according to specified probabilities
```

```javascript
var s = sample([0.5, 0.25, 0.25], [10, 20, 30]);
s.next(1000); // => 1000 random samples according to specified probabilities
```

```javascript
var s = sample([0.5, 0.25, 0.25]);
s.next(); // => random index according to specified probabilities
```

* * * *

Have fun!

[![Build Status](https://travis-ci.org/mfornos/sampling.svg)](https://travis-ci.org/mfornos/sampling)
