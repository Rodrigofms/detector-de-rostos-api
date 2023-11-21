const handleSignin = (req, res, db, bcrypt) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json('existem dados que faltam preencher')
  }
  db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(senha, data[0].hash);
      if (isValid) {
        return db.select('*').from('usuarios').where('email', '=', email)
          .then(usuario => {
            res.json(usuario[0])
          })
          .catch(err => res.status(400).json('nao encontrado'))

      }
      else {
        res.status(404).json('dados incorretos')
      }
    })
    .catch(err => res.status(400).json('dados incorretos'))

}

const _handleSignin = handleSignin;
export { _handleSignin as handleSignin };