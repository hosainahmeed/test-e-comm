import { processUserMessage } from "@/ai/core/processUserMessage";
import { useState } from "react";

export default function AIPlayground() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function handleSend() {
    if (!input.trim()) return;

    setLoading(true);

    try {
      const res = await processUserMessage(input);
      setResult(res);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 20,
        fontFamily: "Arial",
      }}
    >
      <h2>🛒 AI Commerce Engine Playground</h2>

      <p style={{ color: "#666" }}>
        Type anything like: <b>gaming mouse under 3000</b>
      </p>

      {/* INPUT AREA */}
      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          style={{
            flex: 1,
            padding: 12,
            border: "1px solid #ccc",
            borderRadius: 6,
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />

        <button
          onClick={handleSend}
          style={{
            padding: "12px 20px",
            background: "#111",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          {loading ? "Searching..." : "Send"}
        </button>
      </div>

      {/* RESPONSE */}
      {result && (
        <div style={{ marginTop: 30 }}>
          <h3>💬 Response</h3>
          <p>{result.message}</p>

          {/* PRODUCTS */}
          <h3 style={{ marginTop: 20 }}>🛍️ Products</h3>

          {result.products?.length === 0 && (
            <p style={{ color: "#999" }}>No products found</p>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 15,
            }}
          >
            {result.products?.map((p: any) => (
              <div
                key={p.id}
                style={{
                  border: "1px solid #eee",
                  borderRadius: 10,
                  padding: 12,
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    width: "100%",
                    height: 140,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />

                <h4 style={{ margin: "10px 0 5px" }}>{p.title}</h4>

                <p style={{ margin: 0, fontWeight: "bold" }}>৳ {p.price}</p>

                <p style={{ margin: "5px 0", fontSize: 12 }}>{p.brand}</p>
              </div>
            ))}
          </div>

          {/* SUGGESTIONS */}
          {result.suggestions?.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <h4>💡 Suggestions</h4>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {result.suggestions.map((s: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setInput(s)}
                    style={{
                      padding: "6px 10px",
                      border: "1px solid #ccc",
                      borderRadius: 20,
                      background: "#f7f7f7",
                      cursor: "pointer",
                      fontSize: 12,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
