import inquirer from 'inquirer';
import chalk from 'chalk';
import * as chalkAnimation from 'chalk-animation';

// User Registration
const questionsForUserRegistration = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter your name:',
    },
    {
        type: 'input',
        name: 'rollNumber',
        message: 'Enter your roll number (between 01 and 100):',
        validate: (input: string) => {
            const rollNumber = parseInt(input);
            if (rollNumber >= 1 && rollNumber <= 100) {
                return true;
            }
            return 'Roll number must be between 01 and 100.';
        },
    },
    {
        type: 'password',
        name: 'password',
        message: 'Enter the password:',
        mask: '*',
        validate: (input: string) => {
            if (input === '0000') {
                return true;
            }
            return 'Incorrect password. (Password is 4 Digit PIN)';
        },
    },
];

inquirer.prompt(questionsForUserRegistration).then((answers) => {
    const { name } = answers;

    

    console.log(chalk.bold.blue(`\n Welcome ${name}! for entry test of Web Development Program.\n`));

    // Instructions
    console.log(chalk.bold.yellow(`You will have 20 minutes to complete the quiz. There will be at least 10 multiple-choice questions. You must score 60% or higher to pass.`));    

    // Add a 3-second timer before starting the quiz
    setTimeout(() => {
        startQuiz();
    }, 3000);

    function startQuiz() {
    

        // Quiz Questions
        const questions = [
            {
                question: chalk.bold.bgGray('What does HTML stand for?'),
                options: ['A. Hyper Transfer Markup Language', 'B. Hyper Text Markup Language', 'C. High Tech Modern Language', 'D. Hyperlink and Text Markup Language'],
                answer: 'B'
            },
            {
                question: chalk.bold.bgGray('Which HTML tag is used for creating a heading?'),
                options: ['A. <p>', 'B. <h1>', 'C. <a>', 'D. <div>'],
                answer: 'B'
            },
            {
                question: chalk.bold.bgGray('What does CSS stand for?'),
                options: ['A. Computer Style Sheets', 'B. Creative Style Sheets', 'C. Cascading Style Sheets', 'D. Colorful Style Sheets'],
                answer: 'C'
            },
            {
                question: chalk.bold.bgGray('Which HTML tag is used for creating a link?'),
                options: ['A. <link>', 'B. <a>', 'C. <href>', 'D. <url>'],
                answer: 'B'
            },
            {
                question: chalk.bold.bgGray('What is the correct CSS property for changing the text color of an element?'),
                options: ['A. text-color', 'B. font-color', 'C. color', 'D. text-style'],
                answer: 'C'
            },
            {
                question: chalk.bold.bgGray('In HTML, what tag is used to create a line break?'),
                options: ['A. <lb>', 'B. <br>', 'C. <linebreak>', 'D. <newline>'],
                answer: 'B'
            },
            {
                question: chalk.bold.bgGray('Which HTML tag is used for creating a paragraph?'),
                options: ['A. <p>', 'B. <h1>', 'C. <a>', 'D. <div>'],
                answer: 'A'
            },
            {
                question: chalk.bold.bgGray('What is the default display property for a <div> element in CSS?'),
                options: ['A. inline', 'B. block', 'C. inline-block', 'D. none'],
                answer: 'B'
            },
            {
                question: chalk.bold.bgGray('How do you add a comment in HTML?'),
                options: ['A. <!-- This is a comment -->', 'B. // This is a comment', 'C. /* This is a comment */', 'D. # This is a comment'],
                answer: 'A'
            },
            {
                question: chalk.bold.bgGray('Which HTML tag is used for creating an ordered list?'),
                options: ['A. <ul>', 'B. <ol>', 'C. <li>', 'D. <list>'],
                answer: 'B'
            }
        ];

        let score = 0;

        async function askQuestions() {
            for (let i = 0; i < questions.length; i++) {
                const currentQuestion = questions[i];
                console.log(`\nQuestion ${i + 1}: ${currentQuestion.question}`);
                for (let j = 0; j < currentQuestion.options.length; j++) {
                    console.log(currentQuestion.options[j]);
                }

                const answer = await inquirer.prompt({
                    type: 'input',
                    name: 'answer',
                    message: 'Enter your answer (A, B, C, or D):',
                });

                // Answer Validation
                if (answer.answer.toUpperCase() === currentQuestion.answer.toUpperCase()) {
                    console.log(chalk.green.bold('\nCorrect!'));
                    score++;
                } else {
                    console.log(chalk.red.bold('\nIncorrect!'));
                }

                // Feedback
                console.log(chalk.blue.bold(`\nCorrect answer: ${currentQuestion.answer}\n`));
            }

            showResults();
        }

        function showResults() {
            console.log(chalk.blue(`${name}, your score is ${score}/${questions.length} (${((score / questions.length) * 100).toFixed(2)}%).`));
            if (((score / questions.length) * 100) >= 60) {
                console.log(chalk.bold.bgGreen('Congratulations, you are passed for web development program!'));
            } else {
                console.log(chalk.bold.bgRed('\nSorry, you failed. Try next time!'));
            }
        }

        // Start the quiz by asking questions
        askQuestions();
    }
});