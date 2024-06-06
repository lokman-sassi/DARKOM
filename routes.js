import express from 'express';
import { createUser, loginUser } from './controller.js';
import { fetchData } from './dateController.js';
import { toggleFavoriteListing, getUserFavorites,  getFavoriteIDs } from './favoriteController.js';
import { checkAuth } from './middleware.js';

const router = express.Router();

router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/listings', fetchData);
router.post('/favorite', checkAuth, toggleFavoriteListing);
router.get('/favorites', checkAuth, getUserFavorites);
router.get('/favorites/ids', checkAuth, getFavoriteIDs);




export default router;
