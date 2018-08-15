module.exports = {
   'parserOptions': {
     	'ecmaVersion': 2018,
   },
   'plugins': [
      'vue'
   ],
   'extends': [
      'plugin:vue/essential'
   ],
   'rules': {
      'indent': ['warn', 3],
      'comma-dangle': ['warn', 'always-multiline'],
      'no-multiple-empty-lines': ['warn', {
         'max': 2,
      }],
      'quotes': ['warn', 'single', {
         'allowTemplateLiterals': true,
      }],
      'no-trailing-spaces': ['warn'],
      'eol-last': ['off'],
      'space-before-function-paren': ["warn", "never"]
   },
   overrides: [{
      files: ['*.vue'],
      rules: {
         'indent': 'off',
         'vue/script-indent': [
            'warn',
            3,
            {
               'baseIndent': 1
            },
         ],
         'vue/attributes-order': ['off', 'always'],
         'vue/html-indent': ['warn', 3],
         'vue/html-self-closing': ['warn'],
         'vue/mustache-interpolation-spacing': ['off'],
      },
   }],
}