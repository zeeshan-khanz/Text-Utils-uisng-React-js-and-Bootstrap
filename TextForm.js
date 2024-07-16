import React, { useState, useEffect } from 'react';

export default function TextForm(props) {
  const [text, setText] = useState('Enter text Here');
  const [voice, setVoice] = useState(null);
  const [voices, setVoices] = useState([]);
  const [loadingVoices, setLoadingVoices] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const getVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setVoices(voices);
        setLoadingVoices(false);
      };
      getVoices();
    }, 100);
  }, []);

  const handleUpClick = () => {
    console.log("Uppercase" + text);
    let newText = text.toUpperCase();
    setText(newText);
  };

  const handleLoClick = () => {
    console.log("Lowercase" + text);
    let newText = text.toLowerCase();
    setText(newText);
  };

  const handleSpeak = () => {
    if (!voice || loadingVoices) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  };

  const handleOnChange = (event) => {
    console.log("On Change");
    setText(event.target.value);
  };

  const handleVoiceChange = (event) => {
    const selectedVoice = voices.find((voice) => voice.voiceURI === event.target.value);
    setVoice(selectedVoice);
  };

  return (
    <>
      <div className='container'>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        {loadingVoices? (
          <p>Loading voices...</p>
        ) : (
          <select value={voice? voice.voiceURI : ''} onChange={handleVoiceChange}>
            <option value="">Select voice</option>
            {voices.map((voice, index) => (
              <option key={index} value={voice.voiceURI}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        )}
        <button className='btn btn-primary' onClick={handleUpClick}>
          Convert to UpperCase
        </button>
        <button className='btn btn-primary' onClick={handleLoClick}>
          Convert to lowerCase
        </button>
        <button className='btn btn-primary' onClick={handleSpeak}>
          Speak
        </button>
      </div>
      <div className='container my-3'>
        <h1>Your Text Summary</h1>
        <h2>Total words</h2>
        <p>{text.split(" ").length}</p>
        <h2>Total Characters</h2>
        <p>{text.length}</p>
      </div>
    </>
  );
}