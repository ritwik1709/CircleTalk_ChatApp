// import { Avatar, HStack, Text, Box } from '@chakra-ui/react';
// import React from 'react';

// const Message = ({ text, file, uri, user }) => {
//   const isMe = user === "me";
//   return (
//     <HStack
//       alignSelf={isMe ? 'flex-end' : 'flex-start'}
//       borderRadius={'base'}
//       bg={isMe ? 'purple.400' : 'gray.100'}
//       color={isMe ? 'white' : 'black'}
//       px={'4'}
//       py={'2'}
//       maxW="80%"
//       spacing={3}
//       marginY={2}
//     >
//       {!isMe && <Avatar src={uri} />}
//       <Box>
//         {text && <Text mb={file ? 2 : 0}>{text}</Text>}
//         {file && file.type.startsWith("image/") && (
//           <img src={file.url} alt={file.name} style={{ maxWidth: 200, borderRadius: 8 }} />
//         )}
//         {file && file.type.startsWith("audio/") && (
//           <audio controls src={file.url} style={{ marginTop: 8 }} />
//         )}
//         {file && !file.type.startsWith("image/") && !file.type.startsWith("audio/") && (
//           <a href={file.url} download={file.name} style={{ color: isMe ? "#fff" : "#222" }}>
//             Download {file.name}
//           </a>
//         )}
//       </Box>
//       {isMe && <Avatar src={uri} />}
//     </HStack>
//   );
// };

// export default Message;

import React, { useEffect, useState } from "react";
import { HStack, Text, Box, Avatar } from '@chakra-ui/react';

const Message = ({ text, file, user, uri }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMe = user === "me";
  const userName = isMe ? "Me" : (user.name || user.id || "Other");

  console.log("Message props:", { text, file, user, uri, isMe, userName });

  useEffect(() => {
    if (uri) {
      const img = new Image();
      img.onload = () => {
        setImageLoaded(true);
      };
      img.onerror = (e) => {
        setImageLoaded(false);
      };
      img.src = uri;
    }
  }, [uri]);

  const AvatarComponent = (
    <Avatar
      src={imageLoaded ? uri : undefined}
      name={userName}
      size="sm"
      bg={imageLoaded ? "transparent" : "gray.300"}
      icon={!imageLoaded ? <span role="img" aria-label="fallback">👤</span> : undefined}
    />
  );

  return (
    <HStack
      alignSelf={isMe ? 'flex-end' : 'flex-start'}
      spacing={2}
      mb={2}
    >
      {!isMe && AvatarComponent}
      <Box
        bg={isMe ? "purple.500" : "gray.100"}
        color={isMe ? "white" : "black"}
        borderRadius="lg"
        px={3}
        py={2}
        maxW="70%"
      >
        <Text fontSize="xs" color={isMe ? "whiteAlpha.700" : "blackAlpha.700"}>
          {userName}
        </Text>
        {text && <Text>{text}</Text>}
        {file && file.type && file.type.startsWith("image/") && (
          <img src={file.url} alt={file.name} style={{ maxWidth: '200px', borderRadius: '8px', marginTop: '8px' }} />
        )}
        {file && file.type && file.type.startsWith("audio/") && (
          <audio controls src={file.url} style={{ marginTop: '8px' }} />
        )}
        {file && file.type && !file.type.startsWith("image/") && !file.type.startsWith("audio/") && (
          <Text as="a" href={file.url} download={file.name} color={isMe ? "white" : "blue.500"} mt={2} display="block">
            Download {file.name}
          </Text>
        )}
      </Box>
      {isMe && AvatarComponent}
    </HStack>
  );
};

export default Message;