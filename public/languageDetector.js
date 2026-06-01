function detectLanguage(text) {

  const filipinoWords = [
    "ang",
    "mga",
    "ng",
    "sa",
    "pag",
    "layunin",
    "gumagamit",
    "pagkatuto",
    "mag-aaral"
  ];

  const lowerText = text.toLowerCase();

  let score = 0;

  filipinoWords.forEach(word => {
    if (lowerText.includes(word)) {
      score++;
    }
  });

  return score >= 2
    ? "filipino"
    : "english";
}