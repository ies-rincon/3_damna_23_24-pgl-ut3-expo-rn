import React from "react";
import { View, Text } from "react-native";
import { Avatar, makeStyles } from "@rneui/themed";

interface FooterProps {
  text: string;
}

// Styled Component
const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    alignItems: "center",
  },
  footerText: {
    color: theme.colors.white,
    fontSize: 16,
  },
}));

const Footer: React.FC<FooterProps> = ({ text }) => {
  const styles = useStyles({ fullWidth: true });
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>{text}</Text>
    </View>
  );
};

export default Footer;
