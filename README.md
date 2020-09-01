# Fast File CLI

CLI tool to generate new files based on teams best practices.

## Getting Started

Install `ffc`: 
```
> npm install -g ffc
```

## Usage

| Command | Alias | Description | Default | Example |
|---|---|---|---|---|
| **generate** | **g** | It generates a file, `<component>` is what you define in your config file | `n/a` | `ffc generate <component> src/components/thisIsAComponent` |
| **flat** | **f** | Flat doesn't create container folder | `false` | `ffc g <component> src/components/thisIsAComponent --flat` |
| **help** | **n/a** | It shows all the available commands | `n/a` | `ffc generate --help` |
| **help** | **n/a** | It shows usage help | `n/a` | `ffc --help` |


### Setup

First, create your schematic folder in your project's root folder. Inside that folder, create your component file with it's files.

Example:

```shell
package.json
src/
schematic/
    component/
        {name}.js
        ...
...
```

Inside `schematic/component/` you can add any number of files with any file extension.

Example:
```shell
package.json
src/
schematic/
    component/
        {name}.js
        {name}.scss
        {name}.desktop.scss
        {name}.tablet.scss
        {name}.mobile.scss
...
```

Now, you need to write your `ffcconfig.json` in your project's root folder.

### ffcconfig.json

This is a required config file that contains:
```json
{
    "commands": [
        {
            "command": ["component", "c"],
            "schematic": "schematic/component",
            "folderStyle": "camel"
        },
        ...
    ]
}
```

### Folder/File styles

| Name | Style | Example |
|---|---|---|
| **Lower Case** |  | thisisaexample |
| **Camel Case** | `camel` | thisIsAExample |
| **Pascal Case** | `pascal` | ThisIsAExample  |
| **Snake Case** | `snake` | this_is_a_example  |
| **Kebab Case** | `kebab` | this-is-a-example  |

### Templates

`ffc` uses a very simple template system that works on file name and file content. The only available variable atm is `{name:<style>}`.

All the available options are: `{name}`, `{name:camel}`, `{name:pascal}`, `{name:snake}` and `{name:kebab}`.

So, if we run: `ffc generate component src/components/thisIsAComponent`

- `{name}.js` will become `thisisacomponent.js`
- `{name:camel}.js` will become `thisIsAComponent.js`
- `{name:pascal}.js` will become `ThisIsAComponent.js`
- `{name:snake}.js` will become `this_is_a_component.js`
- `{name:kebab}.js` will become `this-is-a-component.js`

This also works for file contents, React component example:

```javascript
// {name:pascal}.js
import React from 'react';

import './{name:snake}.scss';

class {name:pascal} extends React.Component {
    render() {
        return (
            <div className="{name:pascal}">
                <span>{name} works</span>
            </div>
        );
    }
}

export default {name:pascal};
```

This will become:

```javascript
// ThisIsAComponent.js
import React from 'react';

import './this_is_a_component.scss';

class ThisIsAComponent extends React.Component {
    render() {
        return (
            <div className="ThisIsAComponent">
                <span>thisisacomponent works</span>
            </div>
        );
    }
}

export default ThisIsAComponent;
```

## How to Contribute

All pull requests are welcome