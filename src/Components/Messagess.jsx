import { Avatar, HStack, Text, Box } from '@chakra-ui/react';
import React from 'react';

const Message = ({ text, file, uri, user }) => {
  const isMe = user === "me";
  return (
    <HStack
      alignSelf={isMe ? 'flex-end' : 'flex-start'}
      borderRadius={'base'}
      bg={isMe ? 'purple.400' : 'gray.100'}
      color={isMe ? 'white' : 'black'}
      px={'4'}
      py={'2'}
      maxW="80%"
      spacing={3}
      marginY={2}
    >
      {!isMe && <Avatar src={uri} />}
      <Box>
        {text && <Text mb={file ? 2 : 0}>{text}</Text>}
        {file && file.type.startsWith("image/") && (
          <img src={file.url} alt={file.name} style={{ maxWidth: 200, borderRadius: 8 }} />
        )}
        {file && file.type.startsWith("audio/") && (
          <audio controls src={file.url} style={{ marginTop: 8 }} />
        )}
        {file && !file.type.startsWith("image/") && !file.type.startsWith("audio/") && (
          <a href={file.url} download={file.name} style={{ color: isMe ? "#fff" : "#222" }}>
            Download {file.name}
          </a>
        )}
      </Box>
      {isMe && <Avatar src={uri} />}
    </HStack>
  );
};

export default Message;