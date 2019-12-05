(async function () {
  const koa = require('koa')
  const KoaBodyparser = require('koa-bodyparser')
  const koaStaticCache = require('koa-static-cache')
  const router = require('./routers')
  const cors = require('koa-cors');
  const KeyGrip = require('keygrip')
  const Session = require('koa-session')

  const app = new koa()
  app.use(KoaBodyparser())
  // app.use(Session({
  //   keys: 'koa:session',
  // }, app))
  // cookie 加密
  // app.keys = ['peien']
  // app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');

  //解决跨域
  app.use(cors());

  app.use(koaStaticCache('./public', {
    prefix: '/static',
    fzip: true
  }))

  router.get('/', async (ctx) => {
    ctx.body = 'hello world'
  })

  app.use(router.routes())
  app.listen(3001)
  console.log('http://127.0.0.1:3001')
})();
