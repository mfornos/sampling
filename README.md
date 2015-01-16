# AliasMethod

Library for sampling of random values from a discrete probability distribution, using the Walker-Vose alias method.

## Usage

```javascript
var s = sample([0.5, 0.25, 0.25]);
s.next(); // => random index according to the specified probabilities
```

```javascript
var s = sample([0.5, 0.25, 0.25], [10, 20, 30]);
s.next(); // => random outcome according to the specified probabilities
```

