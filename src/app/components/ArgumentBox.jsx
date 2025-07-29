import React, { useState } from "react";
import ArgumentThread from "./ArgumentThread";
import { getArgument } from "../utils/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

export default function ArgumentBox({ topic, side, content }) {
  const [showThread, setShowThread] = useState(false);

  return (
    <div className="mb-6 p-4 border rounded-2xl shadow">
      <h3 className="font-bold mb-2">{side}</h3>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            />
          ),
          li: ({ children }) => <li className="mb-2">{children}</li>,
          p: ({ children }) => <p className="mb-4">{children}</p>,
        }}
      >
        {content}
      </ReactMarkdown>
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