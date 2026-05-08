export default function KPICard({ title, value, growth }) {
  return (
    <div className="rounded-2xl bg-primary p-4 shadow-md w-full max-w-[240px]">
      
      <div className="flex flex-col gap-2">

        <p className="text-[10px] font-bold text-white/70 uppercase">
          {title}
        </p>

        <h2 className="text-xl font-bold text-white">
          {value}
        </h2>

        {growth && (
          <span className="text-[10px] text-white/70">
            {growth}
          </span>
        )}

      </div>
    </div>
  );
}