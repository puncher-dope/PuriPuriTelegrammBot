import { useAuth } from '@/context/authContext';
import { useNavigate } from 'react-router';
import './loginPage.scss'
import { useForm } from 'react-hook-form';
import { schemaLoginPage, type schemaLoginPageData } from './schemaLoginPage';
import { zodResolver } from '@hookform/resolvers/zod';



// Страница входа
export function LoginPage() {
    const { handleSubmit, register } = useForm<schemaLoginPageData>({
        resolver: zodResolver(schemaLoginPage)
    })
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = (data: schemaLoginPageData) => {
        if (login(data.login, data.password)) {
            navigate('/');
        } else {
            alert('Неверный логин или пароль');
        }
    };

    return (
        <div className='container'>
            <h2>Привет, небходимо авторизоваться</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Логин
                    <input placeholder="Логин" {...register('login')}/>
                </label>
                <label>Пароль
                    <input placeholder="Пароль" {...register('password')}/>
                </label>
                <button type="submit">Войти</button>
            </form>
        </div>
    );
}