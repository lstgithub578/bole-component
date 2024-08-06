import componentLocale from "../i18n/pages/component.json"
import guideLocale from "../i18n/pages/guide.json"

type Item = {
  text: string
  items?: Item[]
  children?: Item[]
  link?: string
}

const sideBars = {}
function getSideBar(nameSpace: string, data: any) {
  Object.entries(data).map(([lang, val]) => {
    let locale = `/${lang}`
    if (!sideBars[locale]) sideBars[locale] = {}
    sideBars[locale][nameSpace] = Object.values(val as any).map((item) =>
      mapPrefix(item as Item, lang === "zh" ? "" : locale, nameSpace),
    )
  })
}


function mapPrefix(item: Item, lang: string, prefix = "") {
  if (item.children && item.children.length > 0) {
    const res = {
      ...item,
      items: item.children.map((child) => mapPrefix(child, lang, prefix)),
    }
    delete res.children
    return res
  }
  return {
    ...item,
    link: `${prefix}${item.link}`,
  }
}

getSideBar("/component", componentLocale)
getSideBar("/guide", guideLocale)

export default sideBars
