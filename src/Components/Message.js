import React, { useEffect } from "react";
import { Avatar, Button, VStack } from "@chakra-ui/react";

const Message = ({ message, file, user, uri, logouthandler, divforscroll, handleSend }) => {
  const isMe = user === "me";

  useEffect(() => {
    divforscroll.current.scrollIntoView({ behavior: 'smooth' });
  }, [message, divforscroll]);

  return (
    <div>
      <Button onClick={logouthandler} colorScheme="red" w={'full'}>Logout</Button>
      <VStack>
        {/* messages */}
        <div ref={divforscroll}></div>
      </VStack>
      <div
        style={{
          display: "flex",
          flexDirection: isMe ? "row-reverse" : "row",
          alignItems: "flex-start",
          marginBottom: 16,
        }}
      >
        <Avatar src={uri} />
        <div
          style={{
            background: isMe ? "#6C63FF" : "#E5E5EA",
            color: isMe ? "#fff" : "#222",
            borderRadius: 12,
            padding: 12,
            marginLeft: isMe ? 0 : 12,
            marginRight: isMe ? 12 : 0,
            maxWidth: 320,
            wordBreak: "break-word",
          }}
        >
          {message && <div style={{ marginBottom: file ? 8 : 0 }}>{message}</div>}
          {file && file.type.startsWith("image/") && (
            <img
              src={file.url}
              alt={file.name}
              style={{ maxWidth: 200, display: "block", marginTop: 8, borderRadius: 8 }}
            />
          )}
          {file && file.type.startsWith("audio/") && (
            <audio controls src={file.url} style={{ marginTop: 8 }} />
          )}
          {file && !file.type.startsWith("image/") && !file.type.startsWith("audio/") && (
            <a
              href={file.url}
              download={file.name}
              style={{ marginTop: 8, display: "inline-block", color: isMe ? "#fff" : "#222" }}
            >
              Download {file.name}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;