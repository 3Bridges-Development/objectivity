export function getMockArgument(topic, side, index) {
  return {
    title: `${side} Argument ${index + 1}`,
    body: [
      `Paragraph 1 of ${side} argument ${index + 1} for topic: ${topic}.`,
      `Paragraph 2 of ${side} argument ${index + 1}.`,
      `Paragraph 3 of ${side} argument ${index + 1}.`
    ],
    sources: [
      "https://example.com/source1",
      "https://example.com/source2"
    ]
  };
}

export function getMockRebuttal(topic, side, depth) {
  return {
    body: [
      `Rebuttal paragraph 1 from ${side} side at round ${depth}.`,
      `Rebuttal paragraph 2 from ${side} side at round ${depth}.`,
      `Rebuttal paragraph 3 from ${side} side at round ${depth}.`
    ],
    sources: [
      "https://example.com/rebuttal1",
      "https://example.com/rebuttal2"
    ]
  };
}