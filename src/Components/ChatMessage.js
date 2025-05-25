import React from "react";

const ChatMessage= ({ message, file })=> {
  return (
    <div style={{ marginBottom: 12 }}>
      {message && <span>{message}</span>}
      {file && file.type.startsWith("image/") && (
        <div>
          <img
            src={file.url}
            alt={file.name}
            style={{
              maxWidth: 200,
              display: "block",
              marginTop: 8,
            }}
          />
        </div>
      )}
      {file && file.type.startsWith("audio/") && (
        <div>
          <audio controls src={file.url} style={{ marginTop: 8 }} />
        </div>
      )}
      {file && !file.type.startsWith("image/") && !file.type.startsWith("audio/") && (
        <div>
          <a
            href={file.url}
            download={file.name}
            style={{
              marginTop: 8,
              display: "inline-block",
            }}
          >
            Download {file.name}
          </a>
        </div>
      )}
    </div>
  );
}

export default ChatMessage;