
export interface CreditCard {
  id: string;
  name: string;
  interestRate: number; // Annual interest rate in percentage
}

export const mockCreditCardData: CreditCard[] = [
  {
    id: '1',
    name: 'Bantrab Basic',
    interestRate: 24.99,
  },
  {
    id: '2',
    name: 'Bantrab Plus',
    interestRate: 19.99,
  },
  {
    id: '3',
    name: 'Bantrab Premium',
    interestRate: 14.99,
  },
];
