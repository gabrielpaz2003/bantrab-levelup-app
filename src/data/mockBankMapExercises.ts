export const mockBankMapExercises = [
  {
    id: 'bank-1',
    type: 'bank-map',
    title: 'Retiro de efectivo',
    statement: 'Necesitas retirar Q500 de tu cuenta para pagar el alquiler. ¿A dónde debes ir?',
    targetStation: 'atm',
    dialogue: {
      speaker: 'Sistema ATM',
      messages: [
        '¡Bienvenido al cajero automático de Bantrab! Aquí puedes realizar retiros las 24 horas del día.',
        'Para retirar efectivo, inserta tu tarjeta de débito y digita tu PIN de 4 dígitos.',
        'Puedes retirar hasta Q3,000 diarios. Recuerda que algunos ATMs cobran comisión si no son de tu banco.',
        '💡 Tip: Siempre cubre el teclado al ingresar tu PIN y no aceptes ayuda de extraños.',
      ],
    },
    feedback: {
      correct: '¡Correcto! El ATM es el lugar indicado para retiros rápidos.',
      incorrect: 'Para retirar efectivo, el ATM es tu mejor opción.',
    },
  },
  {
    id: 'bank-2',
    type: 'bank-map',
    title: 'Abrir cuenta de ahorro',
    statement: 'Quieres abrir una cuenta de ahorro para empezar a guardar dinero. ¿A dónde vas?',
    targetStation: 'helpDesk',
    dialogue: {
      speaker: 'Ejecutivo Bantrab',
      messages: [
        '¡Hola! Bienvenido a Bantrab. Me da gusto que quieras abrir una cuenta de ahorro.',
        'Para abrir tu cuenta necesitas: DPI vigente, comprobante de domicilio reciente y un depósito inicial mínimo de Q100.',
        'Tenemos varias opciones: Cuenta de Ahorro Básica sin costo de manejo, o Cuenta Plus con beneficios adicionales.',
        'Con tu cuenta recibirás una tarjeta de débito gratis y acceso a nuestra app de banca móvil.',
        '💡 Tip: Una cuenta de ahorro te ayuda a separar tu dinero y ganar intereses sobre tu saldo.',
      ],
    },
    feedback: {
      correct: '¡Exacto! En Atención al Cliente te ayudan a abrir nuevas cuentas.',
      incorrect: 'Para abrir cuentas nuevas, debes ir a Atención al Cliente.',
    },
  },
  {
    id: 'bank-3',
    type: 'bank-map',
    title: 'Pago de servicios',
    statement: 'Debes pagar tu factura de electricidad que vence mañana. ¿A dónde vas?',
    targetStation: 'paymentStation',
    dialogue: {
      speaker: 'Cajero Bantrab',
      messages: [
        '¡Buenos días! Aquí puedo ayudarte con el pago de tu factura de electricidad.',
        'Aceptamos pagos de: EEGSA, Agua, Teléfono, Cable, Internet y muchos más servicios.',
        'Puedes pagar en efectivo o con cargo directo a tu cuenta Bantrab. Con cargo a cuenta no pagas comisión.',
        '💡 Tip: También puedes programar pagos automáticos desde la app para nunca olvidar una fecha de vencimiento.',
      ],
    },
    feedback: {
      correct: '¡Muy bien! La Caja es donde se realizan pagos de servicios.',
      incorrect: 'Los pagos de servicios se hacen en la Caja.',
    },
  },
  {
    id: 'bank-4',
    type: 'bank-map',
    title: 'Consulta de saldo',
    statement: 'Quieres verificar cuánto dinero tienes disponible en tu cuenta antes de hacer una compra grande.',
    targetStation: 'atm',
    dialogue: {
      speaker: 'Sistema ATM',
      messages: [
        'Para consultar tu saldo, inserta tu tarjeta y selecciona "Consulta de Saldo".',
        'Puedes ver: saldo disponible, saldo contable y los últimos 5 movimientos de tu cuenta.',
        'La consulta de saldo en ATMs de Bantrab es completamente gratis.',
        '💡 Tip: También puedes consultar tu saldo desde la app de Bantrab sin necesidad de venir al banco.',
      ],
    },
    feedback: {
      correct: '¡Correcto! El ATM te permite consultar tu saldo rápidamente.',
      incorrect: 'Para consultas rápidas de saldo, el ATM es muy útil.',
    },
  },
  {
    id: 'bank-5',
    type: 'bank-map',
    title: 'Solicitar préstamo',
    statement: 'Necesitas un préstamo para comprar una moto. ¿A dónde debes ir para solicitar información?',
    targetStation: 'helpDesk',
    dialogue: {
      speaker: 'Ejecutivo Bantrab',
      messages: [
        '¡Claro! Te puedo dar información sobre nuestros préstamos personales.',
        'Para un préstamo necesitas: DPI, constancia de ingresos (recibos de sueldo o estados de cuenta) y referencias personales.',
        'La tasa de interés depende del monto y plazo. Por ejemplo, para Q20,000 a 24 meses, la cuota sería aproximadamente Q1,050 mensuales.',
        'Analizamos tu capacidad de pago para ofrecerte la mejor opción. La cuota no debería superar el 40% de tus ingresos.',
        '💡 Tip: Antes de solicitar un préstamo, asegúrate de que la cuota mensual cabe en tu presupuesto sin afectar tus gastos esenciales.',
      ],
    },
    feedback: {
      correct: '¡Perfecto! En Atención al Cliente te asesoran sobre préstamos.',
      incorrect: 'Para información sobre préstamos, ve a Atención al Cliente.',
    },
  },
  {
    id: 'bank-6',
    type: 'bank-map',
    title: 'Depósito a cuenta de terceros',
    statement: 'Necesitas depositar Q1,000 a la cuenta de tu hermano para ayudarlo con un gasto.',
    targetStation: 'paymentStation',
    dialogue: {
      speaker: 'Cajero Bantrab',
      messages: [
        'Para hacer un depósito a cuenta de terceros necesito el número de cuenta destino.',
        'Si no tienes el número, puedes usar el DPI del titular o su número de teléfono registrado.',
        'El depósito se acredita de inmediato si es a una cuenta Bantrab. A otros bancos puede tardar hasta 24 horas.',
        '💡 Tip: Guarda siempre tu comprobante de depósito hasta confirmar que el dinero llegó correctamente.',
      ],
    },
    feedback: {
      correct: '¡Exacto! Los depósitos se realizan en la Caja.',
      incorrect: 'Para hacer depósitos debes ir a la Caja.',
    },
  },
  {
    id: 'bank-7',
    type: 'bank-map',
    title: 'Tarjeta bloqueada',
    statement: 'Tu tarjeta de débito se bloqueó porque ingresaste mal el PIN varias veces. ¿A dónde vas?',
    targetStation: 'helpDesk',
    dialogue: {
      speaker: 'Ejecutivo Bantrab',
      messages: [
        'No te preocupes, esto es muy común y tiene solución rápida.',
        'Para desbloquear tu tarjeta necesito verificar tu identidad con tu DPI.',
        'Te voy a generar un nuevo PIN temporal que deberás cambiar en el ATM la próxima vez que lo uses.',
        'El desbloqueo es gratuito y tu tarjeta quedará activa de inmediato.',
        '💡 Tip: Si olvidas tu PIN frecuentemente, considera usar un número que puedas recordar fácilmente pero que no sea obvio como tu fecha de nacimiento.',
      ],
    },
    feedback: {
      correct: '¡Correcto! En Atención al Cliente te ayudan con problemas de tarjetas.',
      incorrect: 'Para desbloquear tarjetas, debes ir a Atención al Cliente.',
    },
  },
  {
    id: 'bank-8',
    type: 'bank-map',
    title: 'Cambio de cheque',
    statement: 'Recibiste un cheque de tu trabajo y necesitas cambiarlo por efectivo.',
    targetStation: 'paymentStation',
    dialogue: {
      speaker: 'Cajero Bantrab',
      messages: [
        'Puedo ayudarte a cambiar tu cheque. Necesito ver tu DPI y el cheque debe estar endosado en el reverso.',
        'Si el cheque es de Bantrab, el cobro es inmediato. Si es de otro banco, puede aplicar una comisión.',
        'Para cheques mayores a Q10,000 necesitamos hacer una verificación adicional que toma unos minutos.',
        '💡 Tip: Algunos cheques tienen fecha de vencimiento. Revisa que no tenga más de 6 meses de emitido.',
      ],
    },
    feedback: {
      correct: '¡Muy bien! El cambio de cheques se hace en la Caja.',
      incorrect: 'Para cambiar cheques debes ir a la Caja.',
    },
  },
];
