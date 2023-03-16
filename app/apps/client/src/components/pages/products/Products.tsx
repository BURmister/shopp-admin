import { FC, useState, useEffect, useRef, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { fetchProducts, filterProducts, getProducts } from '../../../redux/slices/products/products.slice';
import { deleteOneProduct, deleteStatus } from '../../../redux/slices/products/deleteProduct.slice';
import { amountProduct, amountStatus, productTitle, updateAmountStatus } from '../../../redux/slices/products/amountProduct.slice';
import { changeAmount as changeProductAmount } from '../../../redux/slices/products/products.slice';
import AppContext from '../../../hooks/Context';

import styles from './Products.module.scss';
import back from '../../../assets/back.svg';
import shirt from '../../../assets/ball.svg';
import edit from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/delete.svg';
import minus from '../../../assets/minus.svg';

const Products: FC = () => {
   const products = useAppSelector(getProducts);
   const statusDelete = useAppSelector(deleteStatus);
   const statusAmount = useAppSelector(amountStatus);
   const amountedProduct = useAppSelector(productTitle);
   const dispatch = useAppDispatch();

   const [searchTerm, setSearchTerm] = useState<string>('');
   const [localSearch, setLocalSearch] = useState<string>('');
   const ref = useRef<HTMLInputElement>(null);

   const { token } = useContext(AppContext);

   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'Товары';
      searchTerm !== '' ? dispatch(fetchProducts({ searchTerm, token })) : dispatch(fetchProducts({ token }));
   }, [searchTerm]);

   const onDelete = (_id: string) => {
      if (confirm('Вы уверены, что хотите удалить товар?')) {
         dispatch(deleteOneProduct({ id: _id, token }));
         dispatch(filterProducts(_id));
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
      dispatch(amountProduct({ _id, state, token }));
      dispatch(changeProductAmount({ _id, state }));
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

   if (products.length === 0) {
      return (
         <div className={styles.wrapper}>
            <div className={styles.wrapper}>
               <nav>
                  <Link className="back" to="/" aria-label="назад на главную">
                     <img src={back} />
                     Назад
                  </Link>
                  <Link className="new product" to="/products/add" aria-label="добавить новый товар">
                     Создать
                     <img src={shirt} />
                  </Link>
               </nav>
               <div className={styles.table}></div>
               <h1>на складе нет товаров</h1>
            </div>
         </div>
      );
   }

   return (
      <div className={styles.wrapper}>
         <nav>
            <Link className="back" to="/" aria-label="назад на главную">
               <img src={back} />
               Назад
            </Link>
            <Link className="new product" to="/products/add" aria-label="добавить новый товар">
               Создать
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
            {products.map((item, index) => (
               <div className={styles.table__row} key={index}>
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
                        <img src={deleteIcon} />
                     </button>
                     <button className={styles.minus} type="button" title="-1 данный товар" onClick={() => changeAmount(item._id, 'minus')}>
                        <img src={minus} />
                     </button>
                     <Link className={styles.edit} to={`/products/edit/${item._id}`} title="изменить товар">
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
   );
};

export default Products;
