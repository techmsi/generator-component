<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Getting Started](#getting-started)
  - [Install Yeoman](#install-yeoman)
- [Overview](#overview)
- [Questions](#questions)
  - [Tag Choice](#tag-choice)
  - [Folder Choices](#folder-choices)
    - [Additional Questions](#additional-questions)
      - [One Context](#one-context)
      - [More than one context](#more-than-one-context)
    - [No Context](#no-context)
  - [Do you need more than one viewport?](#do-you-need-more-than-one-viewport)
    - [Additional Questions](#additional-questions-1)
    - [No Additional Questions](#no-additional-questions)
- [Unit Tests](#unit-tests)
  - [Running Tests](#running-tests)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

 generator-component [![Build Status](https://secure.travis-ci.org/techmsi/generator-component.png?branch=master)](https://travis-ci.org/techmsi/generator-component)

## Getting Started

### Install Yeoman

```bash
npm install -g yo
```

>[Yeoman](http://yeoman.io) generator

To install `generator-component` from npm, run:

```bash
npm install -g generator-component
```

Finally, initiate the generator:

```bash
yo component component-name
```

## Overview
You will be taken through a series of questions then the following files will be **generated** in all cases

* `component-name`/index.html
* `component-name`/index.js
* `component-name`/print.css

_The **component-name** is passed as an argument when calling the generator._
## Questions

### Tag Choice
* Which tag would you like to use?

default: `Section`
* Choose a semantically appropriate tag.

### Folder Choices
* Which folders would you like to create?

default: `Media Folder, Contexts Folder`

❯&nbsp;&#9673; Media Folder <br/>
&nbsp;&#9673; Contexts Folder

_( Choice: Contexts Folder )_

#### Additional Questions
* Enter the number of context folders you need
default: `1`

##### One Context
* What do you want to name your context folder?

default: `mysite`

**Generated Files**

* component-name/contexts/`mysite`/0-600.css
* component-name/contexts/`mysite`/600-1024.css
* component-name/contexts/`mysite`/1024+.css

##### More than one context
* Enter the names of your contexts folder separated by commas.

default: `mysite,myothersite`

**Generated Files**

* component-name/contexts/`mysite`/0-600.css
* component-name/contexts/`mysite`/600-1024.css
* component-name/contexts/`mysite`/1024+.css
* component-name/contexts/`myothersite`/0-600.css
* component-name/contexts/`myothersite`/600-1024.css
* component-name/contexts/`myothersite`/1024+.css


_These **context names** are either defaults or what is entered when prompted._

#### No Context

**Generated Files**

* component-name/0-600.css
* component-name/600-1024.css
* component-name/1024+.css


### Do you need more than one viewport?
#### Additional Questions
_( Answer: Yes )_
  - Which viewports would you like to build the css for?
  - Will this only be visible on Desktop?
  - What is the maximum range for the Mobile Viewport? (600)
  - What is the maximum range for the Tablet Viewport? (1024)

**Generated Files**

* component-name/`0-600`.css
* component-name/`600-1024`.css
* component-name/`1024+`.css

_These **ranges** are either defaults or what is entered when prompted._

#### No Additional Questions
_( Answer: No )_

**Generated Files**

* component-name/all.css

## Unit Tests
* Tests included in module to check for various cases.

### Running Tests

```bash
npm test
```

```bash
npm test --coverage
```

```bash
open coverage/lcov-report/index.html
```

## Contributing

Contributions are welcome. Please file issues with any problems that you experience. Pull requests are welcome.

## License

[MIT](LICENSE)
