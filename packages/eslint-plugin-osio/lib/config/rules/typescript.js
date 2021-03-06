// See https://github.com/nzakas/eslint-plugin-typescript

module.exports = {
  // Enforce one space after the colon and zero spaces before the colon of a type annotation.
  'typescript/type-annotation-spacing': ['error'],

  // Require explicit return types on functions and class methods
  'typescript/explicit-function-return-type': 'off',

  // Enforce accessibility modifiers on class properties and methods. (member-access from TSLint)
  'typescript/explicit-member-accessibility': 'off',

  // Enforce interface names are prefixed. (interface-name from TSLint)
  'typescript/interface-name-prefix': 'off',

  // Enforce naming conventions for class members by visibility.
  'typescript/member-naming': 'off',

  // Enforce /// <reference /> is not used. (no-reference from TSLint)
  'typescript/no-triple-slash-reference': 'error',

  // Disallow generic Array constructors
  'typescript/no-array-constructor': 'error',

  // Enforce the use of as Type assertions instead of <Type> assertions. (no-angle-bracket-type-assertion from TSLint)
  'typescript/no-angle-bracket-type-assertion': 'error',

  // Enforce the any type is not used. (no-any from TSLint)
  'typescript/no-explicit-any': 'off',

  // Disallows explicit type declarations for variables or parameters initialized to a number, string, or boolean. (no-inferrable-types from TSLint)
  'typescript/no-inferrable-types': 'off',

  // Disallow the use of custom TypeScript modules and namespaces
  'typescript/no-namespace': 'off',

  // Disallow non-null assertions using the ! postfix operator
  'typescript/no-non-null-assertion': 'error',

  // Disallow the use of variables before they are defined.
  'typescript/no-use-before-define': 'off',

  // Disallows the use of require statements except in import statements (no-var-requires from TSLint)
  'typescript/no-var-requires': 'error',

  // Enforce the use of the keyword namespace over module to declare custom TypeScript modules. (no-internal-module from TSLint)
  'typescript/prefer-namespace-keyword': 'off',

  // Disallow the use of type aliases. (interface-over-type-literal from TSLint)
  // breaks `export type Message = string | ((colorizer: any) => string);`
  'typescript/no-type-alias': 'off',

  // Enforce a standard member declaration order. (member-ordering from TSLint) <FEEDBACK>
  'typescript/member-ordering': [
    'error',
    {
      default: [
        'public-static-field',
        'protected-static-field',
        'private-static-field',
        'public-static-method',
        'protected-static-method',
        'private-static-method',
        'public-instance-field',
        'protected-instance-field',
        'private-instance-field',
        'constructor',
        'public-instance-method',
        'protected-instance-method',
        'private-instance-method',
      ],
    },
  ],

  // Prevent TypeScript-specific constructs from being erroneously flagged as unused
  'typescript/no-unused-vars': 'off',

  // Enforce member overloads to be consecutive.
  'typescript/adjacent-overload-signatures': 'error',

  // Disallow parameter properties in class constructors. (no-parameter-properties from TSLint)
  'typescript/no-parameter-properties': 'off',

  // Enforce PascalCased class and interface names. (class-name from TSLint)
  'typescript/class-name-casing': 'error',

  // Enforce a member delimiter style in interfaces and type literals.
  'typescript/member-delimiter-style': [
    'error',
    {
      delimiter: 'semi',
      overrides: {
        typeLiteral: {
          delimiter: 'semi',
        },
      },
    },
  ],

  // Disallow the declaration of empty interfaces. (no-empty-interface from TSLint)
  'typescript/no-empty-interface': 'off',

  // Covered by 'typescript/member-ordering'
  'sort-class-members/sort-class-members': 'off',

  // Already supported by TS
  'no-undef': 'off',
  'no-unused-expressions': 'off',
  'no-unused-vars': 'off',
  'no-useless-constructor': 'off',
  'no-shadow': 'off',
  'no-use-before-define': 'off',
  'no-dupe-class-members': 'off',

  // Does not support TS equivalent
  'import/no-unresolved': 'off',
  'import/no-extraneous-dependencies': 'off',
  'no-empty-function': 'off',

  // Flag typedef files with multiple modules with export default
  'import/export': 'off',

  // Breaks typescript-eslint-parser
  strict: 'off',
  'array-callback-return': 'off',
  'getter-return': 'off',

  // https://github.com/eslint/typescript-eslint-parser/issues/414
  'no-restricted-globals': 'off',

  // False positives when using decorators in constructor params
  // These will already be covered by TS
  // eg constructor(@Inject('') private x: number, @Inject('') private y: number) {}
  'no-redeclare': 'off',
  'no-dupe-args': 'off',
};
