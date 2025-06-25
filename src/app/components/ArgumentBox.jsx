import React, { useState } from "react";
import ArgumentThread from "./ArgumentThread";
import { getMockArgument } from "../utils/api";

export default function ArgumentBox({ topic, side, argumentIndex }) {
  const [showThread, setShowThread] = useState(false);
  const argumentData = getMockArgument(topic, side, argumentIndex);

  return (
    <div className="mb-6 p-4 border rounded-2xl shadow">
      <h3 className="font-bold mb-2">{argumentData.title}</h3>
      {argumentData.body.map((para, idx) => (
        <p key={idx} className="mb-2">{para}</p>
      ))}
      <div className="text-sm text-blue-700 underline mb-2">
        Sources:
        {argumentData.sources.map((src, idx) => (
          <a key={idx} href={src} target="_blank" rel="noreferrer" className="block">{src}</a>
        ))}
      </div>
      <button
        onClick={() => setShowThread(true)}
        className="text-blue-500 underline mt-2"
      >
        See Counterargument
      </button>
      {showThread && (
        <div className="mt-4 ml-4 border-l-2 border-gray-400 pl-4">
          <ArgumentThread initialSide={side} initialTopic={topic} depth={1} />
        </div>
      )}
    </div>
  );
}