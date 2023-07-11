const quizData = [
    {
      question: "What does HTML stand for?",
      choices: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
      answer: 0
    },
    {
      question: "Which HTML element is used to define the title of a document?",
      choices:["<h1>", "<title>", "<head>"],
      answer: 1
    },
    {
      question: "Which HTML element is used to display a picture?",
      choices: ["<picture>", "<img>", "<src>"],
      answer: 1
    },
 {
    question: "What is JavaScript?",
    choices: ["A markup language", "A programming language", "A scripting language"],
    answer: 1
  },
  {
    question: "Which of the following is not a JavaScript data type?",
    choices: ["Number", "Boolean", "String", "Float"],
    answer: 3
  },
  {
    question:"How do you write 'Hello World' in JavaScript?",
    choices: ["console.log('Hello World')", "print('Hello World')", "System.out.println('Hello World')"],
    answer: 0
  },
 {
    question: "What does CSS stand for?",
    choices: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets"],
    answer: 0
  },
  {
    question: "Which CSS property is used to change the background color of an element?",
    choices: ["color", "background-color", "font-size"],
    answer: 1
 },
  {
    question: "Which CSS property is used to control the spacing between lines of text?",
    choices: ["margin", "padding", "line-height"],
    answer: 2
  },
 {
    question: "What does API stand for?",
    choices: ["Application Program Interface", "Application Programming Interface", "All Purpose Interface"],
    answer: 1
  },
  {
    question: "Which method is used to make a GET request in JavaScript to retrieve data from an API?",
    choices: ["POST", "GET", "PUT"],
    answer: 1
  },
  {
    question: "Which of the following is NOT a Web API?",
    choices: ["DOM API", "GIR API", "SQL API", "Canvas API"],
    answer: 2
  },
 {
    question: "What symbol should you use to exclude a specific word from your Google search?",
    choices: ["*", "-", "+", "!"],
    answer: 1
  },
  {
    question: "Which operator is used to search for an exact phrase on Google?",
    choices: ["AND", "OR", "NOT","\""],
    answer: 3
  },
  {
    question: "Which Google search operator is used to limit the search results to a specific website or domain?",
    choices: ["site:", "link:", "related:", "cache:"],
    answer: 0
  },
    // Add more questions here
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let time = 180;
  const countdownElement = document.getElementById('countdown');
  const questionContainer = document.getElementById('questions-container');
  const submitButton = document.getElementById('submit');
  
  function displayQuestion() {
    const question = quizData[currentQuestion];
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `
      <h3>${question.question}</h3>
      <ul class="choices">
        ${question.choices
          .map(
            (choice, index) => `
            <li>
              <input type="radio" id="choice${index}" name="question${currentQuestion}" value="${index}">
              <label for="choice${index}">${choice}</label>
            </li>
          `
          )
          .join('')}
      </ul>
    `;
    questionContainer.appendChild(questionDiv);
  }
  
  function selectAnswer() {
    const selectedChoice = document.querySelector(`input[name="question${currentQuestion}"]:checked`);
    if (selectedChoice) {
      const answer = parseInt(selectedChoice.value);
      if (answer === quizData[currentQuestion].answer) {
        score++;
      }
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        questionContainer.innerHTML = '';
        displayQuestion();
      } else {
        endQuiz();
      }
    }
  }
  
  function endQuiz() {
    clearInterval(timer);
    questionContainer.innerHTML = `
      <p>Quiz completed! Your score is ${score}/${quizData.length}.</p>
    `;
    submitButton.disabled = true;
  }
  
  function countdown() {
    time--;
    countdownElement.innerText = time;
    if (time <= 0) {
      endQuiz();
    }
  }
  
  document.getElementById('quiz-form').addEventListener('submit', function (e) {
    e.preventDefault();
    selectAnswer();
  });
  
  displayQuestion();
  
  const timer = setInterval(countdown, 1000);
  
