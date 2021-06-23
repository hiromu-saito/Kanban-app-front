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
    res.json({})
  })
}
