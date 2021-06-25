const bodyParser = require('body-parser')

module.exports = app => {
  app.use(bodyParser.json())
  // TODO APIの実装
  // ユーザー情報
  const users = {
    'foo@domain.com':{
      password: 'password',
      userId: '1',
      token: '123456789'
    }
  }
  app.post('/auth/login',(req, res) =>{
    const { email, password} = req.body
    const user = users[email]
    if(user){
      if(user.password != password){
        res.status(400).json({message: 'ログインに失敗しました'})
      }else{
        res.json({userId: user.userId, token: user.token})
      }
    }else{
      res.status(404).json({message: 'ユーザーが登録されていません'})
    }
  })
  app.post('/auth/logout',(req,res) => {
    res.sendStatus(200)
  })
  app.get('/lists', (req, res) => {
    res.json({lists: [
        {id: 1, name: 'TODO', items: [
            {id: 1, name: 'todo_task1', description: 'description'},
            {id: 2, name: 'todo_task2', description: 'description'},
            {id: 3, name: 'todo_task3', description: 'description'}
        ]},
        {id: 2, name: 'WIP', items: [
            {id: 4, name: 'wip_task1', description: 'description'},
            {id: 5, name: 'wip_task2', description: 'description'},
            {id: 6, name: 'wip_task3', description: 'description'}
        ]},
        {id: 3, name: 'DONE', items: [
            {id: 7, name: 'done_task1', description: 'description'},
            {id: 8, name: 'done_task2', description: 'description'},
            {id: 9, name: 'done_task3', description: 'description'}
        ]},
      ]})
  }),
  app.post('/tasks/add', (req, res) => {
    res.json({id: 10})
  })

  app.post('/tasks/:id/remove', (req, res) => {
    res.sendStatus(204)
  })
  app.post('/tasks/:id/update', (req, res) => {
    res.sendStatus(200)
  })
}
