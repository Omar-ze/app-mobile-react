import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
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
}

const QuizContext = createContext<QuizContextType>({} as QuizContextType);

const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(questions.length);
  const [selectedOption, setSelectedOption] = useState("");
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  const question = questions[currentQuestion];

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
        } as QuizContextType
      }
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;

export const useQuiz = () => useContext(QuizContext);
