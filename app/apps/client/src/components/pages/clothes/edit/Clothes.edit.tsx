import { FC, useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { fetchOneClothes, getOneClothes } from '../../../../redux/slices/clothes/oneClothes.slice';
import { editOneClothes, editClothesStatus, clothesId, updateEditStatus } from '../../../../redux/slices/clothes/editClothes.slice';
import AppContext from '../../../../hooks/Context';

import styles from './Style.module.scss';
import back from '../../../../assets/back.svg';

const ClothesEdit: FC = () => {
   const clothes = useAppSelector(getOneClothes);
   const status = useAppSelector(editClothesStatus);
   const editId = useAppSelector(clothesId);
   const dispatch = useAppDispatch();

   const params = useParams();
   const navigate = useNavigate();

   const { token } = useContext(AppContext);

   const [price, setPrice] = useState<string>('');
   const [name, setName] = useState<string>('');
   const [description, setDescription] = useState<string>('');
   const [size, setSize] = useState<string>('');
   const [amount, setAmount] = useState<number>(1);
   const [gender, setGender] = useState<'Женский' | 'Мужской'>('Женский');
   const [category, setCategory] = useState<string>('');
   const [producer, setProducer] = useState<string>('');

   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'Изменить товар';
      params.id && dispatch(fetchOneClothes({id: params.id, token}));
   }, [params]);

   useEffect(() => {
      setPrice(clothes ? clothes.price : '');
      setName(clothes ? clothes.name : '');
      setDescription(clothes ? clothes.description : '');
      setSize(clothes ? clothes.size : '');
      setGender(clothes ? (clothes.gender === 'Мужской' ? clothes.gender : 'Женский') : 'Женский');
      setCategory(clothes ? clothes.category : '');
      setProducer(clothes ? clothes.producer : '');
      setAmount(clothes ? clothes.amount : 1);
   }, [clothes]);

   const onSubmit = () => {
      if (clothes && price !== '' && name !== '' && description !== '' && size !== '' && category !== '' && producer !== '') {
         const object = { price, name, description, size, category, producer, gender, amount };
         dispatch(editOneClothes({ id: clothes._id, object, token }));
      } else {
         alert('Все поля должны быть заполнены');
      }
   };

   useEffect(() => {
      if (status === 'success') {
         alert(`Товар изменен \nАртикул: ${editId}`);
         dispatch(updateEditStatus('loading'));
         navigate('/clothes');
      } else if (status === 'error') {
         alert('Что-то пошло не так. Попробуйте позже');
         dispatch(updateEditStatus('loading'));
         navigate('/clothes');
      }
   }, [status]);

   if (clothes === null) {
      return <h1>товар не найден</h1>;
   }

   return (
      <div className={styles.wrapper}>
         <nav>
            <Link className="back" to="/clothes" aria-label="назад к списку товаров">
               <img src={back} />
               Назад
            </Link>
         </nav>
         <form className={styles.table}>
            <span>
               <h3>Артикул</h3>
               <p>{clothes._id}</p>
            </span>
            <span>
               <label htmlFor="name">Название</label>
               <input id="name" type="text" placeholder="Название" value={name} onChange={(event) => setName(event.target.value)} />
            </span>
            <span>
               <label htmlFor="description">Описание</label>
               <textarea id="description" placeholder="Описание" value={description} onChange={(event) => setDescription(event.target.value)} />
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

export default ClothesEdit;
