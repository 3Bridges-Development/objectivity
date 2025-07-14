import React, { useState } from "react";
import { getRebuttal } from "../utils/api";

export default function ArgumentThread({ initialSide, initialTopic, depth }) {
  const [showNext, setShowNext] = useState(false);
  const side = initialSide === "Pro" ? "Con" : "Pro";
  const rebuttal = getRebuttal(initialTopic, side, depth);

  return (
    <div className="border p-3 rounded-2xl bg-gray-50 mb-4">
      <h4 className="font-semibold">{side} Rebuttal (Round {depth})</h4>
      {rebuttal.body.map((para, idx) => (
        <p key={idx} className="mb-2">{para}</p>
      ))}
      <div className="text-sm text-blue-700 underline mb-2">
        Sources:
        {rebuttal.sources.map((src, idx) => (
          <a key={idx} href={src} target="_blank" rel="noreferrer" className="block">{src}</a>
        ))}
      </div>
      <button
        onClick={() => setShowNext(true)}
        className="text-blue-500 underline mt-2"
      >
        See Counterargument
      </button>
      {showNext && (
        <div className="mt-4 ml-4 border-l-2 border-gray-400 pl-4">
          <ArgumentThread
            initialSide={side}
            initialTopic={initialTopic}
            depth={depth + 1}
          />
        </div>
      )}
    </div>
  );
}