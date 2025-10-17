import React, { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [jd, setJd] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeJD = async () => {
    setLoading(true);
    setResult(null);
    const res = await fetch("/api/analyze_jd", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jd }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1>JD Keyword & Skill Analyzer</h1>
      <textarea
        placeholder="Paste your Job Description here..."
        rows={12}
        value={jd}
        onChange={e => setJd(e.target.value)}
        style={{ width: "100%" }}
      />
      <button onClick={analyzeJD} disabled={loading || !jd}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>
      {result && (
        <div>
          <h2>Important Keywords</h2>
          <ul>
            {result.keywords.map(([word, freq]: [string, number]) => (
              <li key={word}>
                {word} <b>({freq})</b>
              </li>
            ))}
          </ul>
          <h2>Skills Found</h2>
          <p>{result.skills_found.join(", ") || "None detected"}</p>
          <h2>Suggestions</h2>
          <ul>
            {result.suggestions.map((s: string, i: number) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}