// Bantrab Products Content - "Productos de Tarjetas de Crédito Bantrab"

// Import card images
const tcClasica = require('../../assets/images/tc_clasica.png');
const tcOro = require('../../assets/images/tc_oro.png');
const tcPlatinum = require('../../assets/images/tc_platinum.png');
const tcInfinite = require('../../assets/images/tc_infinite.png');
const tcWay = require('../../assets/images/tc_way.png');
const tcSeleccion = require('../../assets/images/tc_seleccion.png');
const tcReal = require('../../assets/images/tc_real.png');

export const bantrabProductsContent = {
  moduleTitle: 'Conoce las Tarjetas de Crédito Bantrab',

  // Screen 1 - Carousel: Types of cards
  screen1: {
    type: 'carousel',
    title: 'Tipos de Tarjetas Bantrab',
    illustration: '💳',
    cards: [
      {
        id: 'c1',
        image: tcClasica,
        title: 'Clásica',
        content:
          'La tarjeta de entrada. Edad mínima: 18 años. Salario mínimo: Q1,500 (débito automático). Límite máximo: Q11,999.99',
      },
      {
        id: 'c2',
        image: tcOro,
        title: 'Oro',
        content:
          'Para clientes con mayor capacidad. Edad mínima: 21 años. Salario mínimo: Q8,000. Límite máximo: Q23,999.99',
      },
      {
        id: 'c3',
        image: tcPlatinum,
        title: 'Platinum',
        content:
          'Tarjeta premium con más beneficios. Edad mínima: 21 años. Salario mínimo: Q16,000. Límite máximo: Q48,000',
      },
      {
        id: 'c4',
        image: tcInfinite,
        title: 'Infinite',
        content:
          'La tarjeta más exclusiva. Edad mínima: 25 años. Salario mínimo: Q40,000. Límite máximo: Q200,000',
      },
    ],
    keyPoint:
      'Cada tarjeta tiene requisitos diferentes. Elige la que se ajuste a tu perfil y necesidades.',
    buttonText: 'Ver tasas de interés',
  },

  // Screen 2 - Comparison: Interest rates
  screen2: {
    type: 'comparison',
    title: 'Tasas de Interés Mensual',
    items: [
      {
        id: 'clasica',
        label: 'Clásica',
        description: 'Pago por Remesa: 4.25% (Q) / 3.15% ($). Pago Voluntario: 5.00% (Q) / 3.15% ($)',
        barColor: '#E31C79',
        barPercentage: 100,
        resultText: 'Tasa más alta, ideal para comenzar',
      },
      {
        id: 'oro',
        label: 'Oro',
        description: 'Pago por Remesa: 4.20% (Q) / 3.04% ($). Pago Voluntario: 4.95% (Q) / 3.04% ($)',
        barColor: '#FFD700',
        barPercentage: 85,
        resultText: 'Tasa competitiva con beneficios adicionales',
      },
      {
        id: 'platinum',
        label: 'Platinum',
        description: 'Pago por Remesa: 4.10% (Q) / 2.21% ($). Pago Voluntario: 4.85% (Q) / 2.21% ($)',
        barColor: '#A0A0A0',
        barPercentage: 70,
        resultText: 'Tasas preferenciales',
      },
      {
        id: 'infinite',
        label: 'Infinite',
        description: 'Pago por Remesa: 3.50% (Q) / 1.88% ($). Pago Voluntario: 4.25% (Q) / 1.88% ($)',
        barColor: '#1a1a1a',
        barPercentage: 50,
        resultText: 'Las mejores tasas del mercado',
      },
    ],
    buttonText: 'Ver programa de puntos',
  },

  // Screen 3 - Toggle: Points program
  screen3: {
    type: 'toggle',
    title: 'El Mejor Programa de Puntos',
    description:
      'Acumula puntos por cada compra que realices con tu tarjeta Bantrab. Los puntos varían según el tipo de tarjeta.',
    options: [
      {
        id: 'opt1',
        label: 'Clásica / Oro',
        icon: '⭐',
        iconColor: '#FFD700',
        title: 'Tarjetas Clásica y Oro',
        description: '1 punto por cada Q8.00 gastados. 1 punto por cada $2.00 gastados.',
        result: 'Acumulación estándar de puntos',
      },
      {
        id: 'opt2',
        label: 'Platinum / Infinite',
        icon: '🌟',
        iconColor: '#00b5b0',
        title: 'Tarjetas Platinum e Infinite',
        description: '1 punto por cada Q5.00 gastados. 1 punto por cada $2.00 gastados.',
        result: 'Acumulación acelerada de puntos',
      },
    ],
    buttonText: 'Ver beneficios',
  },

  // Screen 4 - Tips: Benefits
  screen4: {
    type: 'tips',
    title: 'Beneficios de las Tarjetas Bantrab',
    warningCards: [],
    tipCards: [
      {
        id: 't1',
        icon: '🎁',
        title: 'Beneficios Directos',
        description:
          'Membresía anual sin costo, tasa competitiva, cambio de puntos por efectivo, Visa Cuota desde el día 1, opción a extra-financiamiento.',
        type: 'tip' as const,
      },
      {
        id: 't2',
        icon: '💰',
        title: 'Beneficios de Uso',
        description:
          'Descuentos y promociones, reintegro en promociones, traslado a cuotas, retiro de efectivo en cajeros y Bantrab en línea.',
        type: 'tip' as const,
      },
      {
        id: 't3',
        icon: '🛡️',
        title: 'Beneficios de VISA',
        description:
          'Seguro y asistencia VISA internacional sin costo adicional en todas las tarjetas.',
        type: 'tip' as const,
      },
    ],
    buttonText: 'Ver marcas compartidas',
  },

  // Screen 5 - Carousel: Co-branded cards
  screen5: {
    type: 'carousel',
    title: 'Marcas Compartidas',
    illustration: '🤝',
    cards: [
      {
        id: 'mc1',
        image: tcWay,
        title: 'Bantrab - Agencias Way',
        content:
          '10% de descuento en primera compra, promociones exclusivas de temporada, 5% de descuento permanente adicional por cada compra.',
      },
      {
        id: 'mc2',
        image: tcSeleccion,
        title: 'Bantrab - Mi Selección',
        content:
          'Sorteos para vivir la Experiencia Bantrab con la Selección Nacional, 15% descuento en mercadería oficial, 20% descuento en canchas Futeca.',
      },
      {
        id: 'mc3',
        image: tcReal,
        title: 'Bantrab - Real Madrid',
        content:
          'Sorteos para ganar viajes a Madrid, España. Sorteo de camisolas del Real Madrid. Descuentos y promociones en comercios afiliados.',
      },
    ],
    keyPoint:
      'Las tarjetas de marca compartida te dan beneficios adicionales según tus intereses.',
    buttonText: 'Finalizar',
  },
};

// Export for type safety
export type BantrabProductsScreen1 = typeof bantrabProductsContent.screen1;
export type BantrabProductsScreen2 = typeof bantrabProductsContent.screen2;
export type BantrabProductsScreen3 = typeof bantrabProductsContent.screen3;
export type BantrabProductsScreen4 = typeof bantrabProductsContent.screen4;
export type BantrabProductsScreen5 = typeof bantrabProductsContent.screen5;
