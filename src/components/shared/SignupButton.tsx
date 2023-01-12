import { useNavigate } from 'react-router-dom';
import { DefaultButton } from './DefaultButton';

export const SignupButton = () => {
	const navigate = useNavigate();
	const handleSignUp = () => {
		navigate('/register');
	};

	return (
		<DefaultButton onClick={handleSignUp} variant="contained">
			Sign up for free
		</DefaultButton>
	);
};
