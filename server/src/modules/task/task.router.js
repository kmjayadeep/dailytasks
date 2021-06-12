const router = require('express').Router()


// return all tasks
router.get('/', (_, res) => {
  res.json([])
})

module.exports = router;
