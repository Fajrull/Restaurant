/* eslint-disable no-undef */
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import FavoriteRestaurantSearchView
  from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-view';

describe('Searching restaurant', () => {
  let presenter;
  let favoriteRestaurant;
  let view;

  const searchRestaurant = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurant = spyOnAllFunctions(FavoriteRestaurantIdb);
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurant,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestaurant('film a');

      expect(presenter.latestQuery)
        .toEqual('film a');
    });

    it('should ask the model to search for liked restaurant', () => {
      searchRestaurant('film a');

      expect(favoriteRestaurant.searchRestaurant)
        .toHaveBeenCalledWith('film a');
    });

    it('should show the restaurant found by Favorite Restaurant', (done) => {
      document.getElementById('restaurant').addEventListener('restaurant:updated', () => {
        done();
      });

      favoriteRestaurant.searchRestaurant.withArgs('film a').and.returnValues([
        { id: 111, name: 'film abc' },
        { id: 222, name: 'ada juga film abcde' },
        { id: 333, name: 'ini juga boleh film a' },
      ]);

      searchRestaurant('film a');
    });

    it('should show the name of the restaurant found by Favorite Restaurant', (done) => {
      document.getElementById('restaurant').addEventListener('restaurant:updated', () => {
        const restaurantName = document.querySelectorAll('.restaurant__name');
        expect(restaurantName.item(0).textContent).toEqual('film abc');
        expect(restaurantName.item(1).textContent).toEqual('ada juga film abcde');
        expect(restaurantName.item(2).textContent).toEqual('ini juga boleh film a');

        done();
      });

      favoriteRestaurant.searchRestaurant.withArgs('film a').and.returnValues([
        { id: 111, name: 'film abc' },
        { id: 222, name: 'ada juga film abcde' },
        { id: 333, name: 'ini juga boleh film a' },
      ]);

      searchRestaurant('film a');
    });

    describe('When query is empty', () => {
      it('should capture the query as empty', () => {
        searchRestaurant(' ');

        expect(presenter.latestQuery.length).toEqual(0);
      });

      it('should show all favorite restaurant', () => {
        searchRestaurant('    ');

        expect(favoriteRestaurant.getAllRestaurant)
          .toHaveBeenCalled();
      });
    });

    describe('When no favorite restaurant could be found', () => {
      it('should show the empty message', (done) => {
        document.getElementById('restaurant').addEventListener('restaurant:updated', () => {
          expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
          done();
        });

        favoriteRestaurant.searchRestaurant.withArgs('film a').and.returnValues([]);

        searchRestaurant('film a');
      });
      it('should not show any restaurant', (done) => {
        document.getElementById('restaurant').addEventListener('restaurant:updated', () => {
          expect(document.querySelectorAll('.restaurants').length).toEqual(0);
          done();
        });
        favoriteRestaurant.searchRestaurant.withArgs('film a').and.returnValues([]);
        searchRestaurant('film a');
      });

      it('should show - when the restaurant returned does not contain a name', (done) => {
        document.getElementById('restaurant').addEventListener('restaurant:updated', () => {
          const restaurantName = document.querySelectorAll('.restaurant__name');
          expect(restaurantName.item(0).textContent).toEqual('-');

          done();
        });

        favoriteRestaurant.searchRestaurant.withArgs('film a').and.returnValues([
          { id: 444 },
        ]);

        searchRestaurant('film a');
      });
    });
  });
});
