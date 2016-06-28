# tplate-java

[![npm version](https://badge.fury.io/js/tplate-java.svg)](http://badge.fury.io/js/tplate-java)
<img src="https://travis-ci.org/arildwtv/tplate-java.svg?branch=master" />

<blockquote>A set of tplate segments for generating Java code.</blockquote>

## What ...?

_tplate-java_ is a set of [tplate](https://github.com/arildwtv/tplate) segments tailored to generating Java code. Note that it is not the responsibility of _tplate-java_ to generate perfect (or even necessarily compilable) code. It is, however, meant to ease your Java code generation.

## Installation

```
npm install tplate tplate-java --save
```

## Usage

See the [examples](https://github.com/arildwtv/tplate/tree/master/src/examples) folder for  examples.

Also, please see the [unit tests](https://github.com/arildwtv/tplate-java/tree/master/test) for
the expected behavior of this library.

### The Very Basics

```javascript
import { createTemplate } from 'tplate';
import { fileSegment } from 'tplate-java';

const { t } = createTemplate();
const output = t(classSegment({
  inPackage: 'com.example.first',
  javaClass: { name: 'Unicorn' }
}));
// =>
// package com.example.first;
// 
// public class Unicorn {
// }
```

## API

### `fileSegment(fileSpec): String`

Outputs a typical Java class/interface/enum file. The `fileSpec` is as follows (note that you may only define one of `javaClass`, `javaEnum` or `javaInterface`):

```js
{
  inPackage: 'com.example',
  imports: [<importSegment>, ...],
  javaClass: <classSegment>,
  javaEnum: <enumSegment>,
  javaInterface: <interfaceSegment>
}
```

### `classSegment(classSpec): String`

Outputs a Java class, but without the package definition and import statements. The `classSpec` is as follows:

```js
{
  name: 'YourClass',
  extendsClass: 'YourAbstractClass',
  genericTypes: [<genericTypeSegment>, ...],
  accessModifier: 'public',
  scope: 'instance',
  interfaces: [<interfaceImplementationSegment>, ...],
  annotations: [<annotationSegment>, ...],
  fields: [<fieldSegment>, ...],
  constructors: [<constructorSegment>, ...],
  methods: [<methodSegment>, ...],
  innerClasses: [<classSegment>, ...]
}
```

### `interfaceSegment(interfaceSpec): String`

Outputs a Java interface, but without the package definition and import statements. The `interfaceSpec` is as follows:

```js
{
  name: 'YourInterface',
  extendsInterfaces: [<interfaceImplementationSegment>, ...],
  genericTypes: [<genericTypeSegment>, ...],
  accessModifier: 'public',
  scope: 'instance',
  annotations: [<annotationSegment>, ...],
  methods: [<methodSegment>, ...]
}
```

### `enumSegment(enumSpec): String`

Outputs a Java enumeration, but without the package definition and import statements. The `enumSpec` is as follows:

```js
{
  name: 'YourEnum',
  accessModifier: 'public',
  scope: 'instance',
  interfaces: [<interfaceImplementationSegment>, ...],
  annotations: [<annotationSegment>, ...],
  fields: [<fieldSegment>, ...],
  constants: [<constantSegment>, ...],
  constructors = [<constructorSegment>, ...],
  methods = [<methodSegment>, ...]
}
```

### `applyMiddleware(...middleware): segments`

Applies middleware to your segments. Each middleware will be called before a spec is sent to the segments. This allows each middleware to transform or override the spec before passing it to the next middleware and, ultimately, to the segments.

_tplate-java_ comes with two built-in middleware. (You are of course free to implement your own!) These are:

* `importCollectorMiddleware` (intended for use with `fileSegment`): Collects all (nested) `type` properties in the spec, and populates the `imports` property in the `fileSpec` accordingly. This may be helpful, because you don't have to bother with the imports yourself. This is, however, only partially true, because it does not consider the usage of external classes, enums or interfaces that are in method bodies, for instance. Only `type` properties are taken into consideration.
* `typePackageRemoverMiddleware` (intended for use with `fileSegment`): Removes all package paths from all (nested) `type` properties in the spec. For instance, it will transform `java.util.List<String>` to `List<String>`. Intended for use with the `importCollectorMiddleware` (see above).

Note: It is important that you apply the `importCollectorMiddleware` before the `typePackageRemoverMiddleware`.

```js
import { createTemplate } from 'tplate';
import { applyMiddleware } from 'tplate-java';
import { importCollectorMiddleware } from
  'tplate-java/dist/middleware/importCollectorMiddleware';
import { typePackageRemoverMiddleware } from
  'tplate-java/dist/middleware/typePackageRemoverMiddleware';
  
const { t } = createTemplate();
const { fileSegment } = applyMiddleware(
  importCollectorMiddleware,
  typePackageRemoverMiddleware
);

t(fileSegment(/* ... */));
```

See the [unit test](https://github.com/arildwtv/tplate-java/blob/master/test/fileSegmentWithMiddlewareTest.js) for a concrete example.

## License

[MIT](http://opensource.org/licenses/MIT) © Arild Tvergrov
