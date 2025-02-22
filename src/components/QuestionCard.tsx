import { View, Text, StyleSheet } from "react-native";
import AnswerOption from "./AnswerOption";
import { useEffect, useState } from "react";
import Card from "./Card";

interface Props {
  question: { title: string; options: string[]; correctAnswer: string };
  result: (totalCorrect: number) => void;
}

const QuestionCard = ({ question, result }: Props) => {
  // const selectedOption = question.options[0];
  const [selectedOption, setSelectedOption] = useState("");
  const [totalCorrect, setTotalCorrect] = useState(0);

  useEffect(() => {
    result(totalCorrect);
  }, [totalCorrect]);

  return (
    <Card title={question.title}>
      <View style={{ gap: 8 }}>
        {question.options.map((option) => (
          <AnswerOption
            handlePress={(option) => {
              setSelectedOption(option);
              if (option === question.correctAnswer) {
                setTotalCorrect((prev) => prev + 1);
              }
            }}
            key={option}
            option={option}
            isSelected={option === selectedOption}
            isCorrect={option === question.correctAnswer}
            isWrong={option !== question.correctAnswer}
          />
        ))}
      </View>
    </Card>
  );
};

export default QuestionCard;

export const styles = StyleSheet.create({
  questionCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  question: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 25,
    textAlign: "center",
  },
});
