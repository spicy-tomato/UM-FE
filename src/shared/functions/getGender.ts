export function getGender(
  { isMale }: { isMale?: boolean },
  useCapitalized = true
): string {
  let result = isMale ? 'male' : 'female';

  if (!useCapitalized) return result;

  return result[0].toUpperCase() + result.substring(1);
}
