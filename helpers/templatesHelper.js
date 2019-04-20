const templatesHelper = {
  formatInt(int = 1000) {
    const splitted = int.toString().split('');
    let formated = '';

    for (let i = splitted.length, j = 0; i--;) {
      if (!j || j % 3) {
        formated = splitted[i] + formated;
        j++;
        continue;
      }
      formated = splitted[i] + ' ' + formated;
      j++;
    }
    return formated;
  },

  getRnd(min, max) {
    if (!max) {
      max = min;
      min = 0;
    }
    return min + Math.random() * (max + 1 - min) ^ 0;
  },

  getLorem(length = 10, { useSentences, useEndDot, startFromUpper } = {}) {
    useEndDot = useEndDot === undefined ? useSentences : useEndDot;
    startFromUpper = startFromUpper === undefined ? useSentences : startFromUpper;

    const words = 'lorem ipsum dolor sit amet consectetur adipisicing elit laboriosam neque iure quos repellat natus dolore commodi suscipit placeat praesentium tenetur'.split(' ');
    let generatedText = words[this.getRnd(words.length - 1)];
    if (startFromUpper) generatedText = generatedText[0].toUpperCase() + generatedText.slice(1);

    let beforeLastWord, lastWord;
    for (let i = length, newWord; --i;) {
      do {
        newWord = words[this.getRnd(words.length - 1)];
      } while (newWord === lastWord || newWord === beforeLastWord);
      beforeLastWord = lastWord;
      lastWord = newWord;
      generatedText += ' ' + newWord;
    }

    if (useSentences) {
      generatedText = convertToSentences(generatedText);
    }
    return (generatedText + (useEndDot ? '.' : ''));
  },
};

templatesHelper.getLoremSent = function (length = 10) {
  return this.getLorem(length, { useSentences: true });
};

templatesHelper.getLoremHead = function (length = 10) {
  return this.getLorem(length, { startFromUpper: true });
};

templatesHelper.getLoremPhrase = function (length = 10) {
  return this.getLorem(length, { startFromUpper: true, useEndDot: true });
};

function convertToSentences(generatedText) {
  generatedText = generatedText.split(' ');
  const end = generatedText.length - templatesHelper.getRnd(5, 10);
  for (let i = templatesHelper.getRnd(5, 10); i < end; i = i + templatesHelper.getRnd(5, 15)) {
    generatedText[i] += '.';
    generatedText[i + 1] = generatedText[i + 1][0].toUpperCase() + generatedText[i + 1].slice(1);
  }
  return generatedText.join(' ');
}

module.exports = templatesHelper;
