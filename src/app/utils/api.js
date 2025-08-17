function saveHistory(entry) {
  try {
    const history = JSON.parse(localStorage.getItem("debateHistory") || "[]");
    history.push(entry);
    localStorage.setItem("debateHistory", JSON.stringify(history));
  } catch (err) {
    console.error("Failed to save history:", err);
  }
}

export async function getArgument(topic, side) {
  const res = await fetch("/api/argument", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, side }),
  });
  const data = await res.json();
  saveHistory({ type: "argument", topic, side, response: data, timestamp: Date.now() });
  return data;
}

export async function getRebuttal(topic, side, depth) {
  const res = await fetch("/api/rebuttal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, side, depth }),
  });
  const data = await res.json();
  saveHistory({ type: "rebuttal", topic, side, depth, response: data, timestamp: Date.now() });
  return data;
}

export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem("debateHistory") || "[]");
  } catch {
    return [];
  }
}

