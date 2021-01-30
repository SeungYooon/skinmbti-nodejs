import express from 'express';
import Skin from '../models/skins.js';
const router = express.Router();

// GET ALL Skin
router.get('/skins', (req, res) => {
    Skin.find()
        .then((skins) => {
            if (!skins.length) return res.status(404).send({ err: 'Skin not found' });
            res.json(skins);
        })
        .catch(err => res.status(500).send(err));
});

// GET Skin by skin_title
router.get('/skins/skin_title/:skin_title', (req, res) => {
    Skin.find({ skin_title: req.params.skin_title }, { _id: 1, skin_kinds: 1, image_url: 1, description: 1, point: 1}, (err, skins) => {
        if (err) return res.status(500).json({ error: err });
        if (skins.length === 0) return res.status(404).json({ error: 'skin_title not found' });
        res.json(skins);
    })
});

// UPDATE Skin
router.put('/skins/skin_title/:skin_title', (req, res) => {
    Skin.findById(req.params.skin_id, (err, skin) => {
        if (err) return res.status(500).json({ error: 'database failure' });
        if (!skin) return res.status(404).json({ error: 'skin not found' });

        if (req.body.skin_title) skin.skin_title = req.body.skin_title;

        skin.save((err) => {
            if (err) res.status(500).json({ error: 'failed to update' });
            res.json({ message: 'skin updated' });
        });
    });
});

export default router;