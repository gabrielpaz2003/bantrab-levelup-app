export const mockCreditExercises = [
  {
    id: '1',
    type: 'multiple-choice',
    title: 'Acierta la cuota',
    statement: 'Imagina que pides un crédito de Q10,000 a 12 meses con una tasa de 18% anual. ¿Cuál de estas cuotas mensuales crees que se parece más a la realista?',
    options: ['Q400 al mes', 'Q950 al mes', 'Q1,100 al mes'],
    correctAnswerIndex: 1,
    feedback: {
      correct: '¡Bien! Una cuota alrededor de Q900–Q950 es razonable para un crédito de Q10,000 a 12 meses con esa tasa.',
      incorrect: {
        0: 'Q400 es demasiado bajo para ese monto y plazo. Una cuota tan pequeña casi no alcanzaría a cubrir capital + intereses.',
        2: 'Q1,100 es más alta de lo que normalmente verías para ese ejemplo. Una cuota cercana a Q900–Q950 es más realista.',
      },
    },
  },
  {
    id: '2a',
    type: 'binary-swipe',
    title: '¿Interés simple o compuesto?',
    statement: 'Carlos debe Q5,000 y cada mes le cobran intereses solo sobre esos Q5,000, sin sumar intereses anteriores.',
    options: ['Interés simple', 'Interés compuesto'],
    correctAnswer: 'Interés simple',
    feedback: {
      correct: '¡Exacto! En interés simple, el interés se calcula siempre sobre el mismo capital inicial.',
      incorrect: 'Aquí no es interés compuesto. En el ejemplo, siempre se cobran intereses sobre los mismos Q5,000.',
    },
  },
  {
    id: '2b',
    type: 'binary-swipe',
    title: '¿Interés simple o compuesto?',
    statement: 'Ana debe Q5,000 y cada mes le cobran intereses sobre lo que debe más los intereses que ya se habían sumado antes.',
    options: ['Interés simple', 'Interés compuesto'],
    correctAnswer: 'Interés compuesto',
    feedback: {
      correct: '¡Así es! En interés compuesto, cada periodo se calculan intereses sobre el capital + los intereses acumulados.',
      incorrect: 'No es interés simple. Los intereses se van sumando a la deuda y luego le cobran intereses sobre ese nuevo total.',
    },
  },
  {
    id: '3',
    type: 'guesstimate-slider',
    title: '¿Cuánto terminarás pagando?',
    statement: 'Pides un crédito de Q8,000 a 24 meses con una tasa de 20% anual. Al final del crédito, ¿cuánto crees que habrás pagado en total (capital + intereses)?',
    min: 8000,
    max: 12000,
    initialValue: 8000,
    correctValue: 9750, // Approximate
    resultDisplay: {
      type: 'bars',
      capital: 8000,
      interest: 1750,
      total: 9750,
    },
    options: ['Más de Q9,000', 'Más de Q10,000', 'Más de Q11,000'],
    correctAnswerIndex: 0,
    feedback: {
      correct: '¡Correcto! Aunque solo pediste Q8,000, con plazo de 24 meses y tasa del 20% anual, vas a terminar pagando bastante más de Q9,000 en total.',
      incorrect: 'En este ejemplo, el total no llega tan alto, pero sí supera los Q9,000.',
    }
  },
  {
    id: '4',
    type: 'order-drag',
    title: 'Ordena el proceso de obtener un crédito',
    statement: 'Estos son pasos comunes al pedir un crédito. Arrástralos para ponerlos en el orden correcto:',
    items: [
      'Llenar solicitud',
      'Presentar documentos',
      'Evaluación del banco',
      'Firma de contrato',
      'Desembolso',
    ],
    correctOrder: [
      'Llenar solicitud',
      'Presentar documentos',
      'Evaluación del banco',
      'Firma de contrato',
      'Desembolso',
    ],
    feedback: {
      correct: '¡Exacto! Ese es el orden correcto del proceso.',
      incorrect: 'Casi lo tienes. Recordá que primero debe existir una solicitud y tus documentos, luego el banco evalúa tu capacidad de pago y solo después de firmar, viene el desembolso.',
    },
  },
  {
    id: '5',
    type: 'multiple-choice',
    title: '¿Qué crédito te conviene más?',
    statement: 'Necesitas un crédito de Q10,000. El banco te ofrece dos opciones. Si tu objetivo es pagar menos intereses en total, ¿qué opción te conviene más?',
    options: [
      'Opción A: 12 meses, 20% anual, Q925 aprox.',
      'Opción B: 12 meses, 25% anual, Q950 aprox.',
    ],
    correctAnswerIndex: 0,
    feedback: {
      correct: '¡Bien pensado! Si el plazo y el monto son iguales, una tasa más baja casi siempre significa menos intereses pagados en total.',
      incorrect: 'Ojo aquí. Aunque la diferencia en la cuota no parezca enorme, una tasa de 25% significa que pagas más intereses que con una tasa de 20%, si el monto y el plazo son iguales.',
    },
  },
];
