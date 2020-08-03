export function arrayEquals(
  arg0: Array<unknown>,
  arg1: Array<unknown>
): boolean {
  if (!arg0 || !arg1) return false;
  if (arg0.length != arg1.length) return false;
  for (let i = 0; i < arg0.length; i++) {
    if (arg0[i] !== arg1[i]) return false;
  }
  return true;
}
