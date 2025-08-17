"use client"
import React, { useEffect, useState } from "react";
import { getRebuttal } from "../utils/api";

export default function ArgumentThread({ initialSide, initialTopic, depth, content, onArgument }) {
  const [rebuttal, setRebuttal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNext, setShowNext] = useState(false);

  const side = initialSide === "Pro" ? "Con" : "Pro";

  useEffect(() => {
    async function fetchRebuttal() {
      setLoading(true);
      const result = await getRebuttal(initialTopic, side, depth);
      setRebuttal(result);
      setLoading(false);
    }
    fetchRebuttal();
  }, [initialTopic, side, depth]);

  if (loading) return <p>Loading rebuttal...</p>;
  if (!rebuttal) return <p>Failed to load rebuttal.</p>;

  return (
    <div className="border p-3 rounded-2xl bg-gray-50 mb-4">
      <h4 className="font-semibold">{side} Rebuttal (Round {depth})</h4>
      {rebuttal.body ? (rebuttal.body.map((para, idx) => (
        <p key={idx} className="mb-2">{para}</p>
      ))) : ""}
      <div className="text-sm text-blue-700 underline mb-2">
        Sources:
        {rebuttal.sources ? (rebuttal.sources.map((src, idx) => (
          <a key={idx} href={src} target="_blank" rel="noreferrer" className="block">{src}</a>
        ))) : ""}
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
            content={content}
            onArgument={onArgument}
          />
        </div>
      )}
    </div>
  );
}