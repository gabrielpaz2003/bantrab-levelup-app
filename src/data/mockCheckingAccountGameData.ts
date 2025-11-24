export interface GameQuestion {
  id: string;
  question: string;
  correctAnswer: 'yes' | 'no';
}

export const mockCheckingAccountGameData: GameQuestion[] = [
  {
    id: '1',
    question: 'Can you use your checking account to pay for groceries?',
    correctAnswer: 'yes',
  },
  {
    id: '2',
    question: 'Does a checking account pay you high interest on your balance?',
    correctAnswer: 'no',
  },
  {
    id: '3',
    question: 'Is it a good idea to write your PIN on your debit card?',
    correctAnswer: 'no',
  },
  {
    id: '4',
    question: 'Can you withdraw cash from an ATM with your debit card?',
    correctAnswer: 'yes',
  },
  {
    id: '5',
    question: 'Should you share your online banking password with friends?',
    correctAnswer: 'no',
  },
  {
    id: '6',
    question: 'Is a checking account a good place to save for retirement?',
    correctAnswer: 'no',
  },
  {
    id: '7',
    question: 'Can you set up automatic bill payments from your checking account?',
    correctAnswer: 'yes',
  },
  {
    id: '8',
    question: 'Is your money in a checking account insured?',
    correctAnswer: 'yes',
  },
  {
    id: '9',
    question: 'Do you have to pay a fee every time you swipe your debit card?',
    correctAnswer: 'no',
  },
  {
    id: '10',
    question: "Can you deposit a check using your bank's mobile app?",
    correctAnswer: 'yes',
  },
];
