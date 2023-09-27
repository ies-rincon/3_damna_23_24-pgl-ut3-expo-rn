// Modules
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Avatar, makeStyles } from "@rneui/themed";
// Types
import type { ImageSourcePropType } from "react-native";
interface HeaderProps {
  title: string;
  avatarSource: ImageSourcePropType;
}
type Props = {
  fullWidth?: boolean;
};

// Styled Component
const useStyles = makeStyles((theme, props: Props) => ({
  container: {
    backgroundColor: theme.colors.primary,
    paddingTop: props.fullWidth ? 36 : 28,
  },
  text: {
    color: theme.colors.white,
  },
}));

const Header: React.FC<HeaderProps> = ({ title, avatarSource }) => {
  const inlineStyles = useStyles({ fullWidth: true });
  return (
    <View style={[styles.header, inlineStyles.container]}>
      <Avatar size="medium" rounded source={avatarSource} />
      <Text style={[styles.title, inlineStyles.text]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
  },
});

export default Header;
