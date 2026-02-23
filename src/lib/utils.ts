/**
 * Shared utilities. Add cn (classnames), formatPhone, etc. when needed.
 */

export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
