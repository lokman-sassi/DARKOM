import User from './model.js';

export async function getUserFavorites(req, res) {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    res.json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function toggleFavoriteListing(req, res) {
  try {
    const user = await User.findById(req.user._id);
    const listingId = req.body.listingId;
    if (user.favorites.includes(listingId)) {
      user.favorites.pull(listingId);
    } else {
      user.favorites.push(listingId);
    }
    await user.save();
    res.json({ message: 'Favorites updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
