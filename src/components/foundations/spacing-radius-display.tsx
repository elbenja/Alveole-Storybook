export interface TokenGroup {
  label: string;
  tokens: Array<{
    name: string;
    value: string | number;
  }>;
}

export function SpacingRadiusDisplay({
  groups,
}: {
  groups: TokenGroup[];
}) {
  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <div key={group.label} className="space-y-4">
          <h3 className="text-lg font-semibold text-[#533d32]">
            {group.label}
          </h3>
          <div className="space-y-3">
            {group.tokens.map((token) => (
              <div
                key={token.name}
                className="flex items-center gap-4 rounded-lg bg-[#f8f8f3] p-3"
              >
                <span className="w-40 text-sm font-medium text-[#2a2c29]">
                  {token.name}
                </span>
                <span className="text-sm font-semibold text-[#006d6a]">
                  {token.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
