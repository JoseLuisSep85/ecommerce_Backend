const { Router } = require('express');
const { userModel } = require('../dao/models/user.model.js');

const router = Router();

//get
router.get('/', async (req, res) => {
    try {
        let users = await userModel.find();
        res.send({ result: 'success', payload: users });
    } catch (error) {
        console.log(error)
    }
})

//post
router.post('/', async (req, res) => {
    let { nombre, apellido, email } = req.body;
    if (!nombre || !apellido || !email) {
        res.send({ status: 'error', error: 'faltan datos' });
    }
    let result = await userModel.create({ nombre, apellido, email });
    res.send({ result: 'success', payload: result });
})

//put
router.put('/:uid', async (req, res) => {
    let { uid } = req.params;
    let userToReplace = req.body;
    if (!userToReplace.nombre || !userToReplace.apellido || !userToReplace.email) {
        res.send({ status: 'error', error: 'No hay datos en parametros' });
    }
    let result = await userModel.updateOne({ _id: uid, userToReplace });
    res.send({ result: 'success', payload: result });

})

//delete

router.delete('/:uid', async (req, res) => {
    let { uid } = req.params;
    let result = userModel.deleteOne({ _id: uid })
    res.send({ result: 'success', payload: result });
})

module.exports = router