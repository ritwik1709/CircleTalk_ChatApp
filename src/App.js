import { useState,useEffect, useRef } from "react";
import { app } from "./firebase";
import Message from "./Components/Message";
import "./app.css";
import { 
  Box, 
  Container, 
  VStack,
  Button, 
  Input, 
  HStack 
} from "@chakra-ui/react";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,orderBy
} from 'firebase/firestore';


const auth=getAuth(app);
const db=getFirestore(app);


////////////////////////// handlers ////////////////////
const loginhandler=()=>{
  const provider=new GoogleAuthProvider();
  signInWithPopup(auth,provider);
}
const logouthandler=()=>signOut(auth);


function App() {
  /// React Hooks
  const [user,setuser]=useState(false);
  const [message,setmessage]=useState("");
  const [messages,setmessages]=useState([]);

  const divforscroll=useRef(null);

  const submithandler = async(e)=>{
    e.preventDefault();
    try {
      await addDoc(collection(db,"Messages"),{
        text:message,
        uid:user.uid,
        uri:user.photoURL,
        createdAt:serverTimestamp(),
      });

      setmessage("");
      divforscroll.current.scrollIntoView({behavior:'smooth'});
    } 
    catch (error) {
      alert(error);
    }
  }
  useEffect(() => {
    const q=query(collection(db,"Messages"),orderBy("createdAt",'asc'));
    const unsubscribe= onAuthStateChanged(auth,(data)=>{
        setuser(data);
    })
    const unsubscribeformessages = onSnapshot(q,(snap)=>{
      setmessages(
        snap.docs.map((item)=>{
          const id=item.id;
          return {id,...item.data()}
        })
      )
    })
    return ()=>{
      unsubscribe();
      unsubscribeformessages();
    }
      
  }, [])
  
  return (
    <div className="App">
      <Box bg={'red.50'}>

        {
          user?<Container h={'100vh'} bg={'white'}>
          <VStack h={'100%'} py={'4'}>
            <Button onClick={logouthandler} colorScheme="red" w={'full'} >Logout</Button>
  
            <VStack h={'full'} w={'full'} overflowY={'auto'} >
               {
                messages.map((item,index)=>{
                  return (
                    <Message key={index} text={item.text} uri={item.uri} user={item.uid===user.uid?"me":"other"} />
                  )
                })
                
               }
              <div ref={divforscroll}></div>
            </VStack>
            <form onSubmit={submithandler} style={{width:'100%'}}>
              <HStack>
              <Input placeholder="Message" value={message} onChange={(e)=>setmessage(e.target.value)} />
              <Button colorScheme="purple" type="submit">Send</Button>
              </HStack>
              
            </form>
          </VStack>
        </Container>: <VStack h={'100vh'} justifyContent={'center'}>
          <Button onClick={loginhandler} colorScheme="purple">Sign in with Google</Button>
        </VStack>
        }
      </Box>
    </div>
  );
}

export default App;
