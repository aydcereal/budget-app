export type Debt = {
    id: string;
    name: string;
    balance: number;
    apr: number;
    minPayment: number;

}

export const debts: Debt[] = [
  { 
    id: "1",
    name: "Chase Freedom",
    balance: 4200.75,
    apr: 19.99,
    minPayment: 120,
  },
  {
    id: "2",
    name: "Capital One Quicksilver",
    balance: 1850.4,
    apr: 24.99,
    minPayment: 55,
  },
  {
    id: "3",
    name: "Discover Student",
    balance: 980.0,
    apr: 17.24,
    minPayment: 35,
  },
  {
    id: "4",
    name: "Car Loan",
    balance: 9600.0,
    apr: 6.5,
    minPayment: 285,
  },
  {
    id: "5",
    name: "Personal Loan",
    balance: 3200.0,
    apr: 11.9,
    minPayment: 150,
  },
];
