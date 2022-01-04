[Support]: https://encode42.dev/support
[Discord Badge]: https://img.shields.io/discord/646517284453613578?color=7289da&labelColor=7289da&label=​&logo=discord&logoColor=white&style=flat-square
[Codacy]: https://app.codacy.com/gh/Encode42/NBS.js
[Codacy Badge]: https://img.shields.io/codacy/grade/68f12c67186549b88ab7ada56ac83efc?color=172B4D&labelColor=172B4D&label=​&logo=codacy&style=flat-square

# NBS.js
### A versatile API for reading, manipulating, and writing [OpenNBS](https://opennbs.org) files, heavily inspired by [NBSEditor](https://github.com/TheGreatFoxxy/NBSEditor/blob/408e3e58058bd72286fc7e9740d62a39a0c919dd/src/NBS.js) and [NoteBlockAPI](https://github.com/koca2000/NoteBlockAPI).

[![][Codacy Badge]][Codacy] [![][Discord Badge]][Support]

**Note:** This API is still in early development. Writing NBS files is not yet supported. Report any bugs found!

### 🔧 Including
🌐 **Browser**
```html
<script src="https://cdn.jsdelivr.net/gh/Encode42/NBS.js@main/dist/index.js"></script>
```

⚙️ **Node.js**
```bash
npm i @encode42/nbs.js
```

### ❔ FAQ
<details>
<summary>
Is there a demo?
</summary>

Yes! A GitHub pages site is located [here](https://encode42.github.io/NBS.js/demo/). It contains a demonstration of how to read and process NBS files, and displays the song structure.
</details>

<details>
<summary>
How do I use this?
</summary>

[Install NBS.js for your platform](#-setup), then refer to the examples below.

Classes and methods exported by NBS.js:
- `Song`

<details>
<summary>
Browser
</summary>

```html
<input type="file" id="file-input">

<script src="https://cdn.jsdelivr.net/gh/Encode42/NBS.js@main/dist/index.js"></script> <!-- Import NBS.js -->
<script>
window.addEventListener("load", () => {
  // Initialize file input
  document.getElementById("file-input").addEventListener("change", event => {
    const songFile = event.target.files[0]; // Read a NBS file
    songFile.arrayBuffer().then(buffer => { // Create an ArrayBuffer
      const song = NBSjs.Song.fromArrayBuffer(buffer); // Parse song from ArrayBuffer

      console.log(song);
    });
  });
});
</script>
```
</details>

<details>
<summary>
Node.js
</summary>

```js
const fs = require("fs");
const { Song } = require("@encode42/nbs.js"); // Import NBS.js

const songFile = fs.readFileSync("song.nbs"); // Read a NBS file
const buffer = new Uint8Array(songFile).buffer; // Create an ArrayBuffer
const song = Song.fromArrayBuffer(buffer); // Parse song from ArrayBuffer

console.log(song);
```
</details>
</details>

### 🔨 Building
Ensure [Yarn](https://yarnpkg.com/) and [Node.js](https://nodejs.org/en/) are installed.

1. Enter the directory containing the NBS.js source code in a terminal window.
2. Install the build dependencies via `yarn install`.
3. Run `yarn run build` to generate the Node.js module and webpack bundle.

Node.js module can be found in the `build` directory, and the wepback bundle is stored at `dist/index.js`.
