import { FC, useState, useEffect, useRef, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { fetchDelivers, filterDelivers, getDelivers } from '../../../redux/slices/delivers/delivers.slice';
import { deleteOneDelivery, deleteStatus } from '../../../redux/slices/delivers/deleteDelivery.slice';
import { completeOneDelivery, completeStatus } from '../../../redux/slices/delivers/completeDelivery.slice';
import AppContext from '../../../hooks/Context';

import styles from './Delivers.module.scss';
import back from '../../../assets/back.svg';
import delivery from '../../../assets/delivery.svg';
import edit from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/delete.svg';
import deliveryDone from '../../../assets/delivery-done.svg';

const Delivers: FC = () => {
   const delivers = useAppSelector(getDelivers);
   const statusDelete = useAppSelector(deleteStatus);
   const statusComplete = useAppSelector(completeStatus);
   const dispatch = useAppDispatch();

   const { token } = useContext(AppContext)

   const [searchTerm, setSearchTerm] = useState<string>('');
   const [localSearch, setLocalSearch] = useState<string>('');
   const ref = useRef<HTMLInputElement>(null);

   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'Доставки';
      searchTerm !== '' ? dispatch(fetchDelivers({searchTerm, token})) : dispatch(fetchDelivers({token}));
   }, [searchTerm]);

   const onDelete = (_id: string) => {
      if (confirm('Вы уверены, что хотите удалить доставку?')) {
         dispatch(deleteOneDelivery({ id: _id, token }));
         dispatch(filterDelivers(_id));
         if (statusDelete === 'success') {
            alert('Доставка успешно удалена');
         } else if (statusDelete === 'error') {
            alert('Ошибка удаления доставки');
         }
      }
   };

   const onComplete = (_id: string) => {
      if (confirm('Вы уверены, что хотите завершить доставку?')) {
         dispatch(completeOneDelivery({ id: _id, token }));
         dispatch(filterDelivers(_id));
         if (statusComplete === 'success') {
            alert('Доставка успешно принята');
         } else if (statusComplete === 'error') {
            alert('Ошибка завершения доставки');
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

   if (delivers.length === 0) {
      return (
         <div className={styles.wrapper}>
            <div className={styles.wrapper}>
               <nav>
                  <Link className="back" to="/" aria-label="назад на главную">
                     <img src={back} />
                     Назад
                  </Link>
                  <Link className="new delivery" to="/delivers/add" aria-label="добавить новую доставку">
                     Создать
                     <img src={delivery} />
                  </Link>
               </nav>
               <div className={styles.table}></div>
               <h1>нет ожидаемых доставок</h1>
            </div>
         </div>
      );
   }

   return (
      <div className={styles.wrapper}>
         <div className={styles.wrapper}>
            <nav>
               <Link className="back" to="/" aria-label="назад на главную">
                  <img src={back} />
                  Назад
               </Link>
               <Link className="new delivery" to="/delivers/add" aria-label="добавить новую доставку">
                  Создать
                  <img src={delivery} />
               </Link>
            </nav>
            <div className={styles.table}>
               <form className={styles.table__row}>
                  <input
                     ref={ref}
                     type="search"
                     placeholder="Поиск доставки по   коду / названию / месту отправления"
                     onKeyDown={(event) => enterClick(event)}
                     value={localSearch}
                     onChange={(event: { target: HTMLInputElement }) => onSearchInput(event)}
                  />
                  {/* <button type="button" onClick={() => buttonClick()}>
                  Поиск
               </button> */}
               </form>
               <span className={styles.searchTerm}>{searchTerm !== '' && <h2>Результаты по запросу "{searchTerm}"</h2>}</span>

               {delivers.map((item, index) => (
                  <div className={styles.table__row} key={index}>
                     <span>
                        <h3>код</h3>
                        {item._id}
                     </span>
                     <span>
                        <h3>название</h3>
                        {item.deliveryName}
                     </span>
                     <span>
                        <h3>откуда</h3>
                        {item.from}
                     </span>
                     <span>
                        <h3>начало</h3>
                        {item.beggining}
                     </span>
                     <span>
                        <Link className={styles.edit} to={`/delivers/edit/${item._id}`} title="изменить доставку">
                           <img src={edit} />
                        </Link>
                        <button className={styles.done} type="button" title="принять завершенную доставку" onClick={() => onComplete(item._id)}>
                           <img src={deliveryDone} />
                        </button>
                        <button className={styles.delete} type="button" title="удалить доставку" onClick={() => onDelete(item._id)}>
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

export default Delivers;
