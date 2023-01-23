import { AuthPage } from 'components/shared';
import { RegisterForm } from './RegisterForm';

export const RegisterPage = () => {
	return (
		<AuthPage title="Register">
			<RegisterForm />
		</AuthPage>
	);
};
