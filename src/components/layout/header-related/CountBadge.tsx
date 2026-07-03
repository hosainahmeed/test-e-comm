import React from 'react'


export function CountBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span
      style={{
        position: "absolute",
        top: "-5px",
        right: "-5px",
        backgroundColor: "#C8A96E",
        color: "#fff",
        borderRadius: "50%",
        width: "17px",
        height: "17px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "10px",
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      {count > 9 ? "9+" : count}
    </span>
  );
}