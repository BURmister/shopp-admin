import { FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import styles from './Home.module.scss'
import user from '../../../assets/user.svg'
import product from '../../../assets/ball.svg'
import clothes from '../../../assets/shirt.svg'
import delivery from '../../../assets/delivery.svg'

const Home: FC = () => {

      useEffect(() => {
         window.scrollTo(0, 0);
         document.title = 'Система управления';
      }, []);

   return (
      <div className={styles.wrapper}>
         <Link to="/products">
            <span>Инвентарь</span>
            <img src={product} />
         </Link>
         <Link to="/products">
            <span>Одежда</span>
            <img src={clothes} />
         </Link>
         <Link to="/delivers">
            <span>Доставки</span>
            <img src={delivery} />
         </Link>
         <Link to="/users">
            <span>Сотрудники</span>
            <img src={user} />
         </Link>
      </div>
   );
}

export default Home