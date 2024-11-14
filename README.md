# .

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### How to use SCSS variables from variables file
```scss
@import "@/assets/styles/scss/variables.scss";
.class {
  color: lightColor(primary);
}
```

### How to apply color and background color using class in template
```html
<div class="text-colorName">Text Color will be applied</div>
<div class="bg-colorName">Background color will be applied</div>
```

### How to apply form styles
```html
<v-form class="base-form">
  <div class="form-field">
    <v-text-field
      v-model.trim="email"
      class="form-field-input"
      type="email"
      placeholder="email@domain.com"
      prepend-inner-icon="mdi-email-lock"
      variant="solo"
    >
    </v-text-field>
  </div>
</v-form>
```