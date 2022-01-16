import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [dateTime, setDateTime] = useState("");
  const [valueInr, setValueInr] = useState(75.75);
  const [valueUsd, setValueUsd] = useState(null);

  const refreshDateTime = async () => {
    const res = await fetch("http://localhost:5000/fetch");
    if (res.ok) {
      setDateTime((await res.json()).currentDatetime);
    }
  };
  useEffect(() => {
    refreshDateTime();
  }, []);

  useEffect(() => {
    setValueUsd(null);
    (async () => {
      const res = await fetch("http://localhost:5000/compute", {
        method: "POST",
        body: JSON.stringify({
          valueInr
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (res.ok) {
        setValueUsd((await res.json()).valueUsd);
      }
    })();
  }, [valueInr]);

  return (
    <div className="App">
      <p>Current Date Time (click to reload):</p>
      <button onClick={refreshDateTime}>
        {dateTime}
      </button>
      <p style={{ marginTop: "2em" }}>INR to USD Converter:</p>
      <span>&#8377; </span><input
        type="number" step="0.01"
        value={valueInr} onChange={(e) => { setValueInr(e.target.value); }}></input>
      <p>The above rupees equals ${valueUsd} USD.</p>
    </div>
  );
}

export default App;
