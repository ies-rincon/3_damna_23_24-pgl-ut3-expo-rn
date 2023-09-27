import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { Image, Text, makeStyles } from "@rneui/themed";
import { FromWho } from "../constants/chat";

interface ChatMessageProps {
  text: string;
  fromWho: FromWho;
  imageUrl?: string;
}

// Styled Component
const useStyles = makeStyles((theme) => ({
  userContainer: {
    alignSelf: "flex-end",
    backgroundColor: theme.colors.primary,
  },
  userText: {
    color: "white",
  },
  botContainer: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.secondary,
    marginBottom: 30,
  },
  botText: {
    color: "white",
  },
}));

const ChatMessage: React.FC<ChatMessageProps> = ({
  text,
  fromWho,
  imageUrl,
}) => {
  const componentStyles = useStyles();
  const containerStyle =
    fromWho === FromWho.Me
      ? componentStyles.userContainer
      : componentStyles.botContainer;
  const textStyle =
    fromWho === FromWho.Me ? componentStyles.userText : componentStyles.botText;
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={textStyle}>{text}</Text>
      {fromWho === FromWho.Hers && imageUrl && (
        <Image
          containerStyle={styles.image}
          source={{
            uri: imageUrl,
          }}
          PlaceholderContent={<ActivityIndicator />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 8,
    maxWidth: "70%",
    marginBottom: 8,
  },
  image: {
    aspectRatio: 1,
    borderRadius: 8,
    height: 150,
    maxWidth: "70%",
    margin: 16,
    padding: 20,
  },
});

export default ChatMessage;
