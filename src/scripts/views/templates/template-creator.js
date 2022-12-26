/* eslint-disable no-tabs */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
  <h2 class="restaurant__name">${restaurant.name}</h2>
  <img class="restaurant__poster lazyload" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />
  <div class="restaurant__info">
  <h3>Information</h3>
  <h4>Address</h4>
  <p>${restaurant.address} , Kota ${restaurant.city}</p>
  <h4>Rating</h4>
  <p>${restaurant.rating}</p>
  <h4>Categories</h4>
  <p>${restaurant.categories.map((category) => category.name).join(' | ')}</p>
  
  <div class="detail-food">
  <h4>Foods</h4>
  <ul>
          ${restaurant.menus.foods
    .map(
      (food, i) => `
                <li><p>${i + 1}) ${food.name}</p></li>
              `,
    )
    .join('')}
        <ul>
        
        <div class="detail-drink">
  <h4>Drinks</h4>
  <ul>
          ${restaurant.menus.drinks
    .map(
      (drink, i) => `
                <li><p>${i + 1}) ${drink.name}</p></li>
              `,
    )
    .join('')}
        <ul>
      </div>
    </div>
</div>
<div class="restaurant__description">
<h3>Description</h3>
<p>${restaurant.description}</p>
</div>
<div class="restaurant__description">
<h3>Customer Reviews</h3>
<div class="detail-review">
${restaurant.customerReviews
    .map(
      (review) => `
      <div class="detail-review-item">
        <div class="review-header">
          <p class="review-name">${review.name}</p>

          <p class="review-date">${review.date}</p>
        </div>

        <div class="review-body">
          ${review.review}
        </div>
      </div>
    `,
    )
    .join('')}
</div>
</div>
`;

const createRestaurantItemTemplate = (restaurant) => `
<div class="restaurant-item">
<div class="restaurant-item__header">
    <img class="restaurant-item__header__poster lazyload" alt="${restaurant.name || '-'}"
    data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}">
    <div class="restaurant-item__header__rating">
        <p>⭐️<span class="restaurant-item__header__rating__score">${restaurant.rating} | ${restaurant.city || '-'}</span></p>
    </div>
</div>
<div class="restaurant-item__content">
    <h3 class="restaurant__name"><a href="${`/#/detail/${restaurant.id}`}">${restaurant.name || '-'}</a></h3>
    <p>${restaurant.description || '-'}</p>
</div>
</div>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
};
