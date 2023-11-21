const handleRegister = (req, res, db, bcrypt) => {
  const { email, nome, senha } = req.body;
  if (!email || !nome || !senha) {
    return res.status(400).json('existem dados que faltam preencher')
  }
  const hash = bcrypt.hashSync(senha);
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('usuarios')
          .returning('*')
          .insert({
            email: loginEmail[0].email,
            nome: nome,
            entrou: new Date()
          })
          .then(usuario => {
            res.json(usuario[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
    .catch(err => res.status(404).json('nao foi possivel fazer o registro'))
    
}

const _handleRegister = handleRegister;
export { _handleRegister as handleRegister };
