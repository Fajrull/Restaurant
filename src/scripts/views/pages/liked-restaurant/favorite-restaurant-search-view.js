/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantSearchView {
  getTemplate() {
    return `
          <div class="content">
            <input id="query" type="text">
            <h2 class="content__heading">Your Liked Restaurant</h2>
              <div id="restaurant" class="restaurant">
              </div>
            </div>
          </div>
        `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showRestaurant(restaurant = []) {
    this.showFavoriteRestaurant(restaurant);
  }

  showFavoriteRestaurant(restaurant = []) {
    let html;
    if (restaurant.length) {
      html = restaurant.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }
    document.getElementById('restaurant').innerHTML = html;

    document.getElementById('restaurant').dispatchEvent(new Event('restaurant:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return '<div class="restaurant-item__not__found ">Tidak ada film untuk ditampilkan</div>';
  }
}
export default FavoriteRestaurantSearchView;
