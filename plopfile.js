module.exports = (plop) => {
  // #region helpers
  plop.addHelper('upperCase', text => text.toUpperCase());
  plop.addHelper(
    'capitalize',
    text => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
  );
  // eslint-disable-next-line func-names
  plop.addHelper('if_equal', function (a, b, opts) {
    // eslint-disable-next-line eqeqeq
    if (a == b) {
      return opts.fn(this);
    }
    return opts.inverse(this);
  });

  plop.setGenerator('rapid pinger', {
    description: 'adds a pinger',
    prompts: [
      {
        type: 'input',
        name: 'serviceKey',
        message: 'what is the service\'s key? (e.g acl, ech, issues, org, etc.)',
        validate: (value) => {
          if (/.+/.test(value)) {
            return true;
          }
          return 'a name for the service must be provided';
        },
      },
      {
        type: 'list',
        name: 'envKey',
        message: 'on what env do you want to ping the service?',
        choices: [
          { name: 'staging', value: 'stage' },
          { name: 'production', value: 'prod' },
        ],
      },
    ],
    actions: [
      // {
      //   type: 'addMany',
      //   destination: 'src/{{name}}',
      //   base: 'plop-templates/component',
      //   templateFiles: 'plop-templates/component/**/*.hbs',
      //   skipIfExists: true,
      // },
      // {
      //   type: 'append',
      //   path: 'src/renderer/consts.js',
      //   pattern: '// PLOP SERVICE_KEY PLACEHOLDER',
      //   separator: '\n',
      //   template: '  {{constantCase serviceKey}}: \'{{serviceKey}}\',',
      // },
      // {
      //   type: 'append',
      //   path: 'src/renderer/redux/actionTypes.js',
      //   pattern: '// PLOP ACTION_TYPES_PLACEHOLDER',
      //   separator: '\n\n',
      //   templateFile: 'plop-templates/append/actionTypes.hbs',
      // },
      // {
      //   type: 'append',
      //   path: 'src/renderer/redux/actions.js',
      //   pattern: '// PLOP ACTION IMPORTS PLACEHOLDER',
      //   separator: '\n',
      //   templateFile: 'plop-templates/append/actions.hbs',
      // },
      {
        type: 'modify',
        path: 'src/renderer/redux/actions.js',
        pattern: /(\/\/ PLOP SET_RESPONSE PROD PLACEHOLDER)/g,
        template: '$1{{#if_equal envKey "prod"}}\n      [SERVICE_KEY.{{constantCase serviceKey}}]: SET_{{constantCase serviceKey}}_PROD_RESPONSE,{{else}}{{/if_equal}}',
      },
      {
        type: 'modify',
        path: 'src/renderer/redux/actions.js',
        pattern: /(\/\/ PLOP SET_RESPONSE STAGE PLACEHOLDER)/g,
        template: '$1{{#if_equal envKey "stage"}}\n      [SERVICE_KEY.{{constantCase serviceKey}}]: SET_{{constantCase serviceKey}}_STAGE_RESPONSE,\n{{/if_equal}}',
      },
      // {
      //   type: 'append',
      //   path: 'src/renderer/redux/actions.js',
      //   pattern: '// PLOP GET_INIT_DATA PROD PLACEHOLDER',
      //   // separator: '\n',
      //   template: '{{#if_equal envKey "prod"}}[SERVICE_KEY.{{constantCase serviceKey}}]: GET_INIT_PROD_{{constantCase serviceKey}}_DATA,\n{{/if_equal}}',
      // },
      // {
      //   type: 'append',
      //   path: 'src/renderer/redux/actions.js',
      //   pattern: '// PLOP GET_INIT_DATA STAGE PLACEHOLDER',
      //   // separator: '\n',
      //   template: '{{#if_equal envKey "prod"}}{{else}}[SERVICE_KEY.{{constantCase serviceKey}}]: GET_INIT_STAGE_{{constantCase serviceKey}}_DATA,\n{{/if_equal}}',
      // },
      // {
      //   type: 'append',
      //   path: 'src/renderer/redux/actions.js',
      //   pattern: '// PLOP SET_INIT_DATA PROD PLACEHOLDER',
      //   // separator: '\n',
      //   template: '{{#if_equal envKey "prod"}}[SERVICE_KEY.{{constantCase serviceKey}}]: SET_INIT_PROD_{{constantCase serviceKey}}_DATA,\n{{/if_equal}}',
      // },
      // {
      //   type: 'append',
      //   path: 'src/renderer/redux/actions.js',
      //   pattern: '// PLOP SET_INIT_DATA STAGE PLACEHOLDER',
      //   // separator: '\n',
      //   template: '{{#if_equal envKey "prod"}}{{else}}[SERVICE_KEY.{{constantCase serviceKey}}]: SET_INIT_STAGE_{{constantCase serviceKey}}_DATA,\n{{/if_equal}}',
      // },
      // {
      //   type: 'append',
      //   path: 'src/renderer/redux/actions.js',
      //   pattern: '// PLOP NOTIFY_CHANGES PROD PLACEHOLDER',
      //   // separator: '\n',
      //   template: '{{#if_equal envKey "prod"}}[SERVICE_KEY.{{constantCase serviceKey}}]: NOTIFY_{{constantCase serviceKey}}_PROD_CHANGES,\n{{/if_equal}}',
      // },
      // {
      //   type: 'append',
      //   path: 'src/renderer/redux/actions.js',
      //   pattern: '// PLOP NOTIFY_CHANGES STAGE PLACEHOLDER',
      //   // separator: '\n',
      //   template: '{{#if_equal envKey "prod"}}{{else}}[SERVICE_KEY.{{constantCase serviceKey}}]: NOTIFY_{{constantCase serviceKey}}_STAGE_CHANGES,\n{{/if_equal}}',
      // },
      // {
      //   type: 'append',
      //   path: 'src/renderer/redux/reducers/{{camelCase serviceKey}}{{pascalCase envKey}}.js',
      //   pattern: '// PLOP IMPORT REDUCERS PLACEHOLDER',
      //   separator: '\n',
      //   template: 'import {{camelCase serviceKey}}{{pascalCase envKey}} from \'./{{camelCase serviceKey}}{{pascalCase envKey}}.reducer\';',
      // },
      // {
      //   type: 'append',
      //   path: 'src/renderer/redux/reducers/{{camelCase serviceKey}}{{pascalCase envKey}}.js',
      //   pattern: '// PLOP COMBINE_REDUCERS PLACEHOLDER',
      //   separator: '\n',
      //   template: '{{camelCase serviceKey}}{{pascalCase envKey}},',
      // },
    ],
  });
};
