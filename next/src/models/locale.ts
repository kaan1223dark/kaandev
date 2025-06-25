import { getDictionary } from '@/dictionaries';

export type SupportedLanguage = 'en' | 'tr';

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
