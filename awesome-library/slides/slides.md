---
theme: "moon"
customTheme: "largerSnippets"
transition: "slide"
---

## Creating an Angular UI Component Library

Graham Murray

---

## Who Am I?
* Senior Architect at Infragistics
    * (Makes UI components)
* Author: [JavaScript and jQuery for Data Analysis And Visualization](https://www.amazon.com/JavaScript-jQuery-Data-Analysis-Visualization/dp/1118847067)
* Transpiler creator and enthusiast.
* Follow me on Twitter [@the_graham](https://twitter.com/the_graham)

---

## What is Angular?

---

## Getting Started

* Install [Node.js](https://nodejs.org/en/download/)
* Install [VS Code](https://code.visualstudio.com/)

--

## Setting up the projects

```cmd
> npm install @angular/cli -g
> ng new awesome-library
> ng new awesome-site
> code awesome-library
```

---

## Generate some components

```cmd
> ng g component round-image --no-spec
> ng g component awesome-image --no-spec
```
* --no-spec: skip emitting testing file.
* Today, I'll use a snippet.

---

## Let's Code!

---

## Packaging Things Up
* Why?
* Why JS!?!
* ng-packagr

--

#Installing ng-packagr

```cmd
npm install ng-packagr --save-dev
```

--

#Configuring ng-pagackr

```json
"scripts": {
    //...
    "build-lib": "ng-packagr -p package.json",
    //...
}
//...
"ngPackage": {
    "lib": {
        "entryFile": "public_api.ts"
    }
}
```

--

public_api.ts:
```ts
export * from './src/components/round-image.component';
export * from './src/components/awesome-image.component';
```

--

```cmd
> npm run build-lib
```

--

```cmd
> cd dist
> npm cache clean
> npm pack
```

--

```cmd
npm install ..\awesome-library\dist\awesome-library-0.0.0.tgz
```

---

## Questions