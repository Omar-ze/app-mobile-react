import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import QuestionCard from "../components/QuestionCard";
import questions from "./questions";
import { useEffect, useState } from "react";
import Card from "../components/Card";

const QuizScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [remainingTime, setRemainingTime] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(questions.length);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (currentQuestion > questions.length - 1) {
      console.log("Quiz completed");
      return;
    }

    // setRemainingTime(20);

    // // run a timer of 20 sec and auto move to next question
    // const timer = setInterval(() => {
    //   setRemainingTime((prev) => {
    //     if (prev === 1) {
    //       clearInterval(timer);
    //       setCurrentQuestion((prev) => prev + 1);
    //       return 20;
    //     }
    //     return prev - 1;
    //   });
    // }, 1000);

    // return () => clearInterval(timer);
  }, [currentQuestion]);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        {/* header */}
        {totalQuestions > 0 && (
          <View>
            <Text style={styles.title}>
              Question {currentQuestion + 1}/{questions.length}
            </Text>
          </View>
        )}
        {/* body */}
        {totalQuestions ? (
          <View>
            <QuestionCard
              result={(score) => setScore(score)}
              question={questions[currentQuestion]}
            />
            <Text style={styles.time}>20 sec</Text>
          </View>
        ) : (
          <View>
            <Card title="Quiz Completed">
              <Text>Congratulations! You have completed the quiz.</Text>
              <Text>Your score is {score}</Text>
            </Card>
          </View>
        )}
        {/* footer */}
        {totalQuestions > 0 ? (
          <Pressable
            onPress={() => {
              setCurrentQuestion((prev) => prev + 1);
              setTotalQuestions((prev) => prev - 1);
            }}
            onLongPress={() => console.log("Looooonggg pressed")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Next</Text>
            <FontAwesome6
              style={styles.buttonIcon}
              name="arrow-right-long"
              size={16}
              color="white"
            />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              setCurrentQuestion(0);
              setTotalQuestions(questions.length);
              setScore(0);
            }}
            onLongPress={() => console.log("Looooonggg pressed")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Restart Quiz</Text>
            <FontAwesome6
              style={styles.buttonIcon}
              name="arrow-right-long"
              size={16}
              color="white"
            />
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  page: {
    height: "100%",
    backgroundColor: "#fdfef4",
  },
  container: {
    flex: 1, // same as height: "100%"
    justifyContent: "space-between",
    padding: 20,
    paddingVertical: 80,
  },
  title: {
    textAlign: "center",
    color: "#005055",
  },
  time: {
    textAlign: "center",
    color: "#005055",
    fontWeight: "bold",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#005055",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },
  buttonIcon: {
    position: "absolute",
    right: 25,
  },
});
