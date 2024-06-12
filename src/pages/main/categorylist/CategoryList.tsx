import { FormEvent, useCallback } from 'react';
import styles from './categories.module.scss';
import { CheckboxComponent } from '../../../components/checkbox/CheckboxComponent';
import { CategoryResults } from '../../../api/catalogue-api';
import { useCategoryStore } from '../../../store/useCategoryStore';
import { DoubleSlider } from '../../../components/slider/DoubleSlider';
import { DoubleSliderCallbacks } from '../../../components/slider/DoubleSliderCallbacks';
import { SortOptions } from './sort-section/SortOptions';
import newWindow from '/window-plus.svg';

type CategoryListType = {
  categoryList: CategoryResults[];
};

type CategoryState = {
  categories: string[];
  movie: boolean;
  discount: boolean;
  sortingCriteria: string;
  sortingValue: string;
  minPrice: string;
  maxPrice: string;
  minPositiveCalls: string;
  maxPositiveCalls: string;
  searchWords: string;
  closeCatalog: boolean;
  resetMin: string;
  resetMax: string;
  resetMinCalls: string;
  resetMaxCalls: string;
  limit: number;
  offset: number;
};

/* const statePrev: CategoryState = {
  categories: [],
  movie: false,
  discount: false,
  sortingCriteria: '',
  sortingValue: '',
  minPrice: '0',
  maxPrice: '50000',
  minPositiveCalls: '0',
  maxPositiveCalls: '50000',
  searchWords: '',
  closeCatalog: true,
  resetMin: '0',
  resetMax: '50000',
  resetMinCalls: '0',
  resetMaxCalls: '5000',
  limit: 10,
  offset: 0,
};

const stateNow: CategoryState = {}; */

const MIN_VALUE = '0';
const MAX_VALUE = '50000';
const MAX_VALUE_CALLS = '5000';

export const CategoryList = ({ categoryList }: CategoryListType) => {
  const addCategories = useCategoryStore((state) => state.addCategories);
  const isMovie = useCategoryStore((state) => state.isMovie);
  const isDiscounted = useCategoryStore((state) => state.isDiscounted);
  const setSortingCriteria = useCategoryStore((state) => state.setSortingCriteria);
  const setSortingValue = useCategoryStore((state) => state.setSortingValue);
  const setPriceMin = useCategoryStore((state) => state.setPriceMin);
  const setPriceMax = useCategoryStore((state) => state.setPriceMax);
  const setPositiveCallsMin = useCategoryStore((state) => state.setPositiveCallsMin);
  const setPositiveCallsMax = useCategoryStore((state) => state.setPositiveCallsMax);
  const setSearchWords = useCategoryStore((state) => state.setSearchWords);
  const setCloseCatalog = useCategoryStore((state) => state.setCloseCatalog);
  const setResetMin = useCategoryStore((state) => state.setResetMin);
  const setResetMax = useCategoryStore((state) => state.setResetMax);
  const setResetMinCalls = useCategoryStore((state) => state.setResetMinCalls);
  const setResetMaxCalls = useCategoryStore((state) => state.setResetMaxCalls);

  const searchHandler = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const clicked = event.target as HTMLElement;
      const searchedWordsInput = clicked.nextElementSibling as HTMLInputElement | null;
      if (!searchedWordsInput) return;
      setSearchWords(searchedWordsInput.value);
    },
    [setSearchWords],
  );

  const resetHandler = useCallback(() => {
    setResetMin(MIN_VALUE);
    setResetMax(MAX_VALUE);
    setResetMinCalls(MIN_VALUE);
    setResetMaxCalls(MAX_VALUE_CALLS);
  }, [setResetMax, setResetMaxCalls, setResetMin, setResetMinCalls]);
  /* const state = {
    categories: [],
    movie: false,
    discount: false,
    sortingCriteria: '',
    sortingValue: '',
    minPrice: '0',
    maxPrice: '50000',
    minPositiveCalls: '0',
    maxPositiveCalls: '50000',
    closeCatalog: true,
    resetMin: '0',
    resetMax: '50000',
    resetMinCalls: '0',
    resetMaxCalls: '5000',
    limit: 10,
    offset: 0,
  }; */
  const submitHandler = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (event.target instanceof HTMLFormElement) {
        const form = event.target;

        const searchedWordsInput = form.elements.namedItem('searchField') as HTMLInputElement;
        if (searchedWordsInput && searchedWordsInput.value) {
          setSearchWords(searchedWordsInput.value);
          stateNow.searchWords = searchedWordsInput.value;
        } else {
          setSearchWords('');
          stateNow.searchWords = '';
        }
        const categorySet = form.elements.namedItem('categoryFieldSet') as HTMLFieldSetElement | null;
        if (categorySet) {
          const formElements = Array.from(categorySet.elements) as HTMLInputElement[];
          const filtered = formElements.filter((elem) => elem.type === 'checkbox' && elem.checked);
          const mapped = filtered.map((box) => box.value);
          addCategories(mapped);
          stateNow.categories = mapped;
        }

        const priceSet = form.elements.namedItem('priceFieldSet') as HTMLFieldSetElement | null;
        if (priceSet) {
          const priceRangeMin = priceSet.elements.namedItem('minValue') as HTMLInputElement | null;
          const priceRangeMax = priceSet.elements.namedItem('maxValue') as HTMLInputElement | null;
          priceRangeMin && setPriceMin(priceRangeMin.value);
          /* priceRangeMin && setResetMin(priceRangeMin.value); */
          priceRangeMax && setPriceMax(priceRangeMax.value);
          /* priceRangeMax && setResetMax(priceRangeMax.value); */
        }
        const positiveCallsSet = form.elements.namedItem('positiveCallsFieldSet') as HTMLFieldSetElement | null;
        if (positiveCallsSet) {
          const callsRangMin = positiveCallsSet.elements.namedItem('minValue') as HTMLInputElement | null;
          const callsRangeMax = positiveCallsSet.elements.namedItem('maxValue') as HTMLInputElement | null;
          callsRangMin && setPositiveCallsMin(callsRangMin.value);
          callsRangeMax && setPositiveCallsMax(callsRangeMax.value);
        }
        const movieSet = form.elements.namedItem('movieFieldSet') as HTMLFieldSetElement | null;
        if (movieSet) {
          const options = movieSet.getElementsByClassName('movieSet') as HTMLCollectionOf<HTMLInputElement> | null;
          const found = options ? Array.from(options).find((item) => item.checked) : null;
          if (found && found.value === 'true') isMovie(true);
          else isMovie(false);
        }
        const discountSet = form.elements.namedItem('discountFieldSet') as HTMLFieldSetElement | null;
        if (discountSet) {
          const options = discountSet.getElementsByClassName(
            'discountSet',
          ) as HTMLCollectionOf<HTMLInputElement> | null;
          const found = options ? Array.from(options).find((item) => item.checked) : null;
          if (found && found.value === 'true') isDiscounted(true);
          else isDiscounted(false);
        }
        const sortingSet = form.elements.namedItem('sortingFieldSet') as HTMLFieldSetElement | null;
        if (sortingSet) {
          const options = sortingSet.getElementsByClassName('sorting') as HTMLCollectionOf<HTMLInputElement> | null;
          const found = options ? Array.from(options).find((item) => item.checked) : null;
          found && setSortingValue(found.value);
          found && found.dataset.name && setSortingCriteria(found.dataset.name);
          !found && setSortingValue('');
          !found && setSortingCriteria('');
        }
        setCloseCatalog(true);
      }
    },
    [
      setCloseCatalog,
      setSearchWords,
      addCategories,
      setPriceMin,
      setPriceMax,
      setPositiveCallsMin,
      setPositiveCallsMax,
      isMovie,
      isDiscounted,
      setSortingValue,
      setSortingCriteria,
    ],
  );

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles.btnsContainer}>
        <input type="submit" className={styles.formBtn} value="submit" />
        <input type="reset" className={styles.formBtn} value="reset" onClick={resetHandler} />
      </div>
      <div className={styles.titleContainer}>{<h2 className={styles.categoryTitle}>Categories</h2>}</div>
      <label className={styles.searchLabel} htmlFor="searchField">
        <span onClick={searchHandler} className={styles.glassImg} />
        <input
          autoComplete="off"
          placeholder="Search..."
          className={styles.searchField}
          type="text"
          id="searchField"
          name="searchField"
        />
      </label>
      <fieldset className={styles.categoryWrapper} name="categoryFieldSet">
        {categoryList.map((category) => (
          <CheckboxComponent key={category.id} value={category.id}>
            {category.name['en-US']}
            <a style={{ color: 'white' }} href={`/category/${category.name['en-US']}`}>
              <img style={{ width: '13px', marginLeft: '5px' }} src={newWindow} alt="+" />
            </a>
          </CheckboxComponent>
        ))}
      </fieldset>
      <fieldset className={styles.priceFilterWrapper} name="priceFieldSet">
        <DoubleSlider title={'Price'} MIN={0} MAX={50000} signs={'C'}></DoubleSlider>
      </fieldset>
      <fieldset className={styles.positiveCallbacksFilterWrapper} name="positiveCallsFieldSet">
        <DoubleSliderCallbacks title={'Positive Callbacks'} MIN={0} MAX={5000}></DoubleSliderCallbacks>
      </fieldset>
      <SortOptions></SortOptions>
    </form>
  );
};
