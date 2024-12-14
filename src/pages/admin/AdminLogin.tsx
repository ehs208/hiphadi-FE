import LoginCheck from '@components/admin/LoginCheck';
import LoginForm from '../../components/admin/LoginForm';

const AdminLogin: React.FC = () => {
  return (
    <div>
      <LoginCheck />
      <LoginForm />
    </div>
  );
};

export default AdminLogin;
