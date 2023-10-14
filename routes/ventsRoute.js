const express = require('express');
const router = express.Router();
const Vent = require('../models/ventsModel')

router.get('/', async (req,  res) => {
    const vents = await Vent.find({ isPublished: true }).sort({date: -1})
    res.send(vents)
})

router.put('/:id' , async (req, res) => {
    const vent = await Vent.findByIdAndUpdate(req.params.id, {
        $set : { 
            isPublished: true
        }
    }, {new: true})  

    console.log(vent)

})

router.post('/', async (req, res) => { 
    const vent = new Vent({
        name: req.body.name,
        vent: req.body.vent,
        isPublished: req.body.isPublished,
        date: req.body.date
    })
    let result = await vent.save()
    res.send(result)
})

//new vent
router.get('/admin', async (req,  res) => {
    const vents = await Vent.find({ isPublished: false }).sort({ date: 1 });
    res.sendFile('admin.html', { root: 'public' });
    res.send(vents)
})

router.put('/admin/:id', async (req, res) => {
    let vent = await Vent.findById(req.params.id) 
    vent.isPublished = true

    const result = await vent.save()
    console.log(result)
})

router.delete('/admin/:id', async (req, res) => {
    let vent = await Vent.findByIdAndRemove(req.params.id) 
    
    console.log(vent)
})



 
module.exports = router