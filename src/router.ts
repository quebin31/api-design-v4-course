import { Router } from 'express';

export const router = Router();

router.get('/products', (req, res) => {
    res.json({ message: 'hello' });
});

router.get('/products/:id', () => {
});

router.put('/products/:id', () => {
});

router.post('/products/', () => {
});

router.delete('/products/:id', () => {

});

router.get('/updates', () => {
});

router.get('/updates/:id', () => {
});

router.put('/updates/:id', () => {
});

router.post('/updates/', () => {
});

router.delete('/updates/:id', () => {

});

router.get('/update-points', () => {
});

router.get('/update-points/:id', () => {
});

router.put('/update-points/:id', () => {
});

router.post('/update-points/', () => {
});

router.delete('/update-points/:id', () => {

});