module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		'arrow-parens': 'error',
		'arrow-spacing': 'error',
		'block-spacing': 'error',
		'comma-spacing': 'error',
		'eol-last': 'error',
		eqeqeq: 'error',
		'func-call-spacing': 'error',
		'no-console': [
			'error',
			{
				allow: ['warn', 'error'],
			},
		],
		'no-extra-semi': 'error',
		'no-eq-null': 'error',
		'no-multi-spaces': 'error',
		'no-multiple-empty-lines': [
			'error',
			{
				max: 1,
			},
		],
		'no-prototype-builtins': 'off',
		'no-template-curly-in-string': 'error',
		'no-trailing-spaces': 'error',
		'no-useless-concat': 'error',
		'no-unreachable': 'error',
		'no-unused-vars': [
			'error',
			{
				varsIgnorePattern: '_',
			},
		],
		'prefer-const': 'error',
		quotes: ['error', 'single'],
		'quote-props': [
			'error',
			'as-needed',
			{
				unnecessary: false,
			},
		],
		semi: 'error',
		'semi-spacing': 'error',
		'space-before-blocks': 'error',
		'react/react-in-jsx-scope': 'off',
		'react/jsx-uses-react': 'off',
		'valid-typeof': [
			'error',
			{
				requireStringLiterals: true,
			},
		],
	},
};
