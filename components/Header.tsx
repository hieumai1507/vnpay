import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import React from "react";
import fonts from "@/constants/fonts";

const screenWidth = Dimensions.get("window").width;

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require("@/assets/images/BG.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.Content}>
        <Image source={require("@/assets/images/Facebook-messenger.png")} />
        <Text style={styles.text}>Bạn cần hỗ trợ?</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: screenWidth,
    height: 176, // Set your desired header height
    justifyContent: "center", // To center vertically if needed
    alignItems: "flex-end", // To center horizontally if needed
    margin: 0,
    padding: 0,
  },
  backgroundImage: {
    position: "absolute", // Image acts as background
    top: 0,
    left: 0,
    width: "100%", // Full width of header
    height: "100%", // Full height of header
  },
  Content: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 10,
  },
  text: {
    paddingLeft: 5,
    fontSize: 13,
    color: "#FFFFFF",
    fontFamily: fonts["roboto-regular"],
  },
});

export default Header;
