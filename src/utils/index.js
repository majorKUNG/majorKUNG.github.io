/**Shows players market value */
export function calculateMarketValue(player) {
  const base = 989846;
  const agePenalty = 44677 * player.age;
  const strengthValue = 64867 * player.strength;
  const experienceValue = 26489 * player.experience;
  const value = base - agePenalty + strengthValue + experienceValue;
  return value.toLocaleString("sv-SE", { style: "currency", currency: "EUR" });
}