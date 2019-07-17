const { DepsCollector } = require("../dist/dist-node/index")
const path = require("path")

describe("DepsCollector", () => {
  it("can extract deps from commonjs modules", async () => {
    expect(
      await DepsCollector.collectFrom(
        path.resolve(__dirname, "fixtures", "commonjs.js")
      )
    ).toEqual(["lodash"])
  })

  it("can extract deps from es6 modules", async () => {
    expect(
      await DepsCollector.collectFrom(
        path.resolve(__dirname, "fixtures", "es6.js")
      )
    ).toEqual(["lodash"])
  })

  it("follows depedency graph to find external deps", async () => {
    expect(
      await DepsCollector.collectFrom(
        path.resolve(__dirname, "fixtures", "internal.js")
      )
    ).toEqual(["A", "B"])
  })

  it("supports reusing a single DepsCollector", async () => {
    const collector = new DepsCollector()
    expect(collector.dependencies).toEqual([])

    expect(
      await collector.updateFile(
        path.resolve(__dirname, "fixtures", "commonjs.js")
      )
    ).toBe(true)
    expect(collector.dependencies).toEqual(["lodash"])

    expect(
      await collector.updateFile(
        path.resolve(__dirname, "fixtures", "internal.js")
      )
    ).toBe(true)
    expect(collector.dependencies).toEqual(["A", "B", "lodash"])

    // should be false when no change was detected
    expect(
      await collector.updateFile(
        path.resolve(__dirname, "fixtures", "internal.js")
      )
    ).toBe(false)
  })

  it("supports scoped packages", async () => {
    expect(
      await DepsCollector.collectFrom(
        path.resolve(__dirname, "fixtures", "scoped.js")
      )
    ).toEqual(["@test/again"])
  })
})
