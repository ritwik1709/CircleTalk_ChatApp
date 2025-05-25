
import React, { useState, useEffect, useRef } from "react";
import { app } from "./firebase";
import { FcGoogle } from "react-icons/fc";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import {
  VStack,
  Container,
  Button,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, ChatIcon } from "@chakra-ui/icons";
import Message from "./Components/Message";
import ChatInput from "./Components/ChatInput";

import "./app.css";

const auth = getAuth(app);
const db = getFirestore(app);

const loginhandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

const logouthandler = () => signOut(auth);

function App() {
  const [user, setuser] = useState(false);
  const [messages, setmessages] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const divforscroll = useRef(null);

  const handleSend = async ({ message, file }) => {
    try {
      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
        file: file ? { name: file.name, type: file.type, url: file.url } : null,
      });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"));

    const unsubscribeAuth = onAuthStateChanged(auth, (data) => {
      setuser(data);
    });

    const unsubscribeMessages = onSnapshot(q, (snap) => {
      setmessages(
        snap.docs.map((item) => {
          const id = item.id;
          return { id, ...item.data() };
        })
      );
    });

    return () => {
      unsubscribeAuth();
      unsubscribeMessages();
    };
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark-theme" : "";
  }, [darkMode]);

  useEffect(() => {
    if (divforscroll.current) {
      divforscroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      <IconButton
        icon={darkMode ? <SunIcon /> : <MoonIcon />}
        onClick={() => setDarkMode((prev) => !prev)}
        position="fixed"
        top={4}
        right={4}
        zIndex={999}
        colorScheme="purple"
        variant="outline"
        borderRadius="full"
        boxShadow="md"
        aria-label="Toggle dark mode"
        size="lg"
      />

      {user ? (
        <div className="background-wrapper">
          <Container className="chat-container" maxW="container.md" p={0}>
            <VStack h="100vh" justify="space-between" spacing={0}>
              {/* Logout button at the top */}
              <Box w="full" p={2}>
                <Button onClick={logouthandler} colorScheme="red" w="full">
                  Logout
                </Button>
              </Box>

              {/* Scrollable messages area */}
              <VStack
                flex={1}
                w="full"
                className="chat-scroll"
                spacing={0}
                px={2}
                py={2}
                align="stretch"
              >
                {messages.map((item, index) => (
                  <Message
                    key={index}
                    text={item.text}
                    file={item.file}
                    user={item.uid === user.uid ? "me" : "other"}
                    uri={item.uri}
                  />
                ))}
                <div ref={divforscroll}></div>
              </VStack>

              {/* Chat input at the bottom */}
              <Box w="full" p={2}>
                <ChatInput onSend={handleSend} />
              </Box>
            </VStack>
          </Container>
        </div>
      ) : (
        <div className="popup-container ">
          <div className="popup-content ">
            <h1>
              Welcome to CircleTalk <ChatIcon />
            </h1>
            <p>Please Sign In to Continue:</p>
            <Button onClick={loginhandler} className="signin-button">
              <FcGoogle className="google-icon" />
              Sign in with Google
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
