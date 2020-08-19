## Notes

This is a quick guide to setup VSCode in a new React application using ESLint, Prettier, Husky and Pretty-quick as instructed by [Manorisms](https://www.youtube.com/watch?v=bfyI9yl3qfE).

The approach is to let ESLint run the prettier package for Javascript files and let the Prettier extension for everything else.

Also, Husky calls Pretty-quickin order to automatically run Prettier against files that were modified before each commit.

Finally, this is a Test Driven Development and uses Jest as a testing tool.

### Step-by-step

1. Bootstrap create-react-app
   `npx create-react-app APP_NAME`

1.1. If you haven't, add ESLint extension in VSCode.
1.2. Do the same for the Prettier extension

2. CD into folder and install the following:

   ```
   npm i prettier eslint-config-prettier eslint-plugin-prettier -D

   npm i husky lint-staged -D

   npm install --save-dev jest
   ```

3. Create a .eslintrc file with:

```
  {
    "extends": ["react-app", "plugin:prettier/recommended"]
  }
```

4. Add this to `package.json`:

```
  "husky": {
      "hooks": {
        "pre-commit": "pretty-quick --staged"
      }
  }
```

3.2. If you haven't, add these configurations to the Settings JSON file for VSCode:

```
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },

  "[javascript]": {
    "editor.formatOnSave": false
  },
  "eslint.alwaysShowStatus": true,
  "prettier.disableLanguages": ["js"],
```
