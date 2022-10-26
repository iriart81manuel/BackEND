const { Router } = require('express');
const { ProductosController } = require('../controller/products')

const router = Router();

router.get('/', (req, res) => {
    res.json({
        msg: ProductosController.getAll()
    })
});

router.get('/:id', (req, res) => {

    const id = req.params.id;

    const producto = ProductosController.getById(id);

    res.json({
        msg: producto
    })

});

router.post('/', (req, res) => {

    const { body } = req;
    const data = ProductosController.save(body);

    res.json({
        msg: data
    })
});

router.put('/:id', (req, res) => {

    const id = req.params.id;
    const { body } = req;
    const data = ProductosController.update(id, body);
    res.json({
        msg: data
    })
});

router.delete('/:id', (req, res) => {

    const id = req.params.id;

    res.json({
        msg: ProductosController.deleteById(id)
    })
});

module.exports = router;