// Credit Card Module Content - "Tu primera tarjeta de credito: entiende las reglas del juego"

export const creditCardModuleContent = {
  moduleTitle: 'Tu primera tarjeta de credito: entiende las reglas del juego',

  // Screen 1 - Chat intro: "No es dinero extra"
  screen1: {
    type: 'chat',
    title: 'No es dinero extra',
    messages: [
      {
        id: '1',
        message: 'Me dieron mi primera tarjeta de credito 😎 Dinero extraaa!',
        sender: 'friend' as const,
        senderName: 'Amigo',
      },
      {
        id: '2',
        message: 'No es dinero extra, es dinero prestado 👀',
        sender: 'self' as const,
      },
      {
        id: '3',
        message: 'Como asi? Si el plastico pasa...',
        sender: 'friend' as const,
        senderName: 'Amigo',
      },
    ],
    keyPoint:
      'Una tarjeta de credito es un prestamo en forma de plastico. Usas la tarjeta hoy y le pagas al banco despues.',
    interaction: {
      type: 'binary' as const,
      label: 'Tarjeta = dinero extra?',
      leftOption: 'Si',
      rightOption: 'No, es dinero prestado',
      correctAnswer: 'right' as const,
    },
    buttonText: 'Entendido, sigamos',
  },

  // Screen 2 - Carousel: How the card works
  screen2: {
    type: 'carousel',
    title: 'Que pasa cuando usas la tarjeta?',
    illustration: '🧑 → 🏪 → 🏦',
    cards: [
      {
        id: 'c1',
        icon: '🏪',
        title: 'La tienda recibe el pago',
        content:
          'La tienda recibe el dinero del banco. Tu no pagas nada en ese momento.',
      },
      {
        id: 'c2',
        icon: '💳',
        title: 'Ahora le debes al banco',
        content:
          'Tu ahora le debes ese dinero al banco. La deuda queda registrada.',
      },
      {
        id: 'c3',
        icon: '📄',
        title: 'Estado de cuenta',
        content:
          'Esa deuda queda registrada en tu estado de cuenta, que recibes cada mes.',
      },
    ],
    keyPoint:
      'Cuando pagas con tarjeta, el banco paga por ti. Despues tu le devolves al banco.',
    buttonText: 'Ok, ya entendi quien le paga a quien',
  },

  // Screen 3 - Timeline: Key dates
  screen3: {
    type: 'timeline',
    title: 'Dos fechas que mandan con tu tarjeta',
    timelinePoints: [
      {
        id: 't1',
        label: 'Fecha de corte',
        icon: '📆',
        description: 'Dia en que el banco "cierra" tu mes y suma todo lo que gastaste.',
        position: 0.3,
      },
      {
        id: 't2',
        label: 'Fecha de pago',
        icon: '⏰',
        description:
          'Ultimo dia para pagar lo que gastaste sin generar intereses.',
        position: 0.7,
      },
    ],
    example:
      'Si tu fecha de corte es el 10, todo lo que gastes del 11 al 10 del siguiente mes se va a ese estado de cuenta.',
    buttonText: 'Continuar',
  },

  // Screen 4 - Toggle: When are interests charged
  screen4: {
    type: 'toggle',
    title: 'Cuando pagas intereses?',
    description:
      'Si pagas todo lo que gastaste antes o en tu fecha de pago, casi siempre no hay intereses. Si pagas menos o te atrasas, se generan intereses.',
    options: [
      {
        id: 'opt1',
        label: 'Pago a tiempo',
        icon: '✅',
        iconColor: '#4CAF50',
        title: 'Pago a tiempo y completo',
        description: 'Pagas lo que gastaste, sin interes extra.',
        result: 'Resultado: No interes',
      },
      {
        id: 'opt2',
        label: 'Pago tarde',
        icon: '⚠️',
        iconColor: '#FF5722',
        title: 'Pago tarde o solo una parte',
        description: 'El banco te cobra intereses por el dinero pendiente.',
        result: 'Resultado: Pagas mas de lo que gastaste',
      },
    ],
    buttonText: 'Continuar',
  },

  // Screen 5 - Comparison: Minimum payment vs total payment
  screen5: {
    type: 'comparison',
    title: 'Pago minimo vs pago total',
    items: [
      {
        id: 'min',
        label: 'Pago minimo',
        description:
          'Monto mas pequeno que te deja pagar el banco para no estar en mora, pero sigue quedando deuda.',
        barColor: '#FF9800',
        barPercentage: 15,
        resultText: 'Deuda baja poquito, intereses siguen',
      },
      {
        id: 'total',
        label: 'Pago total',
        description:
          'Todo lo que gastaste en el periodo. Si lo pagas a tiempo, normalmente no hay intereses.',
        barColor: '#4CAF50',
        barPercentage: 100,
        resultText: 'Dejas la cuenta en cero, evitas intereses',
      },
    ],
    sliderConfig: {
      leftLabel: 'Pagar solo minimo',
      rightLabel: 'Pagar mas / total',
      calculateResult: (value: number) => {
        if (value < 0.2) {
          return { months: 999, interestLevel: 'high' as const };
        } else if (value < 0.5) {
          return { months: 18, interestLevel: 'high' as const };
        } else if (value < 0.8) {
          return { months: 6, interestLevel: 'medium' as const };
        } else {
          return { months: 1, interestLevel: 'low' as const };
        }
      },
    },
    buttonText: 'Continuar',
  },

  // Screen 6 - Tips: Risks and best practices
  screen6: {
    type: 'tips',
    title: 'Riesgos tipicos y buenas practicas',
    warningCards: [
      {
        id: 'w1',
        icon: '💸',
        title: 'Gastar como si fuera dinero extra',
        description:
          'Cuando usas la tarjeta sin pensar, acumulas deudas sin darte cuenta. Recuerda: es dinero prestado.',
        result: 'Te endeudas sin darte cuenta',
        type: 'warning' as const,
      },
      {
        id: 'w2',
        icon: '🐌',
        title: 'Pagar solo el minimo siempre',
        description:
          'El pago minimo parece comodo, pero hace que la deuda dure muucho mas y pagues muchos intereses.',
        result: 'Sales de la deuda muuuy lento',
        type: 'warning' as const,
      },
      {
        id: 'w3',
        icon: '📅',
        title: 'No ver la fecha de pago',
        description:
          'Olvidar la fecha de pago te genera mora, cargos extra y puede afectar tu historial crediticio.',
        result: 'Te cobran mora y afectas tu historial',
        type: 'warning' as const,
      },
    ],
    tipCards: [
      {
        id: 't1',
        icon: '👁️',
        title: 'Ver tu estado de cuenta cada mes',
        description:
          'Revisa cuanto gastaste y cuando debes pagar. Asi evitas sorpresas.',
        type: 'tip' as const,
      },
      {
        id: 't2',
        icon: '⏰',
        title: 'Pagar a tiempo y mas del minimo',
        description:
          'Si puedes, paga el total. Si no, al menos paga mas del minimo para reducir intereses.',
        type: 'tip' as const,
      },
      {
        id: 't3',
        icon: '🎯',
        title: 'Usar la tarjeta para cosas que si puedes pagar',
        description:
          'Antes de comprar, preguntate: puedo pagar esto a fin de mes? Si no, mejor espera.',
        type: 'tip' as const,
      },
    ],
    buttonText: 'Listo, ya entiendo los basicos 🙌',
  },
};

// Export screen content types for type safety
export type CreditCardScreen1 = typeof creditCardModuleContent.screen1;
export type CreditCardScreen2 = typeof creditCardModuleContent.screen2;
export type CreditCardScreen3 = typeof creditCardModuleContent.screen3;
export type CreditCardScreen4 = typeof creditCardModuleContent.screen4;
export type CreditCardScreen5 = typeof creditCardModuleContent.screen5;
export type CreditCardScreen6 = typeof creditCardModuleContent.screen6;

// Content sequence for navigation
export const creditCardContentSequence = [
  { screenIndex: 1, type: 'chat' },
  { screenIndex: 2, type: 'carousel' },
  { screenIndex: 3, type: 'timeline' },
  { screenIndex: 4, type: 'toggle' },
  { screenIndex: 5, type: 'comparison' },
  { screenIndex: 6, type: 'tips' },
];
