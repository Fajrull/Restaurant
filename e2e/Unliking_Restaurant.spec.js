/* eslint-disable no-undef */
const assert = require('assert');

Feature('Unliking Restaurant');
Before(({ I }) => {
  I.amOnPage('/#/favorite');
});
Scenario('showing empty liked menu restaurant', ({ I }) => {
  I.dontSeeElement('.restaurant-item');
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.seeElement('.content__heading');
  I.amOnPage('/');

  I.waitForElement('.restaurant__name a', 30);
  I.seeElement('.restaurant__name a');

  const firstRestaurant = locate('.restaurant__name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#likeButton', 30);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');

  const unlikedRestaurantName = await I.grabTextFrom('.restaurant__name a');
  assert.strictEqual(firstRestaurantName, unlikedRestaurantName);

  I.seeElement('.restaurant__name a');
  await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.dontSeeElement('.restaurant-item');
});
