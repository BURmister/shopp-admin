import { FC, useState, useEffect, useRef, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { fetchUsers, filterUsers, getUsers } from '../../../redux/slices/users/users.slice';
import { deleteOneUser, deleteStatus } from '../../../redux/slices/users/deleteUser.slice';
import AppContext from '../../../hooks/Context';

import styles from './Users.module.scss';
import back from '../../../assets/back.svg';
import user from '../../../assets/user.svg';
import edit from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/delete.svg';

const Users: FC = () => {
   const users = useAppSelector(getUsers);
   const statusDelete = useAppSelector(deleteStatus);
   const dispatch = useAppDispatch();

   const [searchTerm, setSearchTerm] = useState<string>('');
   const [localSearch, setLocalSearch] = useState<string>('');
   const ref = useRef<HTMLInputElement>(null);

   const { token } = useContext(AppContext);

   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'Сотрудники';
      searchTerm !== '' ? dispatch(fetchUsers({searchTerm, token})) : dispatch(fetchUsers({token}));
   }, [searchTerm]);

   const onDelete = (_id: string) => {
      if (confirm('Вы уверены, что хотите удалить сотрудника?')) {
         dispatch(deleteOneUser({ id: _id, token }));
         dispatch(filterUsers(_id));
         if (statusDelete === 'success') {
            alert('Сотрудник успешно удален');
         } else if (statusDelete === 'error') {
            alert('Ошибка удаления сотрудника');
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

   if (users.length === 0) {
      return (
         <div className={styles.wrapper}>
            <div className={styles.wrapper}>
               <nav>
                  <Link className="back" to="/" aria-label="назад на главную">
                     <img src={back} />
                     Назад
                  </Link>
                  <Link className="new user" to="/users/add" aria-label="добавить нового пользователя">
                     Создать
                     <img src={user} />
                  </Link>
               </nav>
               <div className={styles.table}></div>
               <h1>сотрудники в журнале отсутствуют</h1>
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
               <Link className="new user" to="/users/add" aria-label="добавить нового пользователя">
                  Создать
                  <img src={user} />
               </Link>
            </nav>
            <div className={styles.table}>
               <form className={styles.table__row}>
                  <input
                     ref={ref}
                     type="search"
                     placeholder="Поиск сотрудника по   коду / имени / должности"
                     onKeyDown={(event) => enterClick(event)}
                     value={localSearch}
                     onChange={(event: { target: HTMLInputElement }) => onSearchInput(event)}
                  />
                  {/* <button type="button" onClick={() => buttonClick()}>
                  Поиск
               </button> */}
               </form>
               <span className={styles.searchTerm}>{searchTerm !== '' && <h2>Результаты по запросу "{searchTerm}"</h2>}</span>

               {users.map((item, index) => (
                  <div className={styles.table__row} key={index}>
                     <span>
                        <h3>код</h3>
                        {item._id}
                     </span>
                     <span>
                        <h3>должность</h3>
                        {item.role}
                     </span>
                     <span>
                        <h3>имя</h3>
                        {item.firstName}
                     </span>
                     <span>
                        <h3>фамилия</h3>
                        {item.secondName}
                     </span>
                     <span>
                        <Link className={styles.edit} to={`/users/edit/${item._id}`} title="изменить сотрудника">
                           <img src={edit} />
                        </Link>
                        <button className={styles.delete} type="button" title="удалить сотруднкиа" onClick={() => onDelete(item._id)}>
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

export default Users;
