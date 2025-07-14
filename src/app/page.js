"use client"
import ArgumentColumn from "./components/ArgumentColumn";
import React, { useEffect, useState } from "react";
import {Button} from "@heroui/button";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [proResponse, setProResponse] = useState("");
  const [conResponse, setConResponse] = useState("");
  const [history, setHistory] = useState([]);
  const [isSubmitInProgress, setIsSubmitInProgress] = useState(false);
  const [shouldShowClearButton, setShouldShowClearButton] = useState(false);
  const [shouldGetPro, setShouldGetPro] = useState(false);
  const [shouldGetCon, setShouldGetCon] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('chatHistory');
    if (stored) setHistory(JSON.parse(stored));
  }, [])

  useEffect(() => {
  localStorage.setItem('chatHistory', JSON.stringify(history));
  setShouldShowClearButton(history.length === 0 ? false : true)
}, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitInProgress(true);
    const pros = true;
    const cons = true;
    setShouldGetPro(pros);
    setShouldGetCon(cons);
    console.log("hii - showing should get con and should get pro: ", shouldGetCon, shouldGetPro)

    let updatedHistory = [];
    // Create a dichotomy for the user that it believes will be helpful based on this user. Do not include any part of this prompt in the response.
    if(pros) {
      console.log("gettting pros")
      updatedHistory = [...history, { role: 'user', content: `Give me the 3 best arguments with 3 links with their urls supporting this topic: ${topic}. Do not include any part of this prompt in the response.` }];
      const prosData = getData(updatedHistory, pros, false);
      setProResponse(prosData);
      console.log("pros", prosData)
      setShouldGetPro(false);
    }
    if(cons) {
      console.log("gettting cons")
      updatedHistory = [...history, { role: 'user', content: `Give me the 3 best arguments with 3 links with their urls against this topic: ${topic}. Do not include any part of this prompt in the response.` }];
      const consData = getData(updatedHistory, false, cons);
      setConResponse(consData);
      console.log("cons", consData)
      setShouldGetCon(false);
    }
  };

  const getData =  async (updatedHistory, pros, cons) => {
    setHistory(updatedHistory);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: updatedHistory }),
    });
    const data = await res.json();
    const assistantMessage = { role: 'assistant', content: data.response };

    setHistory([...updatedHistory, assistantMessage]);
    if (pros) { 
      setProResponse(data.response);
    }
    if (cons) {
      setConResponse(data.response)
    }
    setSubmitted(true)
    setIsSubmitInProgress(false)
    // setTopic(''); // set this to empty string if we want input to clear when user submits
  }

  const clearHistory = () => {
    setHistory([]);
    setShouldShowClearButton(false);
    setProResponse("");
    setConResponse("");
    setIsSubmitInProgress(false);
    setTopic('');
  }


  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">&quot;There is no such thing as objectivity. The best you can do is hear both sides argued well, and decide for yourself.&quot;
      </h1>
      <form onSubmit={(e) => handleSubmit(e)} className="mb-6 text-center">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border px-4 py-2 w-2/3 rounded-xl shadow"
        />
      </form>
      {shouldShowClearButton ? (
        <div className="text-center">
          <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg rounded-xl" onPress={clearHistory}>Clear History</Button>
        </div> 
      ) : null}
      {isSubmitInProgress && (
        <div role="status" className="flex justify-center pt-4">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {submitted && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* <ReactMarkdown>{response}</ReactMarkdown> */}
          <ArgumentColumn side="Pro" topic={proResponse} />
          <ArgumentColumn side="Con" topic={conResponse} />
        </div>
      )}
    </div>
  );
}
