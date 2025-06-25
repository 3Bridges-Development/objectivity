import React from "react";
import ArgumentBox from "./ArgumentBox";

export default function ArgumentColumn({ side, topic }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{side} Side</h2>
      {[0, 1, 2].map((i) => (
        <ArgumentBox key={i} topic={topic} side={side} argumentIndex={i} />
      ))}
    </div>
  );
}