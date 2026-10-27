/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ScreenType } from '../types';
import { LunaSeaTab } from '../data/lunaseaData';

export interface RouteState {
  screen: ScreenType;
  brand?: 'zoenude' | 'lunasea';
  cosmeticsTab?: LunaSeaTab;
  apparelTab?: 'editions' | 'runway' | 'trench';
  productId?: string;
}

/**
 * Normalizes input string to a valid LunaSeaTab identifier.
 * Very forgiving to handle lustrous-makeup, makeup, lunar-makeup, etc.
 */
export function parseLunaSeaTab(val?: string | null): LunaSeaTab | undefined {
  if (!val) return undefined;
  const v = val.toLowerCase().trim().replace(/_/g, '-');
  if (
    v === 'lunar-makeup' ||
    v === 'makeup' ||
    v === 'lustrous-makeup' ||
    v === 'lustrous' ||
    v === 'lustrousmakeup' ||
    v === 'lunar'
  ) {
    return 'lunar-makeup';
  }
  if (v === 'skincare' || v === 'skin') {
    return 'skincare';
  }
  if (v === 'tidal-rituals' || v === 'rituals' || v === 'tidal' || v === 'ritual') {
    return 'tidal-rituals';
  }
  if (v === 'algae-science' || v === 'science' || v === 'algae' || v === 'inci') {
    return 'algae-science';
  }
  if (v === 'about-us' || v === 'about' || v === 'harvest' || v === 'story') {
    return 'about-us';
  }
  if (v === 'home' || v === 'overview') {
    return 'home';
  }
  return undefined;
}

/**
 * Parses the current window location into a structured RouteState.
 * Supports standard pathnames (/cosmetics, /lunasea, /lunasea/makeup),
 * search query parameters (?brand=lunasea&tab=lunar-makeup),
 * and hash fragments (#/cosmetics?brand=lunasea&tab=lunar-makeup).
 */
export function parseRoute(
  pathname = window.location.pathname,
  search = window.location.search,
  hash = window.location.hash
): RouteState {
  const cleanPath = (pathname || '/').toLowerCase().replace(/\/+$/, '') || '/';
  const searchParams = new URLSearchParams(search || '');
  const cleanHash = (hash || '').replace(/^#\/?/, '').toLowerCase();

  // Extract query tab parameter if provided
  const queryTab =
    searchParams.get('tab') ||
    searchParams.get('category') ||
    searchParams.get('sub') ||
    searchParams.get('section');

  // Check for direct path subroutes like /cosmetics/lunasea/lunar-makeup or /lunasea/makeup
  let pathTab: LunaSeaTab | undefined;
  if (cleanPath.includes('/makeup') || cleanPath.includes('/lustrous')) {
    pathTab = 'lunar-makeup';
  } else if (cleanPath.includes('/skincare')) {
    pathTab = 'skincare';
  } else if (cleanPath.includes('/rituals') || cleanPath.includes('/tidal-rituals')) {
    pathTab = 'tidal-rituals';
  } else if (cleanPath.includes('/science') || cleanPath.includes('/algae-science')) {
    pathTab = 'algae-science';
  } else if (cleanPath.includes('/harvest') || cleanPath.includes('/about-us')) {
    pathTab = 'about-us';
  }

  const resolvedLunaTab = parseLunaSeaTab(queryTab) || pathTab;

  // 1. Direct path routing for cosmetics
  if (
    cleanPath === '/cosmetics' ||
    cleanPath === '/cosmetics/' ||
    cleanPath === '/03-cosmetics' ||
    cleanPath.startsWith('/cosmetics/')
  ) {
    const brandParam = searchParams.get('brand')?.toLowerCase();
    const isLuna =
      brandParam === 'lunasea' ||
      cleanPath.includes('/lunasea') ||
      cleanPath.includes('/makeup') ||
      cleanPath.includes('/lustrous');
    const brand = isLuna ? 'lunasea' : 'zoenude';
    return {
      screen: 'cosmetics',
      brand,
      cosmeticsTab: isLuna ? (resolvedLunaTab || 'home') : undefined,
    };
  }

  if (cleanPath.startsWith('/lunasea')) {
    return {
      screen: 'cosmetics',
      brand: 'lunasea',
      cosmeticsTab: resolvedLunaTab || 'home',
    };
  }

  if (cleanPath === '/zoenude' || cleanPath.startsWith('/zoenude')) {
    return { screen: 'cosmetics', brand: 'zoenude' };
  }

  if (cleanPath === '/apparel' || cleanPath === '/apparel/' || cleanPath === '/02-apparel') {
    const tabParam = searchParams.get('tab')?.toLowerCase() as 'editions' | 'runway' | 'trench' | null;
    return { screen: 'apparel', apparelTab: tabParam || 'editions' };
  }

  if (cleanPath === '/color-editions' || cleanPath === '/editions' || cleanPath === '/apparel/editions') {
    return { screen: 'apparel', apparelTab: 'editions' };
  }

  if (cleanPath === '/runway' || cleanPath === '/runway-ss25' || cleanPath === '/apparel/runway') {
    return { screen: 'apparel', apparelTab: 'runway' };
  }

  if (cleanPath === '/product-detail' || cleanPath === '/apparel/trench') {
    return { screen: 'apparel', apparelTab: 'trench' };
  }

  if (cleanPath === '/tech' || cleanPath === '/kocolor-ai' || cleanPath === '/04-tech' || cleanPath === '/engine') {
    return { screen: 'tech' };
  }

  if (cleanPath === '/about' || cleanPath === '/manifesto' || cleanPath === '/05-about') {
    return { screen: 'about' };
  }

  if (cleanPath === '/home' || cleanPath === '/prologue' || cleanPath === '/01-prologue') {
    return { screen: 'home' };
  }

  // 2. Query parameter fallback (?screen=cosmetics or ?page=cosmetics)
  const queryScreen = (searchParams.get('screen') || searchParams.get('page'))?.toLowerCase();
  if (queryScreen) {
    if (queryScreen === 'cosmetics' || queryScreen === 'lunasea') {
      const isLuna = searchParams.get('brand')?.toLowerCase() === 'lunasea' || queryScreen === 'lunasea';
      const brand = isLuna ? 'lunasea' : 'zoenude';
      return {
        screen: 'cosmetics',
        brand,
        cosmeticsTab: isLuna ? (resolvedLunaTab || 'home') : undefined,
      };
    }
    if (queryScreen === 'apparel' || queryScreen === 'color-editions' || queryScreen === 'runway-ss25') {
      const apparelTab = queryScreen === 'runway-ss25' ? 'runway' : 'editions';
      return { screen: 'apparel', apparelTab };
    }
    if (queryScreen === 'tech' || queryScreen === 'kocolor-ai') {
      return { screen: 'tech' };
    }
    if (queryScreen === 'about') {
      return { screen: 'about' };
    }
  }

  // 3. Hash routing fallback (#/cosmetics?brand=lunasea&tab=lunar-makeup)
  if (cleanHash) {
    if (cleanHash.startsWith('cosmetics') || cleanHash.includes('lunasea')) {
      const isLuna = cleanHash.includes('lunasea') || cleanHash.includes('makeup') || cleanHash.includes('lustrous');
      let hashTab: LunaSeaTab | undefined;
      if (cleanHash.includes('makeup') || cleanHash.includes('lustrous')) {
        hashTab = 'lunar-makeup';
      } else if (cleanHash.includes('skincare')) {
        hashTab = 'skincare';
      } else if (cleanHash.includes('rituals')) {
        hashTab = 'tidal-rituals';
      } else if (cleanHash.includes('science')) {
        hashTab = 'algae-science';
      } else if (cleanHash.includes('about')) {
        hashTab = 'about-us';
      }
      return {
        screen: 'cosmetics',
        brand: isLuna ? 'lunasea' : 'zoenude',
        cosmeticsTab: isLuna ? (hashTab || resolvedLunaTab || 'home') : undefined,
      };
    }
    if (cleanHash.startsWith('apparel') || cleanHash === 'runway' || cleanHash === 'editions') {
      return { screen: 'apparel', apparelTab: cleanHash.includes('runway') ? 'runway' : 'editions' };
    }
    if (cleanHash.startsWith('tech')) {
      return { screen: 'tech' };
    }
    if (cleanHash.startsWith('about')) {
      return { screen: 'about' };
    }
  }

  // Default to Home Prologue
  return { screen: 'home' };
}

/**
 * Returns the canonical URL path for a given route state.
 * For LunaSea "Lustrous Makeup", returns `/cosmetics?brand=lunasea&tab=lunar-makeup`
 */
export function getRoutePath(state: RouteState): string {
  switch (state.screen) {
    case 'cosmetics':
      if (state.brand === 'lunasea') {
        if (state.cosmeticsTab && state.cosmeticsTab !== 'home') {
          return `/cosmetics?brand=lunasea&tab=${state.cosmeticsTab}`;
        }
        return '/cosmetics?brand=lunasea';
      }
      return '/cosmetics';
    case 'apparel':
    case 'color-editions':
      if (state.apparelTab === 'runway') return '/apparel?tab=runway';
      if (state.apparelTab === 'trench') return '/apparel?tab=trench';
      return '/apparel';
    case 'runway-ss25':
      return '/apparel?tab=runway';
    case 'product-detail':
      return '/apparel?tab=trench';
    case 'tech':
    case 'kocolor-ai':
      return '/tech';
    case 'about':
      return '/about';
    case 'home':
    default:
      return '/';
  }
}

/**
 * Generates human & SEO friendly document titles for each route
 */
export function getRouteTitle(state: RouteState): string {
  switch (state.screen) {
    case 'cosmetics':
      if (state.brand === 'lunasea') {
        if (state.cosmeticsTab === 'lunar-makeup') {
          return 'KoColor | LunaSea — Lustrous Makeup Collection (AI Bio-Cosmetics)';
        }
        if (state.cosmeticsTab === 'skincare') {
          return 'KoColor | LunaSea — Marine Cellular Skincare (AI Bio-Cosmetics)';
        }
        if (state.cosmeticsTab === 'tidal-rituals') {
          return 'KoColor | LunaSea — Tidal Rituals (AI Bio-Cosmetics)';
        }
        if (state.cosmeticsTab === 'algae-science') {
          return 'KoColor | LunaSea — Algae Science & INCI Bio-Ferments';
        }
        if (state.cosmeticsTab === 'about-us') {
          return 'KoColor | LunaSea — About & Sustainable Harvest';
        }
        return 'KoColor | 03 Cosmetics — LunaSea Soft Pastels AI Bio-Formulations';
      }
      return 'KoColor | 03 Cosmetics — ZoeNude Barely-There AI Bio-Formulations';
    case 'apparel':
    case 'color-editions':
      return state.apparelTab === 'runway'
        ? 'KoColor | 02 Apparel — SS25 Algorithmic Runway'
        : 'KoColor | 02 Apparel — Chromatic Color Editions';
    case 'runway-ss25':
      return 'KoColor | 02 Apparel — SS25 Algorithmic Runway';
    case 'tech':
    case 'kocolor-ai':
      return 'KoColor | 04 AI Engine — Neural Pattern Synthesis & Tech Architecture';
    case 'about':
      return 'KoColor | 05 AI Manifesto — The AI Tech Fashion House Philosophy';
    case 'home':
    default:
      return 'KoColor | AI Tech Fashion House — Everything Built With AI';
  }
}

/**
 * Safely copy text to user clipboard with multi-tier fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  // Try modern Clipboard API
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to textarea execCommand fallback
    }
  }

  // Fallback for iframe restrictions
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}

/**
 * Share current URL via Web Share API or Clipboard Copy
 */
export async function shareLink(
  pathOrUrl?: string,
  title?: string,
  text?: string
): Promise<{ method: 'share' | 'clipboard' | 'failed'; url: string }> {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://kocolor.com';
  let targetUrl = pathOrUrl || window.location.href;

  if (targetUrl.startsWith('/')) {
    targetUrl = `${origin}${targetUrl}`;
  }

  const shareTitle = title || document.title || 'KoColor | AI Tech Fashion House';
  const shareText = text || 'Explore this collection at KoColor — AI Tech Fashion House where everything is built with AI.';

  // Attempt Web Share API (mobile/touch native sheet)
  if (navigator.share) {
    try {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: targetUrl,
      });
      return { method: 'share', url: targetUrl };
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return { method: 'failed', url: targetUrl };
      }
      // Continue to clipboard copy if navigator.share fails
    }
  }

  // Fallback to clipboard
  const copied = await copyToClipboard(targetUrl);
  return { method: copied ? 'clipboard' : 'failed', url: targetUrl };
}
