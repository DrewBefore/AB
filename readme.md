# Portfolio Template

## Setup
- Have [node](https://nodejs.org/en/download/) installed 
- Clone this repo: `git clone https://github.com/DrewBefore/AndyPort.git`
- Open a terminal to the folder you downloaded when you cloned the repo
- From the root folder of the projct run `npm install`
- Install gulp globally -
    - In the terminal type ```npm install --global gulp-cli```
---

## Development
- From the root folder of the project type `gulp` to start a server that will automatically watch for changes
- All files from `src/` Will be copied over and served from the `dist/` folder 
- Server is at `localhost:3000`

---
## Deployment
- `gulp deploy` to deploy changes to [https://drewbefore.github.io/AB/](https://drewbefore.github.io/AB/)
