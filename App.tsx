import { ThemeProvider } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import theme from "./config/theme/app.theme";
import MyApp from "./app/MyApp";

export default () => (
  <ThemeProvider theme={theme}>
    <SafeAreaProvider>
      <MyApp />
    </SafeAreaProvider>
  </ThemeProvider>
);
