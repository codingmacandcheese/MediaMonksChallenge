//STORAGE CONTROLLER
//Aquí se define el controller de stats de MediaMonks Challenge

const storageService = require('../services/storage.services');

exports.getValue = async function (req, res) {
    if(!req.query.key){
        return res.status(400).json({ ok: false, error: { message: 'key query param is mandatory' }, status: 400 });
    }
    
    try {
        const response = await storageService.getValue(req.query.key);
        
        if (response.status == false && response.value == null) {
            return res.status(404).json({
                ok: true,
                message: 'Key not found',
                status: 404
            });
        } else {
            return res.status(200).json({
                ok: true,
                data: response.value,
                status: 200
            });
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            error: {
                message: error.message
            },
            status: 400,
        });
    }
}