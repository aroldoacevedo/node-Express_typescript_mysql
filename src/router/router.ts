import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/heroes', (req: Request, res: Response) => {

    const query = `
        SELECT * 
        FROM heroes
    `;

    MySQL.ejecutarQuery(query, (err: any, heroes: Object[])=>{
        if(err){
            res.status(400).json({
                err: false,
                error: err
            });
        }else{
            res.json({
                err: true,
                heroes
            });
        }
    });

});

router.get('/heroes/:id', (req: Request, res: Response) => {

    const id = req.params.id;
    const escaped = MySQL.instance.cnn.escape( id) ;

    const query = `
    SELECT * 
    FROM heroes
    WHERE id = ${escaped}
`;

MySQL.ejecutarQuery(query, (err: any, heroes: Object[])=>{
    if(err){
        res.status(400).json({
            err: false,
            error: err
        });
    }else{
        res.json({
            err: true,
            heroe: heroes[0]
        });
    }
});


});

export default router;