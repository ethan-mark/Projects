interface Question {
  question: string;
  options?: {
    option1: string | null;
    option2: string | null;
    option3: string | null;
    option4: string | null;
  };
  icon?: string;
}

export const data: Question[] = [
  { question: "landingpage" },
  {
    question: "How soon are you looking to retire?",
    options: {
      option1: "I am already retired",
      option2: "In less than 5 years",
      option3: "In 5 years or more",
      option4: null,
    },
    icon: "Calendar",
  },
  {
    question: "How much do you have saved in your IRA and/or 401K?",
    options: {
      option1: "$500k-$750k",
      option2: "$750k-$1M",
      option3: "$1M-$2M",
      option4: ">$2M",
    },
    icon: "PiggyBank",
  },
  {
    question: "What are your main financial concerns?",
    options: {
      option1: "Running out of money",
      option2: "Long term care",
      option3: "Market risk",
      option4: "Tax rates rising",
    },
  },
  {
    question: "What is your age?",
    options: {
      option1: "<50",
      option2: "50-55",
      option3: "56-60",
      option4: "60+",
    },
  },
  { question: "What state are you in?" },
  { question: "Enter your details below" },
];
