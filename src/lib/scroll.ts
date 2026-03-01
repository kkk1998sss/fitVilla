import type { MouseEvent } from "react";

/**
 * Scroll to #lead-form and update URL. Use with onClick so the button
 * works every time (hash links often only scroll once when URL is already #lead-form).
 */
export function scrollToLeadForm(e: MouseEvent) {
  e.preventDefault();
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  window.history.pushState(null, "", "#lead-form");
}
