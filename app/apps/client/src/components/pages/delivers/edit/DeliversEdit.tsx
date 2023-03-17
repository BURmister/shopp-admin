import { FC, useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { fetchOneDelivery, getOneDelivery } from '../../../../redux/slices/delivers/oneDelivery.slice';
import { deliveryCode, editDeliveryStatus, editDStatus, editOnDelivery } from '../../../../redux/slices/delivers/editDeliver.slice';
import AppContext from '../../../../hooks/Context';

import styles from './DeliversEdit.module.scss';
import back from '../../../../assets/back.svg';

const DeliversEdit: FC = () => {
   const delivery = useAppSelector(getOneDelivery);
   const status = useAppSelector(editDStatus);
   const editId = useAppSelector(deliveryCode);

   const dispatch = useAppDispatch();

   const { token } = useContext(AppContext);

   const params = useParams();
   const navigate = useNavigate();

   const [name, setName] = useState<string>('');
   const [description, setDescription] = useState<string>('');
   const [from, setFrom] = useState<string>('');
   const [beggining, setBeggining] = useState<string>('');
   const [ending, setEnding] = useState<string>('');

   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'Изменить доставку';
      params.id && dispatch(fetchOneDelivery({ id: params.id, token }));
   }, []);

   useEffect(() => {
      setFrom(delivery ? delivery.from : '');
      setName(delivery ? delivery.deliveryName : '');
      setDescription(delivery && delivery.deliveryDescription ? delivery.deliveryDescription : '');
      setBeggining(delivery ? delivery.beggining : '');
      setEnding(delivery ? delivery.ending : '');
   }, [delivery]);

   const onSubmit = () => {
      if (delivery && name !== '' && description !== '' && from !== '' && beggining !== '' && ending !== '') {
         const object = { deliveryName: name, deliveryDescription: description, from, beggining, ending };
         dispatch(editOnDelivery({ id: delivery._id, object, token }));
      } else {
         alert('Все поля должны быть заполнены');
      }
   };

   useEffect(() => {
      if (status === 'success') {
         alert(`Доставка изменена \nКод: ${editId}`);
         dispatch(editDeliveryStatus('loading'));
         navigate('/delivers');
      } else if (status === 'error') {
         alert('Что-то пошло не так. Попробуйте позже');
         dispatch(editDeliveryStatus('loading'));
         navigate('/delivers');
      }
   }, [status]);

   if (delivery === null) {
      return <h1>доставка не найдена</h1>;
   }

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
               <h3>Код доставки</h3>
               <p>{delivery._id}</p>
            </span>
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
               Применить изменения
            </button>
         </form>
      </div>
   );
};

export default DeliversEdit;
