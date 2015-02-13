# generator-component [![Build Status](https://secure.travis-ci.org/techmsi/generator-component.png?branch=master)](https://travis-ci.org/techmsi/generator-component)

> [Yeoman](http://yeoman.io) generator


## Getting Started

### Install Yeoman

```bash
npm install -g yo
```

### Yeoman Generators

To install generator-component from npm, run:

```bash
npm install -g generator-component
```

Finally, initiate the generator:

```bash
yo component component-name
```

## Questions
You will be taken through a series of questions then the following files will be generated:

* `component-name`/index.html
* `component-name`/index.js
* `component-name`/print.css

_The **component-name** is passed as an argument when calling the generator._

### Do you need more than one viewport?
#### _Yes_

* component-name/`0-600`.css
* component-name/`600-1024`.css
* component-name/`1024+`.css

_These **ranges** are either defaults or what is entered when prompted._
#### _No_

* component-name/all.css

### Which folders would you like to create?
#### _Contexts Folder_

* component-name/contexts/`mysite`/0-600.css
* component-name/contexts/`mysite`/600-1024.css
* component-name/contexts/`mysite`/1024+.css

### Enter the number of context folders you need
default: `1`

If you enter more than 1 then you will be asked the question below:

#### Enter the names of your contexts folder separated by commas.
default: `mysite,myothersite`

* component-name/contexts/`mysite`/0-600.css
* component-name/contexts/`mysite`/600-1024.css
* component-name/contexts/`mysite`/1024+.css

* component-name/contexts/`myothersite`/0-600.css
* component-name/contexts/`myothersite`/600-1024.css
* component-name/contexts/`myothersite`/1024+.css


_These **context names** are either defaults or what is entered when prompted._

#### No Context

* component-name/0-600.css
* component-name/600-1024.css
* component-name/1024+.css

## License

MIT
