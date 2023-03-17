import { FC, useState, useEffect, useRef, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { fetchClothes, filterClothes, getClothes } from '../../../redux/slices/clothes/clothes.slice';
import { deleteOneClothes, deleteStatus } from '../../../redux/slices/clothes/deleteClothes.slice';
import { amountClothes, amountStatus, clothesTitle, updateAmountStatus } from '../../../redux/slices/clothes/amountClothes.slice';
import { changeAmount as changeClothesAmount } from '../../../redux/slices/clothes/clothes.slice';
import AppContext from '../../../hooks/Context';

import styles from './Clothes.module.scss';
import back from '../../../assets/back.svg';
import shirt from '../../../assets/shirt.svg';
import edit from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/delete.svg';
import minus from '../../../assets/minus.svg';
import plus from '../../../assets/plus.svg';

const Clothes: FC = () => {
   const clothes = useAppSelector(getClothes);
   const statusDelete = useAppSelector(deleteStatus);
   const statusAmount = useAppSelector(amountStatus);
   const amountedClothes = useAppSelector(clothesTitle);
   const dispatch = useAppDispatch();

   const [searchTerm, setSearchTerm] = useState<string>('');
   const [localSearch, setLocalSearch] = useState<string>('');
   const ref = useRef<HTMLInputElement>(null);

   const { token } = useContext(AppContext);

   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'Товары';
      searchTerm !== '' ? dispatch(fetchClothes({ searchTerm, token })) : dispatch(fetchClothes({ token }));
   }, [searchTerm]);

   const onDelete = (_id: string) => {
      if (confirm('Вы уверены, что хотите удалить товар?')) {
         dispatch(deleteOneClothes({ id: _id, token }));
         dispatch(filterClothes(_id));
         if (statusDelete === 'success') {
            alert('Товар успешно удален');
         } else if (statusDelete === 'error') {
            alert('Ошибка удаления товара');
         }
      }
   };

   const enterClick = (event: any) => {
      if (event.key === 'Enter') {
         event.preventDefault();
      }
   };

   const updateSearchInput = useCallback(
      debounce((string: string) => {
         setSearchTerm(string);
      }, 2000),
      [],
   );

   const onSearchInput = (event: { target: HTMLInputElement }) => {
      setLocalSearch(event.target.value);
      updateSearchInput(event.target.value);
   };

   const changeAmount = (_id: string, state: 'plus' | 'minus') => {
      dispatch(amountClothes({ _id, state, token }));
      dispatch(changeClothesAmount({ _id, state }));
   };

   useEffect(() => {
      if (statusAmount === 'success') {
         alert('Операция выполнена успешно');
         dispatch(updateAmountStatus('loading'));
      } else if (statusAmount === 'error') {
         alert('Что-то пошло не так. Попробуйте позже');
         dispatch(updateAmountStatus('loading'));
      }
   }, [statusAmount]);

   if (clothes.length === 0) {
      return (
         <div className={styles.wrapper}>
            <nav>
               <Link className="back" to="/" aria-label="назад на главную">
                  <img src={back} />
                  <h3>Назад</h3>
               </Link>
               <Link className="new clothes" to="/clothes/add" aria-label="добавить новый товар">
                  <h3>Создать</h3>
                  <img src={shirt} />
               </Link>
            </nav>
            <h1>на складе нет товаров</h1>
         </div>
      );
   }

   return (
      <div className={styles.wrapper}>
         <nav>
            <Link className="back" to="/" aria-label="назад на главную">
               <img src={back} />
               <h3>Назад</h3>
            </Link>
            <Link className="new clothes" to="/clothes/add" aria-label="добавить новый товар">
               <h3>Создать</h3>
               <img src={shirt} />
            </Link>
         </nav>
         <div className={styles.table}>
            <form className={styles.table__row}>
               <input
                  ref={ref}
                  type="search"
                  placeholder="Поиск товара по   артиклу / названию / производителю / категории"
                  onKeyDown={(event) => enterClick(event)}
                  value={localSearch}
                  onChange={(event: { target: HTMLInputElement }) => onSearchInput(event)}
               />
               {/* <button type="button" onClick={() => buttonClick()}>
                  Поиск
               </button> */}
            </form>
            <span className={styles.searchTerm}>{searchTerm !== '' && <h2>Результаты по запросу "{searchTerm}"</h2>}</span>
            <div className={styles.cards}>
               {clothes.map((item, index) => (
                  <div className={styles.table__card} key={index}>
                     <span>
                        <h3>артикул</h3>
                        {item._id}
                     </span>
                     <span>
                        <h3>название</h3>
                        {item.name}
                     </span>
                     <span>
                        <h3>производитель</h3>
                        {item.producer}
                     </span>
                     <span>
                        <h3>пол</h3>
                        {item.gender}
                     </span>
                     <span>
                        <h3>размер</h3>
                        {item.size}
                     </span>
                     <span>
                        <h3>количество</h3>
                        {item.amount}шт
                     </span>
                     <span>
                        <h3>цена</h3>
                        {item.price} ₽
                     </span>
                     <span>
                        <button className={styles.plus} type="button" title="+1 данный товар" onClick={() => changeAmount(item._id, 'plus')}>
                           <img src={plus} />
                        </button>
                        <button className={styles.minus} type="button" title="-1 данный товар" onClick={() => changeAmount(item._id, 'minus')}>
                           <img src={minus} />
                        </button>
                        <Link className={styles.edit} to={`/clothes/edit/${item._id}`} title="изменить товар">
                           <img src={edit} />
                        </Link>
                        <button className={styles.delete} type="button" title="удалить все количество" onClick={() => onDelete(item._id)}>
                           <img src={deleteIcon} />
                        </button>
                     </span>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Clothes;
