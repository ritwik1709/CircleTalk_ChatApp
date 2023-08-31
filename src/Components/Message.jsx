import { Avatar, HStack, Text } from '@chakra-ui/react'
import { px } from 'framer-motion'
import React from 'react'

const Message = ({text,uri,user}) => {
  return (
    <HStack alignSelf={user==="me"?'flex-end':'flex-start'} borderRadius={'base'} bg={'gray.100'} px={'4'} py={'2'}>
        {
            user==="other" && <Avatar src={uri}/>
        }
        <Text>{text}</Text>
        {
            user==="me" && <Avatar src={uri}/>
        }

    </HStack>
  )
}

export default Message