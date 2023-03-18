import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useLocate } from '../../../hooks/useLocate';

import { useAppDispatch } from '../../../hooks/useRedux';
import { logout } from '../../../redux/slices/auth/auth.slice';

import styles from './Header.module.scss';

const pages = [
   { id: '/', value: 'Система управления' },
   { id: '/users', value: 'Управляйте сотрудниками' },
   { id: '/users/add', value: 'Добавьте сотрудника' },
   { id: '/users/edit', value: 'Измените сотрудника' },
   { id: '/delivers', value: 'Управляйте доставками' },
   { id: '/delivers/add', value: 'Добавьте доставку' },
   { id: '/delivers/edit', value: 'Измените доставку' },
   { id: '/products', value: 'Управляйте товарами' },
   { id: '/products/add', value: 'Добавьте товар' },
   { id: '/products/edit', value: 'Измените товар' },
   { id: '/inventory', value: 'Управляйте товарами' },
   { id: '/inventory/add', value: 'Добавьте товар' },
   { id: '/inventory/edit', value: 'Измените товар' },
];

const Header: FC<{ isLogin: boolean }> = ({ isLogin }) => {
   const locate = useLocate();
   const dispatch = useAppDispatch();

   let found = pages.find((item) => item.id.toLowerCase() === locate.pathname.toLowerCase());

   if (locate.pathname.includes('/users/edit')) {
      found = { id: '/users/edit', value: 'Измените сотрудника' };
   }

   if (locate.pathname.includes('/products/edit')) {
      found = { id: '/products/edit', value: 'Измените товар' };
   }

   if (locate.pathname.includes('/delivers/edit')) {
      found = { id: '/delivers/edit', value: 'Измените доставку' };
   }

   if (locate.pathname.includes('/inventory/edit')) {
      found = { id: '/inventory/edit', value: 'Измените товар' };
   }

   return (
      <header className={styles.header}>
         <div className={styles.wrapper}>
            <Link to="/">
               <h2>
                  спор<span>ТТ</span>овары
               </h2>
            </Link>
            <h2>{found ? found.value : 'Страница не существует'}</h2>
            {isLogin && (
               <button type="button" onClick={() => dispatch(logout())}>
                  Bыйти
               </button>
            )}
         </div>
      </header>
   );
};

export default Header;
