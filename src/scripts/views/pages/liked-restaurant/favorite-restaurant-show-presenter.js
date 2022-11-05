/* eslint-disable no-underscore-dangle */
class FavoriteRestaurantShowPresenter {
  constructor({ view, favoriteRestaurant }) {
    this._view = view;
    this._favoriteRestaurant = favoriteRestaurant;

    this._showFavoriteRestaurant();
  }

  async _showFavoriteRestaurant() {
    const restaurant = await this._favoriteRestaurant.getAllRestaurant();
    this._displayRestaurant(restaurant);
  }

  _displayRestaurant(restaurant) {
    this._view.showFavoriteRestaurant(restaurant);
  }
}

export default FavoriteRestaurantShowPresenter;
