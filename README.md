# space

Coding Challenge for space

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run unit tests [Jest](https://jestjs.io/)

```sh
npm run test

```

Unit tests are inside `src/components/tests/SignupForm.spec.js`
I had an issue setting up Jest on Vue as it was first time I used this combination.
You might encounter some errors while running tests but all the logic is there.

## Notes

Initially I used axios as an HTTP Client for making a post request. Everything worked smoothly at first.
After adding tests, the package started act strange. The package was installed, however the package was undefined inside the components.
Therefore I decided to take more traditional route and implement it using `Fetch API`.
