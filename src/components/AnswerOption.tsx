import { View, Text, StyleSheet, Pressable } from "react-native";

const AnswerOption = ({
  option,
  isSelected,
  handlePress,
  isCorrect,
  isWrong,
}: {
  option: string;
  isSelected?: boolean;
  handlePress: (option: string) => void;
  isCorrect: boolean;
  isWrong: boolean;
}) => {
  return (
    <Pressable onPress={() => handlePress(option)}>
      <View
        style={[
          styles.container,
          { backgroundColor: isSelected ? "#e1f396" : "white" },
        ]}
      >
        <Text>{option}</Text>

        <Text>
          {isSelected && isCorrect && " ✔️"}
          {isSelected && isWrong && " ❌"}
        </Text>
      </View>
    </Pressable>
  );
};

export default AnswerOption;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 20,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
