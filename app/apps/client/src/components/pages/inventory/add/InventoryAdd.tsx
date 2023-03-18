import { FC, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { addedInventory, addedStatus, addInventory, updateAddStatus } from '../../../../redux/slices/inventory/addInventory.slice';
import AppContext from '../../../../hooks/Context';

import styles from './Style.module.scss';
import back from '../../../../assets/back.svg';

const InventoryAdd: FC = () => {
   const [name, setName] = useState<string>('');
   const [price, setPrice] = useState<number>(0);
   const [description, setDescription] = useState<string>('');
   const [gender, setGender] = useState<'Женский' | 'Мужской'>('Женский');
   const [category, setCategory] = useState<string>('');
   const [producer, setProducer] = useState<string>('');
   const [size, setSize] = useState<string>('');
   const [feature, setFeature] = useState<string>('');
   const [amount, setAmount] = useState<number>(1);

   const added = useAppSelector(addedInventory);
   const status = useAppSelector(addedStatus);
   const dispatch = useAppDispatch();

   const { token } = useContext(AppContext);

   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'Добавить товар';
   }, []);

   const onSubmit = () => {
      if (name !== '' && description !== '' && feature !== '' && category !== '' && producer !== '' && size !== '' && price !== 0) {
         const object = { name, description, feature, category, gender, producer, size, amount, price: String(price) };
         dispatch(addInventory({ object, token }));
      } else {
         alert('Все поля должны быть заполнены');
      }
   };

   useEffect(() => {
      if (status === 'success') {
         alert(`Товар добавлен \nАртикул: ${added}`);
         dispatch(updateAddStatus('loading'));
      } else if (status === 'error') {
         alert('Что-то пошло не так. Попробуйте позже');
         dispatch(updateAddStatus('loading'));
      }
   }, [status]);

   return (
      <div className={styles.wrapper}>
         <nav>
            <Link className="back" to="/inventory" aria-label="назад к списку товаров">
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
               <label htmlFor="feature">Особенность</label>
               <textarea id="feature" placeholder="Особенность" value={feature} onChange={(event) => setFeature(event.target.value)} />
            </span>
            <div>
               <h3>Пол</h3>
               <span>
                  <div>
                     <input
                        name="gender"
                        type="radio"
                        id="male"
                        value="Мужской"
                        checked={gender === 'Мужской'}
                        onChange={() => setGender('Мужской')}
                     />
                     <label htmlFor="male">Мужской</label>
                  </div>
                  <div>
                     <input
                        name="gender"
                        type="radio"
                        id="female"
                        checked={gender === 'Женский'}
                        value="Женский"
                        onChange={() => setGender('Женский')}
                     />
                     <label htmlFor="female">Женский</label>
                  </div>
               </span>
            </div>
            <span>
               <label htmlFor="category">Категория</label>
               <input id="category" type="text" placeholder="Категория" value={category} onChange={(event) => setCategory(event.target.value)} />
            </span>
            <span>
               <label htmlFor="producer">Производитель</label>
               <input id="producer" type="text" placeholder="Производитель" value={producer} onChange={(event) => setProducer(event.target.value)} />
            </span>
            <span>
               <label htmlFor="size">Размер</label>
               <input id="size" type="text" placeholder="Размер" value={size} onChange={(event) => setSize(event.target.value)} />
            </span>
            <span>
               <label htmlFor="amount">Количество</label>
               <input
                  id="amount"
                  min="0"
                  type="number"
                  placeholder="Количество"
                  value={amount}
                  onChange={(event) => setAmount(Number(event.target.value))}
               />
            </span>
            <span>
               <label htmlFor="price">Цена</label>
               <input id="price" min="0" type="text" placeholder="Цена" value={price} onChange={(event) => setPrice(Number(event.target.value))} />
            </span>
            <button type="button" onClick={() => onSubmit()}>
               Добавить
            </button>
         </form>
      </div>
   );
};

export default InventoryAdd;
