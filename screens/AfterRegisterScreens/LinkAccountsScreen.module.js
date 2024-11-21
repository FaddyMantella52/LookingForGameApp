import { StyleSheet } from "react-native";

export default StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Cover the entire screen with background image
  },
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    color: "#FFFFFF",
    textAlign: "center", // Center the title
  },
  subtitle: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20, // Space out from the buttons
  },
  accountIcon: {
    width: 100, // Adjust the size of the icons
    height: 100,
    marginBottom: 10, // Space out from the text
  },
  button: {
    backgroundColor: "#007BFF", // Primary button color (blue)
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  skipButton: {
    backgroundColor: "#A9A9A9", // Grey color for skip button
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff", // White text color for buttons
    fontSize: 18,
    fontWeight: "bold",
  },
});
