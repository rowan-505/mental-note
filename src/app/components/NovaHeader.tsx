type NovaHeaderProps = {
  username: string;
  subtitle?: string;
};

export function NovaHeader({ username, subtitle }: NovaHeaderProps) {
  return (
    <header className="px-6 pt-10 pb-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[#7C719A]">Good evening</p>
          <h1
            className="mt-1 text-2xl font-bold text-[#241A44]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Hey, {username}
          </h1>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-[#E7DFF7] bg-white px-3 py-2 shadow-sm">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#F472B6] flex items-center justify-center shadow-sm shadow-[#7C3AED]/20">
            <span className="text-xs font-bold tracking-wide text-white">N</span>
          </div>
          <span className="text-sm font-bold tracking-[0.18em] text-[#241A44]">NOVA</span>
        </div>
      </div>
      {subtitle && <p className="mt-4 text-sm text-[#7C719A]">{subtitle}</p>}
    </header>
  );
}
