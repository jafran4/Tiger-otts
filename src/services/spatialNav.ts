/**
 * Spatial Navigation & TV Remote Control Engine for Tiger OTT
 * Supports:
 * - D-Pad (ArrowUp, ArrowDown, ArrowLeft, ArrowRight)
 * - OK / Select (Enter, Space, NumpadEnter, KeyCode 13)
 * - Back (Escape, Backspace, BrowserBack, Remote KeyCodes: 10009 [Tizen], 461 [webOS], 27)
 * - Media Keys (MediaPlayPause, MediaPlay, MediaPause, MediaStop)
 * - Focus history & restoration on modal close / player exit
 */

export type TVNavDirection = "up" | "down" | "left" | "right";

interface SpatialNavState {
  isTVMode: boolean;
  lastFocusedElementId: string | null;
  historyStack: string[];
}

const state: SpatialNavState = {
  isTVMode: false,
  lastFocusedElementId: null,
  historyStack: [],
};

// Check if current device is a TV based on user-agent or TV specific APIs
export function detectTVDevice(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  const ua = navigator.userAgent.toLowerCase();
  return (
    ua.includes("smart-tv") ||
    ua.includes("smarttv") ||
    ua.includes("googletv") ||
    ua.includes("android tv") ||
    ua.includes("tizen") ||
    ua.includes("webos") ||
    ua.includes("hbbtv") ||
    ua.includes("appletv") ||
    ua.includes("crkey") ||
    ua.includes("roku") ||
    window.innerWidth >= 1920 && !("ontouchstart" in window)
  );
}

// Get all currently visible focusable elements in logical DOM order
export function getFocusableElements(container: HTMLElement | Document = document): HTMLElement[] {
  const selector = [
    'button:not([disabled])',
    'a[href]:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[data-tv-focusable="true"]',
  ].join(', ');

  const elements = Array.from(container.querySelectorAll<HTMLElement>(selector));
  return elements.filter((el) => {
    // Check if visible
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    return (
      rect.width > 0 &&
      rect.height > 0 &&
      style.visibility !== 'hidden' &&
      style.display !== 'none' &&
      style.opacity !== '0'
    );
  });
}

// Save last focused element
export function saveFocusState(elementId?: string) {
  const activeEl = document.activeElement as HTMLElement | null;
  const id = elementId || (activeEl ? activeEl.id || activeEl.getAttribute('data-tv-id') : null);
  if (id) {
    state.lastFocusedElementId = id;
    state.historyStack.push(id);
  }
}

// Restore focus to previous element or specific element
export function restoreFocus(targetId?: string) {
  const idToFocus = targetId || state.historyStack.pop() || state.lastFocusedElementId;
  if (!idToFocus) return false;

  setTimeout(() => {
    let target = document.getElementById(idToFocus);
    if (!target) {
      target = document.querySelector(`[data-tv-id="${idToFocus}"]`);
    }
    if (target && typeof target.focus === 'function') {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      return true;
    }
    return false;
  }, 60);
  return true;
}

// Set focus with smooth scrolling
export function focusElement(el: HTMLElement) {
  if (!el) return;
  el.focus();
  el.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center',
  });
}

// Calculate Euclidean distance between element centers with directional bias
function calculateDistance(
  currentRect: DOMRect,
  targetRect: DOMRect,
  direction: TVNavDirection
): number {
  const curCenter = {
    x: currentRect.left + currentRect.width / 2,
    y: currentRect.top + currentRect.height / 2,
  };
  const targetCenter = {
    x: targetRect.left + targetRect.width / 2,
    y: targetRect.top + targetRect.height / 2,
  };

  const dx = targetCenter.x - curCenter.x;
  const dy = targetCenter.y - curCenter.y;

  // Strict directional filtering
  switch (direction) {
    case 'left':
      if (dx >= -5) return Infinity; // Target must be strictly to the left
      return Math.abs(dx) + Math.abs(dy) * 2.5;
    case 'right':
      if (dx <= 5) return Infinity; // Target must be strictly to the right
      return Math.abs(dx) + Math.abs(dy) * 2.5;
    case 'up':
      if (dy >= -5) return Infinity; // Target must be strictly above
      return Math.abs(dy) + Math.abs(dx) * 1.8;
    case 'down':
      if (dy <= 5) return Infinity; // Target must be strictly below
      return Math.abs(dy) + Math.abs(dx) * 1.8;
  }
}

// Find the best next focusable element in spatial 2D plane
export function findNextFocusable(
  currentElement: HTMLElement,
  direction: TVNavDirection,
  container: HTMLElement | Document = document
): HTMLElement | null {
  const currentRect = currentElement.getBoundingClientRect();
  const allFocusables = getFocusableElements(container).filter((el) => el !== currentElement);

  let bestElement: HTMLElement | null = null;
  let minDistance = Infinity;

  for (const candidate of allFocusables) {
    const candidateRect = candidate.getBoundingClientRect();
    const dist = calculateDistance(currentRect, candidateRect, direction);
    if (dist < minDistance) {
      minDistance = dist;
      bestElement = candidate;
    }
  }

  return bestElement;
}

// TV Remote Key codes mapper
export const TV_KEYS = {
  UP: ['ArrowUp', 'Up', 'UIKeyInputUpArrow', '38'],
  DOWN: ['ArrowDown', 'Down', 'UIKeyInputDownArrow', '40'],
  LEFT: ['ArrowLeft', 'Left', 'UIKeyInputLeftArrow', '37'],
  RIGHT: ['ArrowRight', 'Right', 'UIKeyInputRightArrow', '39'],
  ENTER: ['Enter', 'Select', 'Ok', '13'],
  BACK: ['Escape', 'Back', 'BrowserBack', 'Backspace', '10009', '461', '27', '8'],
  PLAY_PAUSE: ['MediaPlayPause', 'Play', 'Pause', 'MediaPlay', 'MediaPause', '179'],
};

export function isKey(e: KeyboardEvent, keyList: string[]): boolean {
  return keyList.includes(e.key) || keyList.includes(String(e.keyCode));
}
