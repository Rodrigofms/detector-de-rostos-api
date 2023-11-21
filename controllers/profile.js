const handleProfile = (req, res, db) => {
  const { id } = req.params;
  db.select('*').from('usuarios').where({ id })
    .then(usuario => {
      if (usuario.length) {
        res.json(usuario[0])
      } else {
        res.status(400).json('nao encontrado')
      }
    })
    .catch(err => res.status(400).json('usuario nao enconrado'))
    
}

const _handleProfile = handleProfile;
export { _handleProfile as handleProfile };