import React from "react";
import ArgumentBox from "./ArgumentBox";

export default function ArgumentColumn({ side, topic, content, onArgument }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{side} Side</h2>
        <ArgumentBox topic={topic} side={side} content={content} onArgument={onArgument} />
    </div>
  );
}