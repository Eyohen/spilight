/* eslint-disable react/prop-types */

const MetricCard = ({ label, value, detail }) => (
  <article className="rounded-lg border border-black/10 bg-white p-5">
    <p className="text-sm text-black/48">{label}</p>
    <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-black">{value}</p>
    <p className="mt-2 text-xs text-black/42">{detail}</p>
  </article>
);

export default MetricCard;
