## Backend
### Prerequisites
Install the JavaScript runtime Deno: https://docs.deno.com/runtime/manual \
When working with VS Code the Deno extension by denoland is recommended: https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno \
To get an overview of the code base try out Mammutmap: https://marketplace.visualstudio.com/items?itemName=mammutmap.mammutmap
### Start Backend
```
cd ./backend
deno run main.ts
```
or if you trust it
```
deno run --allow-all ./backend/main.ts
```
While developing the --watch option is very handy
```
deno run --allow-all --watch ./backend/main.ts
```

server is now listening on http://localhost:8000/greet?input="World"

## Scripts
There are some scripts that can be run e.g.
```
deno run --allow-net ./scripts/greetAll.ts
```
the server is not started in this script and needs to be started separately (`deno run --allow-all ./backend/main.ts`)
