import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  BackHandler,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import QuestionCard from "../components/QuestionCard";
import questions from "./questions";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useQuiz } from "../providers/QuizProvider";
import LottieView from "lottie-react-native";

const QuizScreen = () => {
  // const [currentQuestion, setCurrentQuestion] = useState(0);
  // // const [remainingTime, setRemainingTime] = useState(0);
  // const [totalQuestions, setTotalQuestions] = useState(questions.length);
  // const [score, setScore] = useState(0);

  // using context
  const {
    currentQuestion,
    totalQuestions,
    totalCorrect,
    onNext,
    restart,
    remainingTime,
    highScore,
  } = useQuiz();

  // useEffect(() => {
  //   if (currentQuestion > questions.length - 1) {
  //     console.log("Quiz completed");
  //     return;
  //   }

  //   setRemainingTime(20);

  //   // run a timer of 20 sec and auto move to next question
  //   const timer = setInterval(() => {
  //     setRemainingTime((prev) => {
  //       if (prev === 1) {
  //         clearInterval(timer);
  //         setCurrentQuestion((prev) => prev + 1);
  //         return 20;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [currentQuestion]);

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
            {/* <QuestionCard
              result={(score) => setScore(score)}
              question={questions[currentQuestion]}
            /> */}
            <QuestionCard
              // result={(score) => setScore(score)}
              question={questions[currentQuestion]}
            />
            <Text style={styles.time}>{remainingTime}sec</Text>
          </View>
        ) : (
          <>
            <LottieView
              style={StyleSheet.absoluteFill}
              autoPlay
              loop={false}
              source={require("../../assets/party.json")}
            />
            <Card title="Quiz Completed">
              <Text>Congratulations! You have completed the quiz.</Text>
              <Text>
                Your score is {totalCorrect}/{questions.length}
              </Text>
              <Text>High Score: {highScore}</Text>
            </Card>
            <Pressable
              // onPress={() => {
              //   setCurrentQuestion(0);
              //   setTotalQuestions(questions.length);
              //   setScore(0);
              // }}
              onPress={restart}
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
          </>
        )}
        {/* footer */}
        {totalQuestions > 0 ? (
          <Pressable
            // onPress={() => {
            //   setCurrentQuestion((prev) => prev + 1);
            //   setTotalQuestions((prev) => prev - 1);
            // }}
            onPress={onNext}
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
          <></>
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

const userContacts = [
  {
    name: "Ankit",
    email: "",
    phone: ["+91 1234567890", "+91 0987654321"],
    image: "https://randomuser.me/api/portraits",
  },
  {
    name: "John",
    email: "",
    phone: ["+91 1234567890", "+91 0987654321"],
    image: "https://randomuser.me/api/portraits",
  },
  {
    name: "Raechel",
    email: "",
    phone: ["+91 1234567890", "+91 0987654321"],
    image: "https://randomuser.me/api/portraits",
  },
];
