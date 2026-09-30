import { useEffect, useState } from 'react';
import { api } from '../../lib/api';

const getErrorMessage = (error, fallback) =>
  error.response?.data?.message || error.message || fallback;

const formatMoney = (amount, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(Number(amount || 0));

const formatDate = (date) => {
  if (!date) return '—';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));
};

const ReceiptsPage = () => {
  const [receipts, setReceipts] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [state, setState] = useState({ loading: true, error: '' });

  useEffect(() => {
    let isMounted = true;

    api.get('/billing/receipts')
      .then((response) => {
        if (isMounted) {
          setReceipts(response.data.data.receipts);
          setState({ loading: false, error: '' });
        }
      })
      .catch((error) => {
        if (isMounted) setState({ loading: false, error: getErrorMessage(error, 'Unable to load receipts') });
      });

    return () => { isMounted = false; };
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/42">Billing / Receipts</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-black">Receipts</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-black/54">
          View the successful payment receipts sent to this account.
        </p>
      </div>

      {state.error && <div className="rounded-lg border border-black/10 bg-white p-4 text-sm font-medium">{state.error}</div>}

      <section className="rounded-lg border border-black/10 bg-white">
        <div className="border-b border-black/10 p-5">
          <h2 className="text-lg font-semibold tracking-[-0.03em]">Payment receipts</h2>
          <p className="mt-1 text-sm text-black/46">{state.loading ? 'Loading receipts…' : `${receipts.length} receipt${receipts.length === 1 ? '' : 's'}`}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="border-b border-black/10 bg-[#fafafa] text-xs uppercase tracking-[0.12em] text-black/40">
              <tr>
                <th className="px-5 py-3 font-bold">Receipt</th>
                <th className="px-5 py-3 font-bold">Customer</th>
                <th className="px-5 py-3 font-bold">Amount</th>
                <th className="px-5 py-3 font-bold">Paid date</th>
                <th className="px-5 py-3 text-right font-bold">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {receipts.map((receipt) => (
                <tr key={receipt.id} className="transition-colors hover:bg-black/[0.015]">
                  <td className="px-5 py-4"><p className="font-mono text-sm">{receipt.receiptNumber}</p><p className="mt-1 text-xs text-black/42">{receipt.description}</p></td>
                  <td className="px-5 py-4"><p className="text-sm font-medium">{receipt.customerName}</p><p className="mt-1 text-xs text-black/42">{receipt.customerEmail}</p></td>
                  <td className="px-5 py-4 text-sm text-black/58">{formatMoney(receipt.amount, receipt.currency)}</td>
                  <td className="px-5 py-4 text-sm text-black/58">{formatDate(receipt.paidDate)}</td>
                  <td className="px-5 py-4 text-right"><button onClick={() => setSelectedReceipt(receipt)} className="rounded-md border border-black/10 px-3 py-2 text-xs font-bold transition-colors hover:bg-black hover:text-white">View</button></td>
                </tr>
              ))}
              {!state.loading && receipts.length === 0 && <tr><td className="px-5 py-8 text-center text-sm text-black/50" colSpan={5}>No successful receipts have been sent yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>

      {selectedReceipt && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label={`Receipt ${selectedReceipt.receiptNumber}`} onMouseDown={(event) => event.target === event.currentTarget && setSelectedReceipt(null)}>
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-black/40">Payment receipt</p><h2 className="mt-2 font-mono text-xl font-semibold">{selectedReceipt.receiptNumber}</h2></div>
              <button onClick={() => setSelectedReceipt(null)} className="grid h-9 w-9 place-items-center rounded-md border border-black/10 text-xl text-black/50 hover:text-black" aria-label="Close receipt">×</button>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-5 rounded-lg bg-[#f7f7f7] p-5 text-sm">
              <div><dt className="text-xs uppercase tracking-wider text-black/40">Customer</dt><dd className="mt-1 font-semibold">{selectedReceipt.customerName}</dd><dd className="mt-1 text-xs text-black/50">{selectedReceipt.customerEmail}</dd></div>
              <div><dt className="text-xs uppercase tracking-wider text-black/40">Paid date</dt><dd className="mt-1 font-semibold">{formatDate(selectedReceipt.paidDate)}</dd></div>
              <div><dt className="text-xs uppercase tracking-wider text-black/40">Description</dt><dd className="mt-1 font-semibold">{selectedReceipt.description}</dd></div>
              <div><dt className="text-xs uppercase tracking-wider text-black/40">Amount paid</dt><dd className="mt-1 text-lg font-semibold">{formatMoney(selectedReceipt.amount, selectedReceipt.currency)}</dd></div>
            </dl>
            {selectedReceipt.notes && <p className="mt-4 rounded-lg border border-black/10 p-4 text-sm leading-6 text-black/60">{selectedReceipt.notes}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiptsPage;
