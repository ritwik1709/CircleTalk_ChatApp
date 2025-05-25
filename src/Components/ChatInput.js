// import React, { useState } from "react";
// import { HStack, Input, Button, IconButton } from "@chakra-ui/react";
// import { AttachmentIcon } from "@chakra-ui/icons";

// const ChatInput = ({ onSend }) => {
//   const [message, setMessage] = useState("");
//   const [file, setFile] = useState(null);

//   const handleSend = () => {
//     if (message || file) {
//       if (file) {
//         const reader = new FileReader();
//         reader.onload = () => {
//           onSend({ message, file: { name: file.name, type: file.type, url: reader.result } });
//           setMessage("");
//           setFile(null);
//         };
//         reader.readAsDataURL(file);
//       } else {
//         onSend({ message, file: null });
//         setMessage("");
//       }
//     }
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const removeFile = () => {
//     setFile(null);
//   };

//   return (
//     <HStack spacing={2}>
//       <Input
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message..."
//         bg="gray.50"
//         borderRadius="full"
//         size="md"
//         _focus={{ borderColor: "purple.400", boxShadow: "0 0 0 1px #6C63FF" }}
//       />
//       <label>
//         <IconButton
//           as="span"
//           icon={<AttachmentIcon />}
//           colorScheme="purple"
//           variant="ghost"
//           aria-label="Attach file"
//         />
//         <input
//           type="file"
//           onChange={handleFileChange}
//           accept="image/*,audio/*"
//           style={{ display: "none" }}
//         />
//       </label>
//       {file && (
//         <Button size="sm" colorScheme="red" variant="outline" onClick={removeFile}>
//           Remove
//         </Button>
//       )}
//       <Button
//         colorScheme="purple"
//         borderRadius="full"
//         px={6}
//         onClick={handleSend}
//         disabled={!message && !file}
//         fontWeight="bold"
//         boxShadow="md"
//       >
//         Send
//       </Button>
//     </HStack>
//   );
// };

// export default ChatInput;


import React, { useState } from "react";
import { HStack, Input, Button, IconButton } from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const handleSend = () => {
    if (message || file) {
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          onSend({
            message,
            file: { name: file.name, type: file.type, url: reader.result },
          });
          setMessage("");
          setFile(null);
        };
        reader.readAsDataURL(file);
      } else {
        onSend({ message, file: null });
        setMessage("");
      }
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent default newline behavior
      handleSend();
    }
  };

  return (
    <HStack spacing={2}>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        bg="gray.50"
        borderRadius="full"
        size="md"
        _focus={{
          borderColor: "purple.400",
          boxShadow: "0 0 0 1px #6C63FF",
        }}
      />
      <label>
        <IconButton
          as="span"
          icon={<AttachmentIcon />}
          colorScheme="purple"
          variant="ghost"
          aria-label="Attach file"
        />
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*,audio/*"
          style={{ display: "none" }}
        />
      </label>
      {file && (
        <Button size="sm" colorScheme="red" variant="outline" onClick={removeFile}>
          Remove
        </Button>
      )}
      <Button
        colorScheme="purple"
        borderRadius="full"
        px={6}
        onClick={handleSend}
        disabled={!message && !file}
        fontWeight="bold"
        boxShadow="md"
      >
        Send
      </Button>
    </HStack>
  );
};

export default ChatInput;
