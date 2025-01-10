import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';  // Importing the icon library
import backgroundImage from '../../assets/BackGroundImage.png';

const ChatScreen = ({ route, navigation }) => {
  const { userId, username } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const firestore = getFirestore();
  const auth = getAuth();
  const chatId = [auth.currentUser.uid, userId].sort().join('_');

  useEffect(() => {
    const messagesRef = collection(firestore, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [chatId, firestore]);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    const messagesRef = collection(firestore, 'chats', chatId, 'messages');
    await addDoc(messagesRef, {
      text: newMessage,
      senderId: auth.currentUser.uid,
      timestamp: new Date(),
    });

    setNewMessage('');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Chat with {username}</Text>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.message,
                item.senderId === auth.currentUser.uid ? styles.myMessage : styles.theirMessage,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
              <Text style={styles.timestamp}>
                {new Date(item.timestamp?.seconds * 1000).toLocaleTimeString()}
              </Text>
            </View>
          )}
        />

        {/* Input and Send Button Container */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message..."
            placeholderTextColor="#999"
          />
          <Button title="Send" onPress={sendMessage} />
        </View>

        {/* Back Arrow Icon */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 20,
    maxWidth: '70%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007BFF',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#444',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  timestamp: {
    fontSize: 10,
    color: '#ccc',
    textAlign: 'right',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,  // Moved up
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    padding: 10,
    marginLeft: 25,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    position: 'absolute',
    bottom: 13,  // Moved down
    left: 0,
    padding: 5,
  },
});

export default ChatScreen;
