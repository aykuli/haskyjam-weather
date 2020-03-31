export const temperatureZeroFit = (n: number): number => (n.toString() === '-0' ? 0 : n);
export const numberFit = (n: number): number => Number(n.toFixed(0));
