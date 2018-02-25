---
theme: "moon"
customTheme: "largerSnippets"
transition: "slide"
---

## Creating an Angular UI Component Library

Graham Murray

---

## What is Angular?

---

## Getting Started

* Install [Node.js](https://nodejs.org/en/download/)
* Install [VS Code](https://code.visualstudio.com/)

--

## Setting up the projects

```cmd
> npm install @angular/cli
> ng new awesome-library
> ng new awesome-site
> code awesome-library
```

---

## Generate some components

```cmd
> ng g component round-image --no-spec --is --it --flat
> ng g component awesome-image --no-spec --is --it --flat
```
* --no-spec: skip emitting testing file.
* --is: (--inline-style) prevents generation of a separate file for the style.
* --it: (--inline-template) prevents generation of a separate file for the template.

---

## Let's Code!

---

## Easing

<img src="cubicinout.png" width="400" />

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
npm install ..\awesome-library\dist\awesome-library-0.0.0.tgz
```

---

## Questions