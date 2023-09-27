import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/MyAvatar";
import ChatScreen from "./screens/ChatScreen";
import Footer from "../components/Footer";

export default function MyApp() {
  return (
    <View style={styles.container}>
      <Header
        title="Love Chat 💗"
        avatarSource={{
          uri: "https://fakeperson-face.oss-us-west-1.aliyuncs.com/Face/male/male20161085952333985.jpg",
        }}
      />
      <ChatScreen />
      <Footer text="© 2023 YES NO app" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
