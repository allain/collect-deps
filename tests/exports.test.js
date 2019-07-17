const api = require("../dist/dist-node")
const path = require("path")

describe("exports", () => {
  it("exports a simple function as default", async () => {
    expect(api.default).toBeInstanceOf(Function)
    expect(
      await api.default(path.resolve(__dirname, "fixtures", "commonjs.js"))
    ).toEqual(["lodash"])
  })

  it("exports DepsCollector", () => {
    expect(api.DepsCollector).toBeDefined()
  })
})
