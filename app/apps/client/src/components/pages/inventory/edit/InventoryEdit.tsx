import { FC, useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { fetchOneInventory, getOneInventory } from '../../../../redux/slices/inventory/oneInventory.slice';
import { editOneInventory, editInventoryStatus, inventoryId, updateEditStatus } from '../../../../redux/slices/inventory/editInventory.slice';
import AppContext from '../../../../hooks/Context';

import styles from './Style.module.scss';
import back from '../../../../assets/back.svg';

const InventoryEdit: FC = () => {
   const inventory = useAppSelector(getOneInventory);
   const status = useAppSelector(editInventoryStatus);
   const editId = useAppSelector(inventoryId);
   const dispatch = useAppDispatch();

   const params = useParams();
   const navigate = useNavigate();

   const { token } = useContext(AppContext);

   const [price, setPrice] = useState<string>('');
   const [name, setName] = useState<string>('');
   const [description, setDescription] = useState<string>('');
   const [size, setSize] = useState<string>('');
   const [feature, setFeature] = useState<string>('');
   const [amount, setAmount] = useState<number>(1);
   const [gender, setGender] = useState<'Женский' | 'Мужской'>('Женский');
   const [category, setCategory] = useState<string>('');
   const [producer, setProducer] = useState<string>('');

   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'Изменить товар';
      params.id && dispatch(fetchOneInventory({ id: params.id, token }));
   }, [params]);

   useEffect(() => {
      setPrice(inventory ? inventory.price : '');
      setName(inventory ? inventory.name : '');
      setDescription(inventory ? inventory.description : '');
      setSize(inventory ? inventory.size : '');
      setGender(inventory ? (inventory.gender === 'Мужской' ? inventory.gender : 'Женский') : 'Женский');
      setCategory(inventory ? inventory.category : '');
      setProducer(inventory ? inventory.producer : '');
      setFeature(inventory ? inventory.feature : '');
      setAmount(inventory ? inventory.amount : 1);
   }, [inventory]);

   const onSubmit = () => {
      if (inventory && price !== '' && name !== '' && feature !== '' && description !== '' && size !== '' && category !== '' && producer !== '') {
         const object = { price, name, description, size, feature, category, producer, gender, amount };
         dispatch(editOneInventory({ id: inventory._id, object, token }));
      } else {
         alert('Все поля должны быть заполнены');
      }
   };

   useEffect(() => {
      if (status === 'success') {
         alert(`Товар изменен \nАртикул: ${editId}`);
         dispatch(updateEditStatus('loading'));
         navigate('/inventory');
      } else if (status === 'error') {
         alert('Что-то пошло не так. Попробуйте позже');
         dispatch(updateEditStatus('loading'));
         navigate('/inventory');
      }
   }, [status]);

   if (inventory === null) {
      return <h1>товар не найден</h1>;
   }

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
               <h3>Артикул</h3>
               <p>{inventory._id}</p>
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
                        value="Женский"
                        checked={gender === 'Женский'}
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
               <input id="price" min="0" type="text" placeholder="Цена" value={price} onChange={(event) => setPrice(event.target.value)} />
            </span>
            <button type="button" onClick={() => onSubmit()}>
               Подтвердить изменения
            </button>
         </form>
      </div>
   );
};

export default InventoryEdit;
