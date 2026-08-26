/* eslint-disable react/prop-types */

const MetricCard = ({ label, value, detail }) => (
  <article className="group rounded-xl border border-black/10 bg-white/80 p-5 shadow-[0_12px_36px_rgba(0,0,0,0.04)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#b7db2f]/60 hover:shadow-[0_16px_42px_rgba(0,0,0,0.07)]">
    <p className="text-sm text-black/48">{label}</p>
    <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-black transition-colors group-hover:text-[#789000]">{value}</p>
    <p className="mt-2 text-xs text-black/42">{detail}</p>
  </article>
);

export default MetricCard;
