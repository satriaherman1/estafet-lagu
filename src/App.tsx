import { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [frameSrc, setFrameSrc] = useState<string>("");

  const loadVideo = () => {
    setFrameSrc(inputValue);
  };

  const playRandom = () => {
    const randomMinute = Math.floor(Math.random() * 100000);

    console.log(randomMinute);
    if (randomMinute > 93533 || randomMinute < 50000) {
      playRandom();
    }
    // Ubah 10 menjadi durasi maksimum yang Anda inginkan
    else {
      setTimeout(() => {
        setFrameSrc("");
      }, randomMinute);
    }
  };

  return (
    <>
      <h1 className="title">Estafet Lagu</h1>

      {frameSrc.length > 1 && (
        <iframe
          id="videoFrame"
          width="560"
          height="315"
          src={`${frameSrc}&autoplay=1`}
          allow="autoplay"
          onLoad={playRandom}
          allowFullScreen
        ></iframe>
      )}
      <input
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
        className="input-frame-src"
        placeholder="Paste link YouTube"
      />
      <button onClick={loadVideo}>Load Video</button>
      <br />
      <br />
    </>
  );
}

export default App;
