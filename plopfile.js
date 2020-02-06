module.exports = (plop) => {
  // #region helpers
  plop.addHelper('upperCase', text => text.toUpperCase());
  plop.addHelper(
    'capitalize',
    text => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
  );
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
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
        type: 'input',
        name: 'serviceName',
        message: 'what is the service\'s name? (e.g Organization Dashboard, Acl Service, Issues Service, etc.)',
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
          { name: 'production', value: 'prod' },
          { name: 'staging', value: 'stage' },
        ],
      },
    ],
    actions: [
      {
        type: 'append',
        path: 'src/renderer/consts.js',
        pattern: '// PLOP SERVICE_KEY PLACEHOLDER',
        separator: '\n',
        template: '  {{constantCase serviceKey}}: \'{{serviceKey}}\',',
      },
      {
        type: 'append',
        path: 'src/renderer/redux/actionTypes.js',
        pattern: '// PLOP ACTION_TYPES_PLACEHOLDER',
        separator: '\n\n',
        templateFile: 'plop-templates/append/actionTypes.hbs',
      },
      {
        type: 'append',
        path: 'src/renderer/redux/actions.js',
        pattern: '// PLOP ACTION IMPORTS PLACEHOLDER',
        separator: '\n',
        templateFile: 'plop-templates/append/actions.hbs',
      },
      {
        type: 'modify',
        path: 'src/renderer/redux/actions.js',
        pattern: /(\/\/ PLOP SET_RESPONSE PROD PLACEHOLDER)/g,
        template: '$1{{#if_equal envKey "prod"}}\n      [SERVICE_KEY.{{constantCase serviceKey}}]: SET_{{constantCase serviceKey}}_PROD_RESPONSE,\n{{/if_equal}}',
      },
      {
        type: 'modify',
        path: 'src/renderer/redux/actions.js',
        pattern: /(\/\/ PLOP SET_RESPONSE STAGE PLACEHOLDER)/g,
        template: '$1{{#if_equal envKey "stage"}}\n      [SERVICE_KEY.{{constantCase serviceKey}}]: SET_{{constantCase serviceKey}}_STAGE_RESPONSE,\n{{/if_equal}}',
      },
      {
        type: 'modify',
        path: 'src/renderer/redux/actions.js',
        pattern: /(\/\/ PLOP GET_INIT_DATA PROD PLACEHOLDER)/g,
        template: '$1{{#if_equal envKey "prod"}}\n      [SERVICE_KEY.{{constantCase serviceKey}}]: GET_INIT_PROD_{{constantCase serviceKey}}_DATA,\n{{/if_equal}}',
      },
      {
        type: 'modify',
        path: 'src/renderer/redux/actions.js',
        pattern: /(\/\/ PLOP GET_INIT_DATA STAGE PLACEHOLDER)/g,
        template: '$1{{#if_equal envKey "stage"}}\n      [SERVICE_KEY.{{constantCase serviceKey}}]: GET_INIT_STAGE_{{constantCase serviceKey}}_DATA,\n{{/if_equal}}',
      },
      {
        type: 'modify',
        path: 'src/renderer/redux/actions.js',
        pattern: /(\/\/ PLOP SET_INIT_DATA PROD PLACEHOLDER)/g,
        template: '$1{{#if_equal envKey "prod"}}\n      [SERVICE_KEY.{{constantCase serviceKey}}]: SET_INIT_PROD_{{constantCase serviceKey}}_DATA,\n{{/if_equal}}',
      },
      {
        type: 'modify',
        path: 'src/renderer/redux/actions.js',
        pattern: /(\/\/ PLOP SET_INIT_DATA STAGE PLACEHOLDER)/g,
        template: '$1{{#if_equal envKey "stage"}}\n      [SERVICE_KEY.{{constantCase serviceKey}}]: SET_INIT_STAGE_{{constantCase serviceKey}}_DATA,\n{{/if_equal}}',
      },
      {
        type: 'modify',
        path: 'src/renderer/redux/actions.js',
        pattern: /(\/\/ PLOP NOTIFY_CHANGES PROD PLACEHOLDER)/g,
        template: '$1{{#if_equal envKey "prod"}}\n      [SERVICE_KEY.{{constantCase serviceKey}}]: NOTIFY_{{constantCase serviceKey}}_PROD_CHANGES,\n{{/if_equal}}',
      },
      {
        type: 'modify',
        path: 'src/renderer/redux/actions.js',
        pattern: /(\/\/ PLOP NOTIFY_CHANGES STAGE PLACEHOLDER)/g,
        template: '$1{{#if_equal envKey "stage"}}\n      [SERVICE_KEY.{{constantCase serviceKey}}]: NOTIFY_{{constantCase serviceKey}}_STAGE_CHANGES,\n{{/if_equal}}',
      },
      {
        type: 'add',
        path: 'src/renderer/redux/selectors/{{camelCase serviceKey}}{{pascalCase envKey}}.selectors.js',
        templateFile: 'plop-templates/selectors.hbs',
      },
      {
        type: 'add',
        path: 'src/renderer/redux/reducers/{{camelCase serviceKey}}{{pascalCase envKey}}.reducer.js',
        templateFile: 'plop-templates/reducer.hbs',
      },
      {
        type: 'append',
        path: 'src/renderer/redux/reducers/index.js',
        pattern: /(\/\/ PLOP IMPORT REDUCERS PLACEHOLDER)/g,
        separator: '\n',
        template: 'import {{camelCase serviceKey}}{{pascalCase envKey}} from \'./{{camelCase serviceKey}}{{pascalCase envKey}}.reducer\';',
      },
      {
        type: 'append',
        path: 'src/renderer/redux/reducers/index.js',
        pattern: /(\/\/ PLOP COMBINE_REDUCERS PLACEHOLDER)/g,
        separator: '\n',
        template: '  {{camelCase serviceKey}}{{pascalCase envKey}},',
      },
      {
        type: 'append',
        path: 'src/renderer/redux/epics/index.js',
        pattern: /(\/\/ PLOP IMPORT EPICS PLACEHOLDER)/g,
        separator: '\n',
        template: 'import {{camelCase serviceKey}}{{pascalCase envKey}}Epic from \'./{{camelCase serviceKey}}{{pascalCase envKey}}.epic\';',
      },
      {
        type: 'append',
        path: 'src/renderer/redux/epics/index.js',
        pattern: /(\/\/ PLOP COMBINE_EPICS PLACEHOLDER)/g,
        separator: '\n',
        template: '  ...{{camelCase serviceKey}}{{pascalCase envKey}}Epic,',
      },
      {
        type: 'add',
        path: 'src/renderer/redux/epics/{{camelCase serviceKey}}{{pascalCase envKey}}.epic.js',
        templateFile: 'plop-templates/epic.hbs',
      },
      {
        type: 'modify',
        path: 'src/renderer/components/ProductionList/ProductionList.jsx',
        pattern: /(\/\/ PLOP PROD LIST IMPORTS)/g,
        templateFile: 'plop-templates/append/listImports.prod.hbs',
      },
      {
        type: 'modify',
        path: 'src/renderer/components/StagingList/StagingList.jsx',
        pattern: /(\/\/ PLOP STAGE LIST IMPORTS)/g,
        templateFile: 'plop-templates/append/listImports.stage.hbs',
      },
      {
        type: 'modify',
        path: 'src/renderer/components/ProductionList/ProductionList.jsx',
        pattern: /(\/\/ PLOP PROD LIST SELECTORS)/g,
        templateFile: 'plop-templates/append/listSelectors.prod.hbs',
      },
      {
        type: 'modify',
        path: 'src/renderer/components/StagingList/StagingList.jsx',
        pattern: /(\/\/ PLOP STAGE LIST SELECTORS)/g,
        templateFile: 'plop-templates/append/listSelectors.stage.hbs',
      },
      {
        type: 'modify',
        path: 'src/renderer/components/ProductionList/ProductionList.jsx',
        pattern: /(\/\/ PLOP PROD LIST DATA)/g,
        templateFile: 'plop-templates/append/listData.prod.hbs',
      },
      {
        type: 'modify',
        path: 'src/renderer/components/StagingList/StagingList.jsx',
        pattern: /(\/\/ PLOP STAGE LIST DATA)/g,
        templateFile: 'plop-templates/append/listData.stage.hbs',
      },
    ],
  });
};
