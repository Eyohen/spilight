import { Link, useParams } from 'react-router-dom';
import { billingData, formatUsd, statusTone } from './billingData';

export default function InvoiceDetailPage(){
  const { id } = useParams();
  const invoice = billingData.invoices.find(item => item.id === id) || billingData.invoices[0];
  const tone = statusTone[invoice.status] || { label: invoice.status, color: '#92929b' };

  return <div className="mx-auto max-w-[1440px]">
    <Link to="/dashboard/billing" className="font-mono text-[10px] text-[#777780] transition hover:text-[#58baf0]">← Billing</Link>
    <header className="mt-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
      <div><h1 className="text-3xl font-semibold tracking-[-.04em]">{invoice.number}</h1><p className="mt-2 text-sm text-[#777780]">{invoice.period}</p><p className="mt-5 flex items-center gap-2 text-xs font-semibold" style={{color:tone.color}}><span className="h-2 w-2 rounded-full" style={{backgroundColor:tone.color}}/>{tone.label}</p></div>
      <div className="flex gap-2"><button className="rounded-lg border border-[#35363c] px-4 py-2.5 text-xs text-[#a0a0a8] hover:bg-white/[.04]">↓ Download invoice</button>{invoice.status!=='paid'&&<button className="rounded-lg bg-[#58baf0] px-4 py-2.5 text-xs font-semibold text-[#071116] hover:bg-[#73c7f4]">Pay {formatUsd(invoice.amount)}</button>}</div>
    </header>

    <section className="mt-7 rounded-xl border border-[#303137] bg-[#151519] p-5">
      <h2 className="text-sm font-semibold">Invoice items</h2>
      <div className="mt-4">{invoice.items.map(item => <div key={item.name} className="flex items-center justify-between gap-4 border-b border-[#303137] py-4 last:border-0"><div><p className="text-sm font-semibold">{item.name}</p><p className="mt-1 text-xs text-[#777780]">{item.detail}</p></div><strong className="shrink-0 font-mono text-xs">{formatUsd(item.amount)}</strong></div>)}</div>
      <div className="mt-2 flex items-center justify-between border-t border-[#3a3b41] pt-5"><strong className="text-sm">Total</strong><strong className="text-lg">{formatUsd(invoice.amount)}</strong></div>
    </section>
  </div>;
}
