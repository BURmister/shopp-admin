import { FC, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { addDelivery, addDeliveryStatus, addedDelivery, addedStatus } from '../../../../redux/slices/delivers/addDelivery.slice';
import AppContext from '../../../../hooks/Context';

import styles from './DeliversAdd.module.scss';
import back from '../../../../assets/back.svg';

const DeliversAdd: FC = () => {
   const [name, setName] = useState<string>('');
   const [description, setDescription] = useState<string>('');
   const [from, setFrom] = useState<string>('');
   const [beggining, setBeggining] = useState<string>('');
   const [ending, setEnding] = useState<string>('');

   const added = useAppSelector(addedDelivery);
   const status = useAppSelector(addedStatus);
   const dispatch = useAppDispatch();

   const { token } = useContext(AppContext);

   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'Добавить доставку';
   }, []);

   const onSubmit = () => {
      if (name !== '' && description !== '' && beggining !== '' && from !== '' && ending !== '') {
         const object = { deliveryName: name, deliveryDescription: description, beggining, from, ending };
         dispatch(addDelivery({ object, token }));
      } else {
         alert('Все поля должны быть заполнены');
      }
   };

   useEffect(() => {
      if (status === 'success') {
         alert(`Доставка добавлена \nКод: ${added}`);
         dispatch(addDeliveryStatus('loading'));
      } else if (status === 'error') {
         alert('Что-то пошло не так. Попробуйте позже');
         dispatch(addDeliveryStatus('loading'));
      }
   }, [status]);

   return (
      <div className={styles.wrapper}>
         <nav>
            <Link className="back" to="/delivers" aria-label="назад к списку доставок">
               <img src={back} />
               Назад
            </Link>
         </nav>
         <form className={styles.table}>
            <span>
               <label htmlFor="name">Название</label>
               <input id="name" type="text" placeholder="Название" value={name} onChange={(event) => setName(event.target.value)} />
            </span>
            <span>
               <label htmlFor="description">Описание</label>
               <textarea id="description" placeholder="Описание" value={description} onChange={(event) => setDescription(event.target.value)} />
            </span>
            <span>
               <label htmlFor="from">Откуда</label>
               <input id="from" type="text" placeholder="Откуда" value={from} onChange={(event) => setFrom(event.target.value)} />
            </span>
            <span>
               <label htmlFor="beggining">Начало</label>
               <input id="beggining" type="text" placeholder="Начало" value={beggining} onChange={(event) => setBeggining(event.target.value)} />
            </span>
            <span>
               <label htmlFor="ending">Конец</label>
               <input id="ending" type="text" placeholder="Конец" value={ending} onChange={(event) => setEnding(event.target.value)} />
            </span>
            <button type="button" onClick={() => onSubmit()}>
               Добавить
            </button>
         </form>
      </div>
   );
};

export default DeliversAdd;
