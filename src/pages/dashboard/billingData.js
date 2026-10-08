export const billingData = {
  plan: { name: 'Pro', price: 45, card: '4291' },
  currentUsage: 684,
  estimatedTotal: 924,
  monthlyBudget: 1200,
  projects: [
    { name: 'Website', environment: 'Production', amount: 248, percent: 36 },
    { name: 'API', environment: 'Production', amount: 216, percent: 32 },
    { name: 'Dashboard', environment: 'Staging', amount: 134, percent: 20 },
    { name: 'Storefront', environment: 'Production', amount: 86, percent: 13 },
  ],
  dailyUsage: [66, 81, 72, 106, 93, 115, 151],
  invoices: [
    {
      id: 'inv-001', number: 'INV-001', period: '01 Aug – 31 Aug 2026', amount: 450,
      status: 'paid',
      items: [
        { name: 'Scale plan', detail: 'Monthly subscription', amount: 300 },
        { name: 'Production Server', detail: '4 vCPU · 8 GB · 512 GB', amount: 75 },
        { name: 'Staging Server', detail: '2 vCPU · 4 GB · 128 GB', amount: 35 },
        { name: 'Managed databases', detail: '2 databases', amount: 30 },
        { name: 'Bandwidth overage', detail: '42 GB above included', amount: 10 },
      ],
    },
    {
      id: 'inv-002', number: 'INV-002', period: '01 Sep – 30 Sep 2026', amount: 520,
      status: 'pending',
      items: [
        { name: 'Scale plan', detail: 'Monthly subscription', amount: 300 },
        { name: 'Production Server', detail: '4 vCPU · 8 GB · 512 GB', amount: 95 },
        { name: 'Staging Server', detail: '2 vCPU · 4 GB · 128 GB', amount: 55 },
        { name: 'Managed databases', detail: '2 databases', amount: 60 },
        { name: 'Bandwidth overage', detail: '61 GB above included', amount: 10 },
      ],
    },
  ],
};

export const formatUsd = (amount) => new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0,
}).format(amount);

export const statusTone = {
  paid: { label: 'Paid', color: '#3dcc87' },
  pending: { label: 'Pending', color: '#e0b527' },
  failed: { label: 'Failed', color: '#ef6262' },
  overdue: { label: 'Overdue', color: '#ef6262' },
};
