import { ChangeEvent, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

interface SocialLoginEmailProps {
  adapter: string;
  handleSocialLoginClick: (params: { adapter: string; loginParams: { loginProvider: string; login_hint?: string } }) => void;
}
export default function SocialLoginEmail(props: SocialLoginEmailProps) {
  const { handleSocialLoginClick, adapter } = props;
  const [isValidEmail, setIsValidEmail] = useState(false);

  const { t } = useTranslation();

  const handleEmailSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = ((e.target as HTMLFormElement)[0] as HTMLInputElement).value;
    if (email) handleSocialLoginClick({ adapter, loginParams: { loginProvider: "email_passwordless", login_hint: email } });
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    setIsValidEmail(!!emailValid);
  };
  return (
    <div className="w3ajs-email-passwordless w3a-group w3a-group--email">
      <div className="w3a-group__title">{t("modal.social.email")}</div>
      <form className="w3ajs-email-passwordless-form" onSubmit={(e) => handleEmailSubmit(e)}>
        <input
          className="w3a-text-field"
          type="email"
          name="email"
          required
          placeholder={t("modal.social.email")}
          onChange={(e) => handleEmailChange(e)}
        />
        <button disabled={!isValidEmail} className="w3a-button" type="submit">
          {t("modal.social.email-continue")}
        </button>
      </form>
    </div>
  );
}
