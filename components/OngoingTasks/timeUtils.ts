export const formatUnit = (unit: any) => {
  if (unit == undefined) return;
  if (unit.length === 1) {
    return `${unit}0`;
  }
  return unit;
};
