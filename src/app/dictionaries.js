import 'server-only'

const dictionaries = {
  en: () => import('../../translation/en.json').then((module) => module.default),
  ru: () => import('../../translation/ru.json').then((module) => module.default),
}

export const getDictionary = async (locale) => {
  return dictionaries[locale]()
}