# vimperator-wikipedia

A vimperator plugin to allow you access Wikipedia via a `:wiki` command conveniently.

Basic usage:

![Basic Usage](https://cloud.githubusercontent.com/assets/1297550/5854697/9bbd6d86-a26b-11e4-997f-d96e297ae55f.png)

Use another language and open multiple wiki pages in one command:

![](https://cloud.githubusercontent.com/assets/1297550/5854706/ac6a9d20-a26b-11e4-9c5e-ac3697c930df.png)

## Installation

Just copy `wikipedia.js` to `~/.vimperator/plugin` and run `:loadplugins` in Vimperator (Firefox)
or restart Vimperator (Firefox). (Of course you will need Vimperator first.)

## Usage

### Commands

There's only one command provided currently.

* `:wiki[pedia] [.lang] {title1} [title2] ...`

    Open the Wikipedia pages specified by `title1`, `title2`, etc in the language specified by `lang`.
    Autocompletion is provided.

### Settings

Change the following variables in your `.vimperatorrc` can change the default behaviour of this plugin.

* `g:wikipedia_default_lang`

    Default language for Wikipedia. e.g.: `let g:wikipedia_default_lang = 'zh'`. Default: `'en'`.

* `g:wikipedia_limit`

    Limitation of number of suggestions. Default: `20`.
