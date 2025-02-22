import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Question } from "../components/QuestionCard";
import questions from "../app/questions";

interface QuizContextType {
  question?: Question;
  currentQuestion: number;
  onNext: () => void;
  totalQuestions: number;
  selectedOption: string;
  totalCorrect: number;
  handleOptionSelect: (option: string) => void;
  remainingTime: number;
  restart: () => void;
  highScore: number;
}

const QuizContext = createContext<QuizContextType>({} as QuizContextType);

const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(questions.length);
  const [selectedOption, setSelectedOption] = useState("");
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const question = questions[currentQuestion];

  // Load high score from storage
  useEffect(() => {
    loadHighScore();
  }, []);

  const onNext = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setTotalQuestions((prev) => prev - 1);
      setSelectedOption("");
    }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    if (option === question?.correctAnswer) {
      setTotalCorrect((prev) => prev + 1);
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setTotalCorrect(0);
    setTotalQuestions(questions.length);
    setSelectedOption("");
  };

  const saveHighScore = async (score: number) => {
    try {
      await AsyncStorage.setItem("highScore", score.toString());
    } catch (error) {
      console.error("Error saving high score", error);
    }
  };

  const loadHighScore = async () => {
    try {
      const value = await AsyncStorage.getItem("highScore");
      console.log("Loading high score", value);
      setHighScore(value ? parseInt(value) : 0);
    } catch (error) {
      console.log("Error loading high score", error);
    }
  };

  useEffect(() => {
    if (currentQuestion > questions.length - 1) {
      console.log("Quiz completed");
      return;
    }

    setRemainingTime(20);

    // run a timer of 20 sec and auto move to next question
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          onNext();
          return 20;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion]);

  // Load high score from storage
  useEffect(() => {
    // save high score
    if (totalCorrect > highScore) {
      setHighScore(totalCorrect);
      saveHighScore(totalCorrect);
    }
  }, [totalCorrect]);

  return (
    <QuizContext.Provider
      value={
        {
          question,
          selectedOption,
          totalCorrect,
          currentQuestion,
          totalQuestions,
          onNext,
          handleOptionSelect,
          restart,
          remainingTime,
          highScore,
        } as QuizContextType
      }
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;

export const useQuiz = () => useContext(QuizContext);
