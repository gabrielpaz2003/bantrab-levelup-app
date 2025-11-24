import { ExerciseModule } from '../types';

export const mockExerciseData: ExerciseModule[] = [
  {
    moduleId: 'credit-cards',
    questions: [
      {
        question: '¿Qué es una tarjeta de crédito?',
        answers: [
          { text: 'Un préstamo a corto plazo', isCorrect: true },
          { text: 'Una tarjeta de débito', isCorrect: false },
          { text: 'Dinero gratis', isCorrect: false },
          { text: 'Un documento de identidad', isCorrect: false },
        ],
      },
      {
        question: '¿Qué es el CVV de una tarjeta?',
        answers: [
          { text: 'El número de la tarjeta', isCorrect: false },
          { text: 'La fecha de vencimiento', isCorrect: false },
          { text: 'El código de seguridad', isCorrect: true },
          { text: 'El nombre del titular', isCorrect: false },
        ],
      },
    ],
  },
  {
    moduleId: 'checking-account',
    questions: [
      {
        question: '¿Qué es una cuenta de cheques?',
        answers: [
          { text: 'Una cuenta de ahorros', isCorrect: false },
          { text: 'Una cuenta para hacer depósitos y retiros', isCorrect: true },
          { text: 'Una cuenta de inversión', isCorrect: false },
          { text: 'Una cuenta para pagar impuestos', isCorrect: false },
        ],
      },
      {
        question: '¿Qué es un sobregiro?',
        answers: [
          { text: 'Un depósito grande', isCorrect: false },
          { text: 'Un retiro de dinero', isCorrect: false },
          { text: 'Cuando gastas más dinero del que tienes', isCorrect: true },
          { text: 'Un tipo de interés', isCorrect: false },
        ],
      },
    ],
  },
];
