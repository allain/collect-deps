import dc from "./DepsCollector.js"

export const DepsCollector = dc

export default function collectDeps(entryFilePath) {
  return dc.collectFrom(entryFilePath)
}
