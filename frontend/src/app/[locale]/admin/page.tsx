import { useTranslations } from 'next-intl';
import AdminPage from './AdminPage';

export default function Page(params: { locale: string }) {
  const t = useTranslations('Admin');
  const messages = {
    admin: t('admin'),
    userManagement: t('user_management'),
    avatar: t('avatar'),
    id: t('id'),
    email: t('email'),
    username: t('username'),
    role: t('role'),
    administrator: t('administrator'),
    user: t('user'),
    noUsersFound: t('no_users_found'),
  };

  return (
    <div className="w-full flex items-center justify-center">
      <AdminPage messages={messages} locale={params.locale} />
    </div>
  );
}
