import { getList } from "../const/subApp";
import { parseHtml } from "./index"

export const prefetch = async () => {
  const appList = getList().filter(app => window.location.pathname !== app.activeRule)
  await Promise.all(appList.map(app => parseHtml(app.entry, app.name)))
}