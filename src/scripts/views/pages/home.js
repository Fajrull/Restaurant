/* eslint-disable no-shadow */
import TheRestaurantDbSource from '../../data/threstaurantdb-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Explore Restaurant</h2>
        <div id="restaurant" class="restaurant">
        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurant = await TheRestaurantDbSource.ListRestaurant();
    const restaurantContainer = document.querySelector('#restaurant');
    restaurant.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
