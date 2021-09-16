export function formatNumber(n: number) {
  const ranges = [
    { divider: 1e18, suffix: "E" },
    { divider: 1e15, suffix: "P" },
    { divider: 1e12, suffix: "T" },
    { divider: 1e9, suffix: "G" },
    { divider: 1e6, suffix: "M" },
    { divider: 1e3, suffix: "k" },
  ];

  for (const range of ranges) {
    if (n >= range.divider) {
      return (n / range.divider).toFixed(1).toString() + range.suffix;
    }
  }

  return n.toString();
}
