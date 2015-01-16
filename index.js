/**
 * Library for sampling of random values from a discrete probability distribution, 
 * using the Walker-Vose alias method.
 *
 * Creates a new Sample instance for the given probabilities and outcomes.
 *
 * @param {Array} the probabilities.
 * @param {Array} the outcomes. Index is assumed as outcome if not provided.
 */
function Sample(probabilities, outcomes) {
  this.alias = [];
  this.prob = [];
  this.outcomes = outcomes || this.indexedOutcomes(probabilities.length);

  this.precomputeAlias(probabilities);
}

/**
 * Samples an outcome from the underlying probability distribution.
 *
 * @return {Object} a random outcome according to the underlying probability distribution.
 */
Sample.prototype.next = function () {
  var c = this.randomInt(0, this.prob.length),
    u = Math.random(); // Random number in [0,1)

  return this.outcomes[(u < this.prob[c]) ? c : this.alias[c]];
}

Sample.prototype.indexedOutcomes = function (n) {
  var o = [];
  for (i = 0; i < n; i++) o[i] = i;
  return o;
}

/**
 * Ported from ransampl.c
 * Scientific Computing Group of JCNS at MLZ Garching.
 * http://apps.jcns.fz-juelich.de/doku/sc/ransampl
 */
Sample.prototype.precomputeAlias = function (p) {
  // Normalize probabilities
  var n = p.length,
    sum = 0,
    P = [];

  for (i = 0; i < n; ++i) {
    if (p[i] < 0) {
      throw 'Probability must be a positive: p[' + i + ']=' + p[i];
    }
    sum += p[i];
  }

  if (sum == 0) {
    throw 'Probability cannot be zero.';
  }

  for (i = 0; i < n; ++i) {
    P[i] = p[i] * n / sum;
  }

  // Set separate index lists for small and large probabilities:
  var nS = 0,
    nL = 0;
  var S = [],
    L = [];
  for (i = n - 1; i >= 0; --i) {
    // at variance from Schwarz, we revert the index order
    if (P[i] < 1)
      S[nS++] = i;
    else
      L[nL++] = i;
  }

  // Work through index lists
  while (nS && nL) {
    a = S[--nS]; // Schwarz's l
    g = L[--nL]; // Schwarz's g

    this.prob[a] = P[a];
    this.alias[a] = g;

    P[g] = P[g] + P[a] - 1;
    if (P[g] < 1)
      S[nS++] = g;
    else
      L[nL++] = g;
  }

  while (nL)
    this.prob[L[--nL]] = 1;

  while (nS)
  // can only happen through numeric instability
    this.prob[S[--nS]] = 1;
}

Sample.prototype.randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = function (probabilities, outcomes) {
  return new Sample(probabilities, outcomes);
}
