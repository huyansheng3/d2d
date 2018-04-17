const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const { recursiveIteration, fastDeepClone } = require('./util');
const { cloneDeep } = require('lodash');

server.use(middlewares);

var mock = require('mockjs');
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.method = 'GET';
  }
  // Continue to JSON Server router
  next();
});

server.use('/user', jsonServer.router('user.json'));
server.use('/corp', jsonServer.router('corp.json'));
server.use('/market', jsonServer.router('market.json'));
server.get('/uncheck/sms/sendVerifyCode', (req, res) => {
  res.jsonp({
    status: 'success',
  });
});

const routesConfig = [
  {
    path: '/home/data-detail',
    template: {
      'data|40-200': [
        {
          id: '@guid',
          'block|1000-2000': 1,
          timestamp: '@datetime',
          queryPrimaryKey: '底层资产明细 - @id - @id',
          hashValue: '@id',
          uploader: '@cname',
          address: '@id',
          'isValid|1': true,
        },
      ],
    },
  },
  {
    path: '/home/cards',
    template: {
      data: {
        'node|1-10': 1,
        'block|1-10': 1,
        'exchange|1-10': 1,
        'contract|1-10': 1,
      },
    },
  },
  {
    path: '/query-module/bi-query',
    template: {
      'data|40-200': [
        {
          id: '@guid',
          apiName: /接口\d{1}/,
          operate: '@url(http)',
        },
      ],
    },
  },
  {
    path: '/query-module/api-list/:id?',
    template: {
      'data|40-200': [
        {
          id: '@guid',
          projectName: '项目:id',
          operate: '@url(http)',
        },
      ],
    },
  },
  {
    path: '/query-module/verify-data',
    template: {
      data: [
        {
          'primaryKey|100-200': 1,
          'plaintext|100-200': 1,
          localHash: '@guid',
        },
      ],
    },
  },
  {
    path: '/query-module/calculate-hash',
    template: {
      data: {
        onlineHash: '@guid',
      },
    },
  },
];

routesConfig.map(routeConfig => {
  server.get(routeConfig.path, (req, res) => {
    const templateCopy = cloneDeep(routeConfig.template);
    const params = req.params || {};

    for (let param in params) {
      recursiveIteration(templateCopy, (obj, key, parent) => {
        if (
          typeof obj[key] === 'string' &&
          new RegExp(`:${param}`).test(obj[key])
        ) {
          console.log(key);
          if (params[param] !== undefined) {
            obj[key] = obj[key].replace(`:${param}`, params[param]);
          } else {
            obj[key] = new RegExp(obj[key].replace(`:${param}`, '[1-3]'));
          }
        }
      });
    }

    res.json(
      mock.mock({
        code: 0,
        msg: 'Success',
        ...templateCopy,
      })
    );
  });
});

server.listen(3030, () => {
  console.log('JSON Server is running');
});
