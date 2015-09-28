function edit_distance_1(word) {
    var letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    var results = [];

    // transposition
    for (var i = 0; i < word.length - 1; i++) {
      results.push(word.slice(0, i) + word.slice(i + 1, i + 2) + word.slice(i, i + 1) + word.slice(i + 2));
    }

    // deletion
    for (var i = 0; i < word.length; i++) {
      results.push(word.slice(0, i) + word.slice(i + 1));
    }

    // insertion
    for (var i = 0; i < word.length; i++) {
      letters.forEach(function(letter) {
        results.push(word.slice(0, i) + letter + word.slice(i));
      });

      // check for letter missing from end of word as well
      letters.forEach(function(letter) {
        results.push(word + letter);
      });
    }

    // alteration
    for (var i = 0; i < word.length; i++) {
      letters.forEach(function(letter) {
        results.push(word.slice(0, i) + letter + word.slice(i + 1));
      });
    }

    return results;
}

function getBestMatch(candidates) {
    var key, tempArray = [];
    for (key in candidates) {
      tempArray.push(key);
    }
    return Math.max.apply(null, tempArray);
}

function getNumberOfKeys(candidates) {
    var key, count = 0;
    for (key in candidates) {
      if (candidates.hasOwnProperty(key)) {
        count++;
      }
    }
    return count;
}

function correct_spelling(word) {
    if (nwords.hasOwnProperty(word)) {
      return "Your spelling is correct!";
    }

    var candidates = {};
    var edits = edit_distance_1(word);

    edits.forEach(function(edit) {
      if (nwords.hasOwnProperty(edit)) {
        candidates[nwords[edit]] = edit;
      }
    });

    // check edit distance 2 if correction has not been found
    if (getNumberOfKeys(candidates) == 0) {
      edits.forEach(function(edit) {
        edit_distance_1(edit).forEach(function(distance2) {
          if (nwords.hasOwnProperty(distance2)) {
            candidates[nwords[distance2]] = distance2;
          }
        })
      })
    }
    
    // return original word if still no correction found, otherwise return correction
    return getNumberOfKeys(candidates) > 0 ? candidates[getBestMatch(candidates)] : word;
}