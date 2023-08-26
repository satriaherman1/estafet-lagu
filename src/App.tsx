import { useEffect, useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [frameSrc, setFrameSrc] = useState<string>("");
  const [start, setStart] = useState<number>(0);
  const [startFrom, setStartFrom] = useState<number>(0);
  const [isAutoPaused, setIsAutoPaused] = useState<boolean>(false);
  const [triggerChangeStart, setTriggerChangeStart] = useState<boolean>(false);

  let interval: number;

  const loadVideo = async () => {
    setFrameSrc("");
    const loadSrcTimeOut = setTimeout(() => {
      setFrameSrc(inputValue);
      clearTimeout(loadSrcTimeOut);
    }, 1000);
  };

  const playRandom = () => {
    const randomMinute = Math.floor(Math.random() * 100000);

    if (randomMinute > 73533 || randomMinute < 50000) {
      playRandom();
    }
    // Ubah 10 menjadi durasi maksimum yang Anda inginkan
    else {
      interval = setInterval(() => {
        setStart((prevStart) => prevStart + 1);
      }, 1000);

      const randomMinuteTimeOut = setTimeout(() => {
        setFrameSrc("");
        setTriggerChangeStart(!triggerChangeStart);
        setIsAutoPaused(true);

        clearInterval(interval);
        clearTimeout(randomMinuteTimeOut);
      }, randomMinute);
    }
  };

  useEffect(() => {
    setStart(0);
    setStartFrom(0);
  }, [inputValue]);

  useEffect(() => {
    console.log(start);
  }, [start]);

  useEffect(() => {
    setStartFrom(start);
  }, [triggerChangeStart]);

  return (
    <>
      <h1 className="title">Estafet Lagu</h1>

      {frameSrc.length > 1 && (
        <iframe
          id="videoFrame"
          width="560"
          height="315"
          src={`${frameSrc}&autoplay=1${
            isAutoPaused ? "&amp;start=" + startFrom : ""
          }`}
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
      <button onClick={loadVideo}>Mulai</button>
      <br />
      <br />
    </>
  );
}

export default App;
