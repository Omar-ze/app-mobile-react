# Demo Quiz App

This project is a Quiz Application built using React Native. The application allows users to take quizzes on various topics and tracks their scores. Good for practicing your knowledge on React, React Native, Expo, State Management.

## Project Structure

The project has the following structure:

```
quiz/
├── src/
│   ├── components/
│   │   ├── Question.js
│   │   ├── Quiz.js
│   │   └── Score.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── QuizScreen.js
│   │   └── ResultScreen.js
│   ├── assets/
│   │   ├── images/
│   │   └── fonts/
│   ├── App.js
│   └── index.js
├── README.md
└── package.json
```

### Components

- **Question.js**: Renders individual quiz questions.
- **Quiz.js**: Manages the quiz logic and state.
- **Score.js**: Displays the user's score at the end of the quiz.

### Screens

- **HomeScreen.js**: The landing page of the app.
- **QuizScreen.js**: The screen where the quiz takes place.
- **ResultScreen.js**: Displays the results after the quiz is completed.

### Assets

- **images/**: Contains image assets used in the app.
- **fonts/**: Contains custom fonts used in the app.

## Getting Started

To get started with the project, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd quiz
npm install
```

Run the application:

```bash
npm start
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.