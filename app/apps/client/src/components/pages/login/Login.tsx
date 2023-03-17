import { FC, useState, useRef} from 'react'
import { useAppDispatch } from '../../../hooks/useRedux'
import {login as loginUser} from '../../../redux/slices/auth/auth.slice'

import styles from './Login.module.scss'

const Login: FC = () => {
   const [login, setLogin] = useState<string>('')
   const [password, setPassword] = useState<string>('')

   const passwordRef = useRef<HTMLInputElement>(null)
   const dispatch = useAppDispatch()

   const onEnter = () => {
      dispatch(loginUser({ name: login, password }));
   }

   return (
      <div className={styles.wrapper}>
         <form>
            <h2>Войдите в систему</h2>
            <input type="text" placeholder="Логин" value={login} onChange={(event) => setLogin(event.target.value)} />
            <input placeholder="Пароль" ref={passwordRef} type="text" value={password} onChange={(event) => setPassword(event.target.value)} />
            <button type="button" onClick={() => onEnter()}>
               Войти
            </button>
         </form>
      </div>
   );
}

export default Login
