import { useEffect, useState } from 'react';
import MetricCard from '../../components/dashboard/MetricCard';
import StatusBadge from '../../components/dashboard/StatusBadge';
import { api } from '../../lib/api';

const getErrorMessage = (error, fallback) =>
  error.response?.data?.message || error.message || fallback;

const formatMoney = (amount, currency = 'USD') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(Number(amount || 0));

const formatDate = (date) => {
  if (!date) return 'No due date';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));
};

const formatStatus = (status) =>
  status ? status.charAt(0).toUpperCase() + status.slice(1).replaceAll('_', ' ') : '';

const BillingPage = () => {
  const [billing, setBilling] = useState({
    stats: {
      currentSpend: 0,
      paidTotal: 0,
      openTotal: 0,
      openInvoiceCount: 0,
      paidInvoiceCount: 0,
      invoiceCount: 0,
      nextInvoice: null,
    },
    invoices: [],
  });
  const [billingState, setBillingState] = useState({
    loading: true,
    error: '',
  });

  useEffect(() => {
    let isMounted = true;

    const loadBilling = async () => {
      setBillingState({ loading: true, error: '' });

      try {
        const response = await api.get('/billing/summary');
        if (isMounted) {
          setBilling(response.data.data);
          setBillingState({ loading: false, error: '' });
        }
      } catch (error) {
        if (isMounted) {
          setBillingState({
            loading: false,
            error: getErrorMessage(error, 'Unable to load billing information'),
          });
        }
      }
    };

    loadBilling();

    return () => {
      isMounted = false;
    };
  }, []);

  const nextInvoice = billing.stats.nextInvoice;
  const billingStats = [
    {
      label: 'Current spend',
      value: billingState.loading ? '...' : formatMoney(billing.stats.currentSpend),
      detail: `${billing.stats.invoiceCount} total invoices`,
    },
    {
      label: 'Paid',
      value: billingState.loading ? '...' : formatMoney(billing.stats.paidTotal),
      detail: `${billing.stats.paidInvoiceCount} paid invoices`,
    },
    {
      label: 'Open balance',
      value: billingState.loading ? '...' : formatMoney(billing.stats.openTotal),
      detail: `${billing.stats.openInvoiceCount} invoices awaiting payment`,
    },
    {
      label: 'Next invoice',
      value: billingState.loading ? '...' : nextInvoice ? formatMoney(nextInvoice.amount, nextInvoice.currency) : '$0.00',
      detail: nextInvoice ? `Due ${formatDate(nextInvoice.dueDate)}` : 'No open invoices',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/42">Billing</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-black">Plan and usage</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-black/54">
            Review workspace spend, invoices, payment method, usage charges, and monthly budget controls.
          </p>
        </div>
        <button className="h-10 w-fit rounded-md bg-black px-4 text-sm font-bold text-white transition-colors hover:bg-black/80">
          Update payment
        </button>
      </div>

      {billingState.error && (
        <div className="rounded-lg border border-black/10 bg-white p-4 text-sm font-medium text-black">
          {billingState.error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {billingStats.map((stat) => (
          <MetricCard key={stat.label} label={stat.label} value={stat.value} detail={stat.detail} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <section className="rounded-lg border border-black/10 bg-white">
          <div className="border-b border-black/10 p-5">
            <h2 className="text-lg font-semibold tracking-[-0.03em]">Open invoices</h2>
            <p className="mt-1 text-sm text-black/46">Invoices created by Spilight admin for this account</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead className="border-b border-black/10 bg-[#fafafa] text-xs uppercase tracking-[0.12em] text-black/40">
                <tr>
                  <th className="px-5 py-3 font-bold">Invoice</th>
                  <th className="px-5 py-3 font-bold">Due date</th>
                  <th className="px-5 py-3 font-bold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                {billing.invoices.filter((invoice) => ['open', 'overdue'].includes(invoice.status)).map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="px-5 py-4 text-sm font-medium">
                      <p>{invoice.invoiceNumber}</p>
                      <p className="mt-1 text-xs text-black/42">{invoice.title}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-black/58">{formatDate(invoice.dueDate)}</td>
                    <td className="px-5 py-4 text-sm text-black/58">{formatMoney(invoice.amount, invoice.currency)}</td>
                  </tr>
                ))}
                {!billingState.loading && billing.invoices.filter((invoice) => ['open', 'overdue'].includes(invoice.status)).length === 0 && (
                  <tr>
                    <td className="px-5 py-5 text-sm text-black/50" colSpan={3}>No open invoices.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-lg border border-black/10 bg-white p-5">
          <h2 className="text-lg font-semibold tracking-[-0.03em]">Payment method</h2>
          <div className="mt-5 rounded-lg border border-black/10 bg-[#f7f7f7] p-4">
            <p className="text-sm font-semibold">Visa ending in 4242</p>
            <p className="mt-1 text-xs text-black/46">Expires 08/29</p>
          </div>
          <div className="mt-5 rounded-lg border border-black/10 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/38">Budget alert</p>
            <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">$700</p>
            <p className="mt-1 text-sm text-black/50">Notify team at 80% usage.</p>
          </div>
        </section>
      </div>

      <section className="rounded-lg border border-black/10 bg-white">
        <div className="border-b border-black/10 p-5">
          <h2 className="text-lg font-semibold tracking-[-0.03em]">Invoices</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead className="border-b border-black/10 bg-[#fafafa] text-xs uppercase tracking-[0.12em] text-black/40">
              <tr>
                <th className="px-5 py-3 font-bold">Status</th>
                <th className="px-5 py-3 font-bold">Invoice</th>
                <th className="px-5 py-3 font-bold">Issued</th>
                <th className="px-5 py-3 font-bold">Due</th>
                <th className="px-5 py-3 font-bold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {billing.invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-5 py-4">
                    <StatusBadge status={formatStatus(invoice.status)} />
                  </td>
                  <td className="px-5 py-4 text-sm">
                    <p className="font-mono">{invoice.invoiceNumber}</p>
                    <p className="mt-1 text-xs text-black/42">{invoice.title}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-black/58">{formatDate(invoice.issuedDate)}</td>
                  <td className="px-5 py-4 text-sm text-black/58">{formatDate(invoice.dueDate)}</td>
                  <td className="px-5 py-4 text-sm text-black/58">{formatMoney(invoice.amount, invoice.currency)}</td>
                </tr>
              ))}
              {!billingState.loading && billing.invoices.length === 0 && (
                <tr>
                  <td className="px-5 py-5 text-sm text-black/50" colSpan={5}>No invoices have been created for this account yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default BillingPage;
