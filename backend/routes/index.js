import routerx from 'express-promise-router';
import usuarioRouter from './usuario';
import documentosRouter from './documentos';


const router=routerx();


router.use('/usuario',usuarioRouter);
router.use('/documentos',documentosRouter);
export default router;

