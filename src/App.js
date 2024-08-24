
import { useState, useEffect, useRef } from "react";
import { app } from "./firebase";
import Message from "./Components/Message";
import "./app.css";
import { FcGoogle } from "react-icons/fc";
import { Container, VStack, Button, Input, HStack } from "@chakra-ui/react";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';

const auth = getAuth(app);
const db = getFirestore(app);

const loginhandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
}

const logouthandler = () => signOut(auth);

function App() {
  const [user, setuser] = useState(false);
  const [message, setmessage] = useState("");
  const [messages, setmessages] = useState([]);

  const divforscroll = useRef(null);

  const submithandler = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
      });
      setmessage("");
      divforscroll.current.scrollIntoView({ behavior: 'smooth' });
    }
    catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    const q = query(collection(db, "Messages"), orderBy("createdAt", 'asc'));
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setuser(data);
    })
    const unsubscribeformessages = onSnapshot(q, (snap) => {
      setmessages(
        snap.docs.map((item) => {
          const id = item.id;
          return { id, ...item.data() }
        })
      )
    })
    return () => {
      unsubscribe();
      unsubscribeformessages();
    }

  }, [])

  return (
    <div className="App">
      {
        user ? (
          <div className="background-wrapper">
            <Container className="container">
              <VStack h={'100%'} py={'4'}>
                <Button onClick={logouthandler} colorScheme="red" w={'full'} >Logout</Button>
                <VStack h={'full'} w={'full'} overflowY={'auto'} >
                  {
                    messages.map((item, index) => {
                      return (
                        <Message key={index} text={item.text} uri={item.uri} user={item.uid === user.uid ? "me" : "other"} />
                      )
                    })
                  }
                  <div ref={divforscroll}></div>
                </VStack>
                <form onSubmit={submithandler} style={{ width: '100%' }}>
                  <HStack>
                    <Input placeholder="Message" value={message} onChange={(e) => setmessage(e.target.value)} />
                    <Button colorScheme="purple" type="submit">Send</Button>
                  </HStack>
                </form>
              </VStack>
            </Container>
          </div>
        ) : (
          <div className="popup-container">
            <div className="popup-content">
              <h1>Welcome to TwinTalk🤝</h1>
              <p>Please Sign In to Continue:</p>
              <Button onClick={loginhandler} className="signin-button"><FcGoogle className="google-icon"/>Sign in with Google</Button>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default App;
