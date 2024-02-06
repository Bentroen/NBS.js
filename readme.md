[Docs]: https://encode42.github.io/NBS.js/docs/
[Docs Badge]: https://img.shields.io/badge/Docs-3178C6?labelColor=3178C6&logo=typescript&logoColor=white&style=flat-square
[NPM]: https://www.npmjs.com/package/@encode42/nbs.js
[NPM Badge]: https://img.shields.io/npm/v/@encode42/nbs.js?label=​&color=cb0000&labelColor=cb0000&logo=npm&logoColor=white&style=flat-square
[Changelog]: changelog.md
[Changelog Badge]: https://img.shields.io/badge/Changelog-E05735?labelColor=E05735&logo=keepachangelog&logoColor=white&style=flat-square
[Demo]: https://encode42.github.io/NBS.js/demo/
[Demo Badge]: https://img.shields.io/badge/Demo-202b38?labelColor=202b38&logo=html5&logoColor=white&style=flat-square
[Actions]: https://github.com/encode42/NBS.js/actions/workflows/build.yml
[Actions Badge]: https://img.shields.io/github/workflow/status/encode42/NBS.js/Build?style=flat-square
[Support]: https://encode42.dev/support
[Support Badge]: https://img.shields.io/discord/646517284453613578?color=7289da&labelColor=7289da&label=​&logo=discord&logoColor=white&style=flat-square
[Codacy]: https://app.codacy.com/gh/encode42/NBS.js/dashboard
[Codacy Badge]: https://img.shields.io/codacy/grade/68f12c67186549b88ab7ada56ac83efc?color=172B4D&labelColor=172B4D&label=​&logo=codacy&style=flat-square

<img src=".github/assets/badge-lq.png" align="left" id="header">
<div align="right">

# NBS.js
### A versatile API for reading, manipulating, and writing [OpenNBS](https://opennbs.org) files, heavily inspired by [NBSEditor](https://github.com/TheGreatFoxxy/NBSEditor/blob/408e3e58058bd72286fc7e9740d62a39a0c919dd/src/NBS.js) and [NoteBlockAPI](https://github.com/koca2000/NoteBlockAPI).

[![Docs Badge]][Docs] [![Changelog Badge]][Changelog] [![NPM Badge]][NPM]  
[![][Actions Badge]][Actions] [![][Codacy Badge]][Codacy] [![][Support Badge]][Support]
</div>

*With the added bonus of no required dependencies!*

### 🔧 Including
🌐 **Browser**

> It's recommended to use a versioned link, e.g. `@encode42/nbs.js@3.0.0`

Script
```html
<script src="https://cdn.jsdelivr.net/npm/@encode42/nbs.js"></script>
```
<sub>Minified: https://cdn.jsdelivr.net/npm/@encode42/nbs.js/dist/umd.min.js</sub>

Module
```js
import { Song } from "https://cdn.jsdelivr.net/npm/@encode42/nbs.js/dist/esm.js";
```
<sub>Minified: https://cdn.jsdelivr.net/npm/@encode42/nbs.js/dist/esm.min.js</sub>

⚙️ **Deno**
```js
import { Song } from "https://cdn.jsdelivr.net/npm/@encode42/nbs.js/dist/esm.js";
```

⚙️ **Node.js**

NPM
```sh
npm i @encode42/nbs.js
```

Yarn
```sh
yarn add @encode42/nbs.js
```

### ❔ FAQ
<details>
<summary>
<b>How do I use this?</b>
</summary>

[Install NBS.js for your platform](#-including), then refer to the [documentation][Docs] and examples below.

[![Docs Badge]][Docs]

<details>
<summary>
Browser (Script)
</summary>

```html
<input type="file" id="file-input">

<script src="https://cdn.jsdelivr.net/npm/@encode42/nbs.js"></script> <!-- Import NBS.js -->
<script>
window.addEventListener("load", () => {
  const input = document.getElementById("file-input");

  // Clear the file input (QOL)
  input.value = null;

  // Initialize file input
  input.addEventListener("change", () => {
    const songFile = input.files[0]; // Read a NBS file
    songFile.arrayBuffer().then(buffer => { // Create an ArrayBuffer
      const song = NBSjs.fromArrayBuffer(buffer); // Parse song from ArrayBuffer

      console.log(song);
    });
  });
});
</script>
```
</details>

<details>
<summary>
Browser (Module)
</summary>

index.html
```html
<input type="file" id="file-input">

<script src="index.js" type="module">
```

index.js
```js
import { fromArrayBuffer } from "https://cdn.jsdelivr.net/npm/@encode42/nbs.js/dist/esm.js"

window.addEventListener("load", () => {
  const input = document.getElementById("file-input");

  // Clear the file input (QOL)
  input.value = null;
    
  // Initialize file input
  input.addEventListener("change", () => {
    const songFile = input.files[0]; // Read a NBS file
    songFile.arrayBuffer().then(buffer => { // Create an ArrayBuffer
      const song = fromArrayBuffer(buffer); // Parse song from ArrayBuffer

      console.log(song);
    });
  });
});
```
</details>

<details>
<summary>
Deno
</summary>

```js
import { fromArrayBuffer } from "https://cdn.jsdelivr.net/npm/@encode42/nbs.js/dist/esm.js";

const songFile = await Deno.readFile("song.nbs"); // Read a NBS file
const buffer = new Uint8Array(songFile).buffer; // Create an ArrayBuffer
const song = fromArrayBuffer(buffer); // Parse song from ArrayBuffer

console.log(song);
```
</details>

<details>
<summary>
Node.js
</summary>

```js
const fs = require("fs");
const { fromArrayBuffer } = require("@encode42/nbs.js"); // Import NBS.js

const songFile = fs.readFileSync("song.nbs"); // Read a NBS file
const buffer = new Uint8Array(songFile).buffer; // Create an ArrayBuffer
const song = fromArrayBuffer(buffer); // Parse song from ArrayBuffer

console.log(song);
```

[![NPM Badge]][NPM]
</details>
</details>

<details>
<summary>
<b>Is there a demo?</b>
</summary>

~~Yes! A GitHub pages site is located [here](https://encode42.github.io/NBS.js/demo/). It contains a demonstration of how to read and process NBS files, displays the song structure, and plays the song through the browser.~~

The demo is currently under development. Check [NBSPlayer](https://github.com/encode42/NBSPlayer) for a working example!

<!-- [![Demo Badge]][Demo] -->
</details>

<details>
<summary>
<b>Where's the changelog?</b>
</summary>

I don't create GitHub releases, but I do keep a changelog [here][Changelog]!

[![Changelog Badge]][Changelog]
</details>

### 🔨 Building
Ensure [PNPM](https://pnpm.io/) and [Node.js](https://nodejs.org/) are installed.

1. Enter the directory containing the NBS.js source code in your terminal.
2. Install the build dependencies via `pnpm install`.
3. Run `pnpm run build` to generate the Node.js and browser modules.

Generated files:
- `dist/cjs.js`: CommonJS bundle, used by Node.js.
- `dist/esm.js`: ES module for browser script modules.
- `dist/umd.js`: UMD bundle for browser scripts.
- `dist/*.min.js`: Minified bundle.
- `build/`: Built ES2015 files.
