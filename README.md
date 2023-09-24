# **BlunderBus Documentation**

## **Overview**

`BlunderBus` is designed to generate a wide array of typographical errors from a given string. This tool simulates common typing mistakes such as substitution, transposition, omission, and insertion.

## **Installation**

To install `BlunderBus` using npm, run the following command:

```bash
npm install blunderbus
```

## **Methods**

- **`substitute(string)`**:
  Generates typographical errors by substituting each character in the provided string with every character in the charset.

- **`cognitiveErrors(string)`**:
  Generates typos based on characters with similar pronunciations.

- **`transposition(string)`**:
  Produces typos by transposing adjacent characters in the given string.

- **`omission(string)`**:
  Generates typographical errors by omitting each character from the provided string once.

- **`insertion(string)`**:
  Generates typos by inserting each letter of the alphabet at every position in the provided string.

- **`all(string)`**:
  Collates all types of typos using the above methods.

---

## **Usage**

First, you need to require and instantiate `BlunderBus`:

```javascript
const BlunderBus = require('blunderbus');
```

To generate all types of typos for a string:

```javascript
for(let typo of BlunderBus.all("hello")) {
    console.log(typo);
}
```

To generate a specific type of typo, for example, the `transposition` method:

```javascript
for(let typo of BlunderBus.transposition("hello")) {
    console.log(typo);
}
```



---