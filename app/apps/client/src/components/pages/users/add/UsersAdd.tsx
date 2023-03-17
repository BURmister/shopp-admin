import { FC, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { addedStatus, addedUser, addUser } from '../../../../redux/slices/users/addUser.slice';
import AppContext from '../../../../hooks/Context';

import styles from './UsersAdd.module.scss';
import back from '../../../../assets/back.svg';

const UsersAdd: FC = () => {
   const [name, setName] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [role, setRole] = useState<string>('');
   const [firstName, setFirstName] = useState<string>('');
   const [secondName, setSecondName] = useState<string>('');

   const added = useAppSelector(addedUser);
   const status = useAppSelector(addedStatus);
   const dispatch = useAppDispatch();

   const { token } = useContext(AppContext);

   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'Добавить сотрудника';
   }, []);

   const onSubmit = () => {
      if (name !== '' && password !== '' && role !== '' && firstName !== '' && secondName !== '') {
         const object = { name, password, role, firstName, secondName };
         dispatch(addUser({ object, token }));
      } else {
         alert('Все поля должны быть заполнены');
      }
   };

   useEffect(() => {
      if (status === 'success') {
         alert(`Сотрудник добавлен \nКод: ${added}`);
      } else if (status === 'error') {
         alert('Что-то пошло не так. Попробуйте позже');
      }
   }, [status]);

   return (
      <div className={styles.wrapper}>
         <nav>
            <Link className="back" to="/users" aria-label="назад к списку сотрудников">
               <img src={back} />
               Назад
            </Link>
         </nav>
         <form className={styles.table}>
            <span>
               <label htmlFor="name">Логин</label>
               <input id="name" type="text" placeholder="Логин" value={name} onChange={(event) => setName(event.target.value)} />
            </span>
            <span>
               <label htmlFor="password">Пароль</label>
               <input id="password" type="text" placeholder="Пароль" value={password} onChange={(event) => setPassword(event.target.value)} />
            </span>
            <span>
               <label htmlFor="firstName">Имя</label>
               <input id="firstName" type="text" placeholder="Имя" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
            </span>
            <span>
               <label htmlFor="secondName">Фамилия</label>
               <input id="secondName" type="text" placeholder="Фамилия" value={secondName} onChange={(event) => setSecondName(event.target.value)} />
            </span>
            <span>
               <label htmlFor="role">Должность</label>
               <input id="role" type="text" placeholder="Должность" value={role} onChange={(event) => setRole(event.target.value)} />
            </span>
            <button type="button" onClick={() => onSubmit()}>
               Добавить
            </button>
         </form>
      </div>
   );
};

export default UsersAdd;
