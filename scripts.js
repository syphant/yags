/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"i13OAP4zBQIMSsK5","label":"links","bookmarks":[{"id":"mgFbKX2oNwyfFzkO","label":"amazon","url":"https://www.amazon.com/"},{"id":"YMFbYKXHztJTPY99","label":"discord","url":"https://www.discord.com/app"},{"id":"u7KP7NymWThvxopP","label":"ebay","url":"https://www.ebay.com/"},{"id":"n016Dyh4fZQMsXbw","label":"etsy","url":"https://www.etsy.com/"}]},{"id":"S3MxiUWRioj9BM06","label":"","bookmarks":[{"id":"k39NeXII07Hsbpqc","label":"gmail","url":"https://mail.google.com/"},{"id":"Op1wRD5rD2LvydlC","label":"remote-desktop","url":"https://remotedesktop.google.com/access"},{"id":"f7ccKMVog5wg2X9t","label":"wikipedia","url":"https://en.wikipedia.org/wiki/Main_Page"},{"id":"vHd72qZd7sBw8LZF","label":"youtube","url":"https://www.youtube.com/"}]},{"id":"Aa7cdEjq7luvc4g7","label":"dashboard","bookmarks":[{"id":"ZbGB0u26KxcvI8P7","label":"files","url":"https://files.acidbath.cc/"},{"id":"7jzLLfg3lov63Cn1","label":"plex","url":"https://app.plex.tv/desktop/"},{"id":"aQZnUEqDZa3gTJuV","label":"radarr","url":"https://radarr.acidbath.cc/"},{"id":"nrqqcgipTknUccpi","label":"sabnzbd","url":"https://sabnzbd.acidbath.cc/"}]},{"id":"UjgnIebynl0SPeMw","label":"","bookmarks":[{"id":"kZmPeb8t42beC8h9","label":"sonarr","url":"https://sonarr.acidbath.cc/"},{"id":"6rZVy7u9yLPCrZiB","label":"tautulli","url":"https://tautulli.acidbath.cc/"},{"id":"hXRAAwLXeexYEXDo","label":"unraid","url":"https://192-168-0-2.2306c497070d00a61bf2b9f129c9cdcf2c6fc2c3.myunraid.net:9443/"},{"id":"ESt7VO1Ep4acR03g","label":"vuetorrent","url":"https://vuetorrent.acidbath.cc/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
