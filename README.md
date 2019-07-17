# collect-deps

A library for extracting all of the depencies of an app by walking its source code.

It exposes a DepsCollector object which can be used as a persistent way of efficiently calculating deps.

## Usage

```js
import collectDeps from "collect-deps"

async function main() {
  console.log(await collectDeps("/path/to/index.js"))

  // Or if you prefer the persistent way of doing it

  import { DepsCollector } from "collect-deps"

  const collector = new DepsCollector()

  if (await collector.updateFile("/path/to/index.js")) {
    // returns true if the update of that file changes the collected deps
    console.log(collector.dependencies)
  }
}

main()
```
