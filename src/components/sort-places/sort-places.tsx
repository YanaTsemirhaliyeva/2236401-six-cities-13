import { SortOffersType } from '../../const';
import { useState, KeyboardEvent } from 'react';
import classNames from 'classnames';
import { Sorting } from '../../types/sorting';


type SortPlacesProps = {
  activeSorting: Sorting;
  onChange: (newSorting: Sorting) => void;
}

function SortPlaces({activeSorting, onChange }: SortPlacesProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const iconStyle = {
    transform: `translateY(-50%) ${isOpen ? 'rotate(180deg)' : ''}`
  };

  function keyDownHandler(evt: KeyboardEvent) {
    if (evt.key === 'Escape' && isOpen) {
      evt.preventDefault();
      setIsOpen(false);
    }
  }

  function typeClickHandler() {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }

  function sortingItemClickHandler (type: Sorting) {
    onChange(type);
    setIsOpen(false);
  }


  return (
    <form className="places__sorting" action="#" method="get" onKeyDown={keyDownHandler}>
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={typeClickHandler}
      >
        {activeSorting}
        <svg className="places__sorting-arrow" width={7} height={4} style={iconStyle}>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={classNames({'places__options--opened' : isOpen}, 'places__options', 'places__options--custom')}>
        {Object.values(SortOffersType).map((type) => (
          <li
            key={type}
            className={classNames({'places__option--active': type === activeSorting}, 'places__option')}
            tabIndex={0}
            onClick={() => sortingItemClickHandler(type as Sorting)}
          >
            {type};
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortPlaces;
