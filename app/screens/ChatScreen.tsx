import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, TextInput, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import axios from "axios";
import ChatMessage from "../../components/ChatMessage"; // Ajusta la ruta a tu componente ChatMessage
import { FromWho } from "../../constants/chat";
import { setChatMessageModel } from "../../helpers/chatMessage";

interface Message {
  id: string;
  text: string;
  fromWho: FromWho;
  imageUrl?: string;
}

export default function ChatScreen() {
  const flatListRef = useRef<FlatList | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [lastUserMessage, setLastUserMessage] = useState("");

  useEffect(() => {
    const sendBotResponse = async () => {
      try {
        const apiResponse = await axios.get("https://yesno.wtf/api");
        if (apiResponse.status === 200) {
          const botMessageApi = setChatMessageModel(apiResponse.data);
          console.log("apiResponse", botMessageApi);
          const newBotMessage: Message = {
            id: `me-${messages.length + 1}`,
            text: botMessageApi.text,
            fromWho: FromWho.Hers,
            imageUrl: botMessageApi.imageUrl,
          };
          setMessages([...messages, newBotMessage]);
        }
      } catch (error) {
        console.error("Error al obtener respuesta de la API:", error);
      }
    };
    // Verifica si el último mensaje del usuario termina en "?"
    if (lastUserMessage.endsWith("?")) {
      sendBotResponse();
    }
    // Limpia el mensaje
    setLastUserMessage("");
  }, [lastUserMessage, messages]);

  const sendMyMessages = () => {
    const newMyMessage: Message = {
      id: `me-${messages.length + 1}`,
      text: messageText,
      fromWho: FromWho.Me,
    };
    setMessages([...messages, newMyMessage]);
    setLastUserMessage(messageText);
    setMessageText("");
    // Desplaza automáticamente hacia abajo cuando se envía un mensaje
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim() === "") return;
    sendMyMessages();
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item, index) => `${item.id}-${index.toString()}`}
        renderItem={({ item }) => (
          <ChatMessage
            text={item.text}
            fromWho={item.fromWho}
            imageUrl={item.imageUrl}
          />
        )}
        contentContainerStyle={styles.flatListContent}
        onContentSizeChange={() => {
          if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
          }
        }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setMessageText(text)}
          onSubmitEditing={handleSendMessage}
          placeholder='End your message with a "?"'
          style={styles.input}
          value={messageText}
        />
        <Icon
          color="#517fa4"
          name="sc-telegram"
          raised
          type="evilicon"
          onPress={handleSendMessage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
    padding: 8,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    marginRight: 4,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 4,
  },
});
