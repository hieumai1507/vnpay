import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetIcon,
} from "@/components/ui/actionsheet";
const screenWidth = Dimensions.get("window").width;
const HomeScreen = () => {
  const SelectAgency = () => {
    const [showActionsheet, setShowActionsheet] = React.useState(false);
    const handleClose = () => setShowActionsheet(false);
    return (
      <View
        style={{
          paddingBottom: 50,
        }}
      >
        <TouchableOpacity onPress={() => setShowActionsheet(true)}>
          <Text>Chọn đại lý</Text>
        </TouchableOpacity>
        <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
          <ActionsheetBackdrop />
          <ActionsheetContent>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            <ActionsheetItem onPress={handleClose}>
              <ActionsheetItemText>Tokyo Life</ActionsheetItemText>
            </ActionsheetItem>
            <ActionsheetItem onPress={handleClose}>
              <ActionsheetItemText>Sói biển</ActionsheetItemText>
            </ActionsheetItem>
            <ActionsheetItem onPress={handleClose}>
              <ActionsheetItemText>Phong Vũ</ActionsheetItemText>
            </ActionsheetItem>
            <ActionsheetItem onPress={handleClose}>
              <ActionsheetItemText>Bibomart</ActionsheetItemText>
            </ActionsheetItem>
          </ActionsheetContent>
        </Actionsheet>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("@/assets/images/BG.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View>
          <SelectAgency />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
});
