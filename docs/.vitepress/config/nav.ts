import navLocale from "../i18n/pages/nav.json"

function getNav() {
  return Object.entries(navLocale).map(([lang, locales]) => {
    const item: {
      link: string
      text: string
      activeMatch?: string
    }[] = Object.values(locales).map((item) => ({
      ...item,
      link: `${item.link}`,
    }))

    return [lang, item]
  })[0][1]
}

export const nav = getNav()
