const KoaRouter = require('koa-router');

const Models = require('../models');
const md5 = require('md5')
const router = new KoaRouter();
const { Op } = require('sequelize')

router.get('/getTodos', async ctx => {
  const { status = 2 } = ctx.query
  if(status == 2) {
    statusArr= [0,1]
  } else {
    statusArr=[status]
  }
  let rs = await Models.Messages.findAndCountAll({
            where: {
                status: {
                  [Op.in]: statusArr
                }
            },
            order: [
              ['id', 'DESC'],
          ]
        });

  ctx.body = {
    code: 0,
    data: rs.rows,
    msg: 'hello sb'
  }
})

router.post('/toogle', async ctx => {
  const { id } = ctx.request.body

  const rs = await Models.Messages.findOne({
    where: {
      id
    }
  })
  if(rs) {
    const rsStatus = rs.get('status')
    console.log(rsStatus)
    const statusChangeTo = rsStatus == 0? 1:0
   const updateRs = rs.update({
      status: statusChangeTo
    })
    ctx.body = {
      code: 0,
      data: {
        id: rs.get('id'),
        status: statusChangeTo
      }
    }
  } else {
    ctx.body = {
      code: 1,
      msg: '传入的id有误'
    }
  }


})

router.post('/add', async ctx => {
  const { content, user_id =1 } = ctx.request.body

  if(!content) {
    ctx.code = {
      code: 1,
      msg: "用户名和密码不能为空"
    }
    return
  }

  let rs = await Models.Messages.create({
    content,
    user_id
  })

    ctx.body = {
      code: 0,
      data: {
        content,
        id: rs.get('id'),
        status: rs.get('status'),
      },
      msg: '创建成功'
    }
})

router.post('/delete', async ctx => {
  const { id } = ctx.request.body
  console.log(id)
  const rs = await Models.Messages.find({
    where: {
      id
    }
  })
  console.log(rs)

  if(rs) {
   const deleteRs =  await rs.destroy()
   ctx.body = {
     code: 0,
     data: {
        id
     },
     msg: '删除成功'
   }
   return
  } else {
    ctx.body = {
      code: 1,
      rs
    }
  }


})
// router.get('/getContents', async ctx => {
//     // 操作数据库
//     // DOM => Document Object Model 文档对象模型
//     // 文档：如html，html的内容本身是一组字符串，通过字符串的操作去修改html的内容，会特别的麻烦
//     // 为了能够更方便的操作html这样的字符串，js先把这种结构字符串转成对象，然后通过
//     // 操作对象来映射到对应的html上面
//     // ORM => 和DOM的概念和相似，像操作对象的一样的操作数据库

//     console.log('ctx.body.params')
//     const { page= 1, pageSize=3 } = ctx.query
//     const offset = (page-1)* pageSize
//     console.log(page, pageSize, offset)
//     let rs = await Models.Contents.findAndCountAll({
//         limit: Number(pageSize),
//         offset: offset,
//         include: {
//             model: Models.Users
//         }
//     });

//     ctx.body = {
//       code: 0,
//       count: rs.count,
//       rs,
//       data: rs.rows.map( d => {
//           return {
//               id: d.id,
//               title: d.title,
//               content: d.content,
//               user_id: d.user_id,
//               username: d.User.username,
//               created_at: d.createdAt,
//               like_count: d.like_count,
//               comment_count: d.comment_count
//           }
//       } )
//   };
// });

// router.get('/getUser', async ctx => {
//   let rsCount = await Models.Users.findAndCountAll({ });
//   console.log('rsCount')
//   console.log(rsCount)

//   let rs = await Models.Users.findAll({})
//   console.log(rs)
//   ctx.body = {
//     code: 0,
//     data: rs,
//     total: rsCount.count
//   }
// });

// router.post('/registered', async ctx => {
//   const { username, password } = ctx.request.body

//   if(!username && password) {
//     ctx.code = {
//       code: 1,
//       msg: "用户名和密码不能为空"
//     }
//     return
//   }

//    let result = await Models.Users.findOne({
//      where: {
//        username
//      }
//    })
//    console.log(result)
//    if(result != null) {
//       ctx.body = {
//         code: 2,
//         msg: "用户已经存在, 请直接登录"
//       }
//       return
//    }

//   const md5Password = md5(password)
//   const newUser = await Models.Users.create({ username, password: md5Password })
//   ctx.body = {
//     code: 0,
//     data: {
//       username,
//       // password: md5(password)
//     },
//     msg: '创建成功'
//   }


// })

// router.post('/login', async ctx => {
//   const { username, password } = ctx.request.body

//   if(!username && password) {
//     ctx.code = {
//       code: 1,
//       msg: "用户名和密码不能为空"
//     }
//     return
//   }

//    let result = await Models.Users.findOne({
//      where: {
//        username
//      }
//    })

//    console.log(result)
//    if(result == null) {
//       ctx.body = {
//         code: 2,
//         msg: "用户名不存在"
//       }
//       return
//    } else {
//      console.log(result)
//      const passwordValidation = result.get('password')
//      if(md5(password) !== passwordValidation) {
//       ctx.body = {
//         code: 1,
//         data: result,
//         msg: '密码错误'
//       }
//       return
//      }

//     //  ctx.cookies.set('uid', result.get('id'), { signed: false, httpOnly: false })
//      ctx.cookies.set('username', result.get('username'), { signed: false, httpOnly: false })
//      ctx.session.uid =result.get('id')

//      ctx.body = {
//       code: 0,
//       data: result,
//       msg: '登录成功'
//     }
//    }

//    router.post('/like', async ctx => {
//      let uid = ctx.session.uid
//      const { contentId } = ctx.request.body
//      console.log(uid)
//     //  console.log(ctx.cookies)
//     if(uid) {
//       // do something
//       // 获取被点赞记录
//       const content = await Models.Contents.findById(contentId)
//       if(!content) {
//         ctx.body = {
//           code: 1,
//           msg: '该记录走丢了'
//         }
//         return
//       }

//       // 获取该条评论该人的点赞数
//       const userLikeCount  = await Models.Likes.findOne({
//         where: {
//           content_id: contentId,
//           user_id: uid
//         }
//       })

//       if(userLikeCount) {
//         await userLikeCount.destroy({
//           where: {
//             id: userLikeCount.get('id')
//           }
//         })
//         await content.update({
//           like_count: content.get('like_count') -1
//         })
//         ctx.body = {
//           code: 0,
//           data: false,
//           uid,
//           contentId,
//           msg: '取消点赞成功'
//         }
//         // ctx.body = {
//         //   code: 0,
//         //   msg: '请勿重复点赞'
//         // }
//       } else {
//         // 创建点赞详情
//         let LikesContent = await Models.Likes.create({
//           content_id: contentId,
//           user_id: uid
//         })
//         // 更新点赞记录
//         await content.update({
//           like_count: content.get('like_count') + 1
//         })
//         ctx.body = {
//           code: 0,
//           data: true,
//           uid,
//           contentId,
//           msg: '点赞成功'
//         }
//       }
//     }else {
//       ctx.body = {
//         code: 105,
//         msg: '登陆过期, 请重新登陆',
//         uid,
//         contentId,
//       }
//     }

//    })


// })


module.exports = router;
