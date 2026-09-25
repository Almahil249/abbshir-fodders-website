import type { SpeciesTarget, Localized } from '../../../types/ecommerce';

/**
 * Mapping of animal emoji characters used in products.json to typed SpeciesTarget enum.
 */
export const EMOJI_TO_SPECIES: Record<string, SpeciesTarget> = {
  '🐪': 'camel',
  '🐎': 'horse',
  '🐄': 'cattle',
  '🐑': 'sheep',
  '🐐': 'goat',
  '🦌': 'deer',
};

/**
 * Reverse mapping from typed SpeciesTarget enum to animal emoji characters.
 */
export const SPECIES_TO_EMOJI: Record<SpeciesTarget, string> = {
  camel: '🐪',
  horse: '🐎',
  cattle: '🐄',
  sheep: '🐑',
  goat: '🐐',
  deer: '🦌',
  other: '🐾',
};

/**
 * Bilingual UI labels for each target species for filter badges and product metadata.
 */
export const SPECIES_LABELS: Record<SpeciesTarget, Localized> = {
  camel: { en: 'Camels', ar: 'الإبل' },
  horse: { en: 'Horses', ar: 'الخيول' },
  cattle: { en: 'Cattle', ar: 'الأبقار' },
  sheep: { en: 'Sheep', ar: 'الأغنام' },
  goat: { en: 'Goats', ar: 'الماعز' },
  deer: { en: 'Deer', ar: 'الغزلان' },
  other: { en: 'Other Animals', ar: 'حيوانات أخرى' },
};

/**
 * Convert a single emoji string to a typed SpeciesTarget.
 */
export function toSpeciesTarget(emoji: string): SpeciesTarget | undefined {
  return EMOJI_TO_SPECIES[emoji];
}

/**
 * Convert a typed SpeciesTarget to its corresponding emoji representation.
 */
export function toEmoji(species: SpeciesTarget): string {
  return SPECIES_TO_EMOJI[species] || '🐾';
}

/**
 * Map an array of emoji strings to an array of typed SpeciesTargets.
 */
export function speciesTargetsFromEmojis(emojis: string[]): SpeciesTarget[] {
  return emojis
    .map((e) => EMOJI_TO_SPECIES[e])
    .filter((s): s is SpeciesTarget => Boolean(s));
}

/**
 * Map an array of typed SpeciesTargets to an array of emoji strings.
 */
export function emojisFromSpeciesTargets(speciesList: SpeciesTarget[]): string[] {
  return speciesList.map(toEmoji);
}
