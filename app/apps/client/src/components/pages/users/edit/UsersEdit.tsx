import { FC, useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { fetchOneUser, getOneUser } from '../../../../redux/slices/users/oneUser.slice';
import { editOnUser, editUserStatus, userId } from '../../../../redux/slices/users/editUser.slice';
import AppContext from '../../../../hooks/Context';

import styles from './UsersEdit.module.scss';
import back from '../../../../assets/back.svg';

const UsersEdit: FC = () => {
   const user = useAppSelector(getOneUser);
   const status = useAppSelector(editUserStatus);
   const editId = useAppSelector(userId);
   const dispatch = useAppDispatch();

   const { token } = useContext(AppContext);

   const params = useParams();
   const navigate = useNavigate();

   const [role, setRole] = useState<string>('');
   const [firstName, setFirstName] = useState<string>('');
   const [secondName, setSecondName] = useState<string>('');

   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'Изменить сотрудника';
      params.id && dispatch(fetchOneUser({ id: params.id, token }));
   }, [params]);

   useEffect(() => {
      setRole(user ? user.role : '');
      setFirstName(user ? user.firstName : '');
      setSecondName(user ? user.secondName : '');
   }, [user]);

   const onSubmit = () => {
      if (user && role !== '' && firstName !== '' && secondName !== '') {
         const object = { role, firstName, secondName };
         dispatch(editOnUser({ id: user._id, object, token }));
      } else {
         alert('Все поля должны быть заполнены');
      }
   };

   useEffect(() => {
      if (status === 'success') {
         alert(`Сотрудник изменен \nКод: ${editId}`);
         navigate('/users');
      } else if (status === 'error') {
         alert('Что-то пошло не так. Попробуйте позже');
         navigate('/users');
      }
   }, [status]);

   if (user === null) {
      return <h1>сотрудник не найден</h1>;
   }

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
               <h3>Код сотрудника</h3>
               <p>{user._id}</p>
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
               Применить изменения
            </button>
         </form>
      </div>
   );
};

export default UsersEdit;
