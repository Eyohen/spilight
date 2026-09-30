/* eslint-disable react/prop-types */

const StatCard = ({ label, value, detail, icon, chipClassName = 'bg-babyblue-light text-babyblue-dark' }) => {
  return (
    <article className="rounded-2xl border border-black/[0.06] bg-white p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm text-black/45">{label}</p>
        {icon && (
          <span className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-full ${chipClassName}`}>
            {icon}
          </span>
        )}
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-black">{value}</p>
      <p className="mt-2 text-xs text-black/42">{detail}</p>
    </article>
  );
};

export default StatCard;
