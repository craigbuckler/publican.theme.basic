# Publican basic theme

This is a basic [Publican static site generator](https://publican.dev/) theme you can adapt or use as-is.

Please [refer to the demonstration site for full documentation](https://publican-theme-basic.pages.dev/blog/quickstart/).


## Quickstart

To build a site using this theme, ensure you have [Node.js](https://nodejs.org/) version 20 or above installed.


### Download the theme

You can either:

1. [download and extract a ZIP of the latest code](https://github.com/craigbuckler/publican.theme.basic/archive/refs/heads/main.zip), or

1. [fork this repository](https://github.com/craigbuckler/publican.theme.basic/fork) and clone it.

   ```bash
   git clone git@github.com:<your-id>/publican.theme.basic.git
   ```


### Install dependencies

Enter the theme directory and install the dependencies (the [Publican](https://www.npmjs.com/package/publican) static site generator and [LiveLocalhost](https://www.npmjs.com/package/livelocalhost) development server):

```bash
cd publican.theme.basic
npm install
```


### Run a development build

To build the site and launch a development server run:

```bash
npm start
```

The log shows the server's address:

```bash
[livelocalhost] development server started: http://localhost:8281/
```

Open this in your browser and look around the site.

To stop the server, press <kbd>Ctrl</kbd> | <kbd>Cmd</kbd> + <kbd>C</kbd> in the terminal.


### Run a production build

To build a production copy of the site with minified HTML files, run:

```bash
npm run build
```

The files built to the `build/` directory can be copied to any web server.
