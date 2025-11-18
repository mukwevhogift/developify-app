export type Property = {
  id: string;
  name: string;
  description: string;
  images: string[];
  targetAmount: number;
  currentAmount: number;
  roi: number;
  developer: string;
  location: string;
  investmentLevel: 'Entry' | 'Mid' | 'Luxury';
  status: 'Funding' | 'Completed' | 'Constructing';
};

export const properties: Property[] = [
  {
    id: '1',
    name: 'Azure Heights Villa',
    description: 'A stunning modern villa with panoramic ocean views, featuring a private infinity pool, smart home technology, and luxurious finishes throughout. Located in a prime coastal area.',
    images: ['property-1', 'property-2'],
    targetAmount: 1500000,
    currentAmount: 950000,
    roi: 12.5,
    developer: 'Prestige Homes',
    location: 'Malibu, California',
    investmentLevel: 'Luxury',
    status: 'Funding',
  },
  {
    id: '2',
    name: 'Metropolis Tower Unit 52A',
    description: 'A high-floor apartment in the heart of the city, offering breathtaking skyline views. Comes with access to world-class amenities including a rooftop bar, gym, and concierge service.',
    images: ['property-2', 'property-4'],
    targetAmount: 750000,
    currentAmount: 750000,
    roi: 8.2,
    developer: 'Urban Developers',
    location: 'New York, New York',
    investmentLevel: 'Mid',
    status: 'Completed',
  },
  {
    id: '3',
    name: 'The Greenfield Residence',
    description: 'A spacious and modern family home in a quiet suburban neighborhood. Features a large backyard, open-plan living area, and energy-efficient appliances. Perfect for long-term rental income.',
    images: ['property-3', 'property-5'],
    targetAmount: 400000,
    currentAmount: 150000,
    roi: 9.8,
    developer: 'Family First Builders',
    location: 'Austin, Texas',
    investmentLevel: 'Entry',
    status: 'Funding',
  },
  {
    id: '4',
    name: 'The Onyx Penthouse',
    description: 'The pinnacle of urban living. This duplex penthouse offers unparalleled luxury, private elevator access, and a wrap-around terrace. An exclusive investment for discerning clients.',
    images: ['property-4', 'property-1'],
    targetAmount: 3200000,
    currentAmount: 1800000,
    roi: 15.1,
    developer: 'Apex Estates',
    location: 'Miami, Florida',
    investmentLevel: 'Luxury',
    status: 'Constructing',
  },
  {
    id: '5',
    name: 'Beachfront Bungalow',
    description: 'A charming bungalow right on the beach, offering direct access to the sand and sea. A perfect getaway property with high potential for vacation rental income.',
    images: ['property-5', 'property-6'],
    targetAmount: 650000,
    currentAmount: 250000,
    roi: 11.3,
    developer: 'Coastal Living Inc.',
    location: 'The Hamptons, New York',
    investmentLevel: 'Mid',
    status: 'Funding',
  },
  {
    id: '6',
    name: 'Downtown Retail Plaza',
    description: 'A commercial property in a high-traffic downtown area. Leased to multiple tenants, providing a stable and diversified income stream for investors.',
    images: ['property-6', 'property-3'],
    targetAmount: 2200000,
    currentAmount: 2200000,
    roi: 7.5,
    developer: 'Commerce Realty',
    location: 'Chicago, Illinois',
    investmentLevel: 'Luxury',
    status: 'Completed',
  },
];

export type Investment = {
  id: string;
  propertyId: string;
  amount: number;
  date: string;
  status: 'Active' | 'Completed' | 'Underfunded';
};

export const investments: Investment[] = [
  { id: 'inv-1', propertyId: '2', amount: 25000, date: '2023-10-15', status: 'Completed' },
  { id: 'inv-2', propertyId: '1', amount: 50000, date: '2024-01-20', status: 'Active' },
  { id: 'inv-3', propertyId: '4', amount: 100000, date: '2024-03-05', status: 'Active' },
  { id: 'inv-4', propertyId: '6', amount: 75000, date: '2023-08-11', status: 'Completed' },
];

export type Transaction = {
  id: string;
  type: 'Deposit' | 'Withdrawal' | 'Investment' | 'Dividend';
  amount: number;
  date: string;
  status: 'Completed' | 'Pending';
  description: string;
};

export const transactions: Transaction[] = [
  { id: 'txn-1', type: 'Deposit', amount: 100000, date: '2024-01-10', status: 'Completed', description: 'Bank Transfer' },
  { id: 'txn-2', type: 'Investment', amount: -50000, date: '2024-01-20', status: 'Completed', description: 'Azure Heights Villa' },
  { id: 'txn-3', type: 'Investment', amount: -100000, date: '2024-03-05', status: 'Completed', description: 'The Onyx Penthouse' },
  { id: 'txn-4', type: 'Withdrawal', amount: -10000, date: '2024-04-01', status: 'Pending', description: 'To linked bank account' },
  { id: 'txn-5', type: 'Deposit', amount: 20000, date: '2024-04-15', status: 'Completed', description: 'Bank Transfer' },
  { id: 'txn-6', type: 'Dividend', amount: 1250, date: '2024-05-01', status: 'Completed', description: 'From Metropolis Tower' },
];

export type Notification = {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
};

export const notifications: Notification[] = [
    { id: 'notif-1', title: 'Investment Successful', description: 'Your $50,000 investment in Azure Heights Villa is confirmed.', date: '2024-01-20', read: true },
    { id: 'notif-2', title: 'Withdrawal Pending', description: 'Your withdrawal request of $10,000 is being processed.', date: '2024-04-01', read: false },
    { id: 'notif-3', title: 'Funds Added', description: 'You have successfully deposited $20,000 to your wallet.', date: '2024-04-15', read: false },
    { id: 'notif-4', title: 'Dividend Received', description: 'You received a $1,250 dividend from Metropolis Tower.', date: '2024-05-01', read: false },
];
