import { useNavigate } from 'react-router';
import './loginPage.scss'
import { useForm } from 'react-hook-form';
import { schemaLoginPage, type schemaLoginPageData } from './schemaLoginPage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from '@/store/service/AuthService';



// Страница входа
export function LoginPage() {
    const { handleSubmit, register, formState: { errors } } = useForm<schemaLoginPageData>({
        resolver: zodResolver(schemaLoginPage)
    })
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    const onSubmit = async (data: schemaLoginPageData) => {
        const success = await login(data);
        if (success) {
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
                    <input placeholder="Логин" {...register('login')} />
                    {errors.login && (
                        <span className="error">{errors.login.message}</span>
                    )}
                </label>
                <label>Пароль
                    <input placeholder="Пароль" {...register('password')}/>
                    {errors.password && (
                        <span className="error">{errors.password.message}</span>
                    )}
                </label>
                <button type="submit" > Войти</button>
            </form>
        </div>
    );
}