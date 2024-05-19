import AuthPage from "../authPage";
import { useTranslations } from "next-intl";

export default function Page(params: { locale: string }) {
  const t = useTranslations("Auth");
  const messages = {
    title: t("signup"),
    linkTitle: t("or_signin"),
    submitTitle: t("signup"),
    email: t("email"),
    username: t("username"),
    password: t("password"),
    confirmPassword: t("confirm_password"),
    invalidEmail: t("invalid_email"),
    invalidPassword: t("invalid_password"),
    usernameEmpty: t("username_empty"),
    passwordDoesNotMatch: t("password_not_match"),
    EmailAlreadyExist: t("email_already_exist"),
    emailNotExist: t("email_not_exist"),
    signupError: t("signup_error"),
    signinError: t("signin_error"),
  };
  return (
    <>
      <AuthPage isSignup={true} messages={messages} locale={params.locale} />
    </>
  );
}