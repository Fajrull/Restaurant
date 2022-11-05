/* eslint-disable padded-blocks */
import API_ENDPOINT from '../globals/api-endpoint';

class TheRestaurantDbSource {
  static async ListRestaurant() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async DetailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    return responseJson.restaurant;

  }
}

export default TheRestaurantDbSource;
