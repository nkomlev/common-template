'use client';
import './style.css';
import { useState } from "react";
import { useMessage } from "@common-templates/shared/components/ui/hooks/use-toast-message";
import { InputWithTitle } from "@common-templates/shared/components/ui/input";
import { Button } from "@common-templates/shared/components/ui/button";
import { createAdminAction } from "@/server/functions/createAdmin";
import { redirect } from "next/navigation";

const initFormValues = {
  login: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: ''
};

const RegistrationForm = () => {
  const [formValues, setFormValues] = useState(initFormValues);
  const { showError, showApprove } = useMessage();

  const formLexemes = {
    login: "Логин",
    firstName: "Имя",
    lastName: "Фамилия",
    password: "Пароль",
    confirmPassword: "Подтверждение пароля"
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    })
  };

  const handleRegistration = async () => {
    const { login, firstName, lastName, password, confirmPassword } = formValues;
    if (!login || !password || !firstName || !lastName || !confirmPassword) {
      showError({ title: "Заполните все поля" });
      return;
    }
    if (password !== confirmPassword) {
      showError({ title: "Пароли не совпадают" });
      return;
    }

    // В качестве эксперимента, а также за отсутствием необходимости в других точках входа к данному запросу используем server-action
    const result = await createAdminAction({
      login,
      firstName,
      lastName,
      password
    })

    if (!result.success) {
      showError({ title: result.message });
      return;
    }

    showApprove({ title: "Пользователь успешно создан!" });
    redirect('/authorization');
  }

  return (
    <div className="registration-form">
      <h1 className="title-xl">
        Регистрация администратора
      </h1>
      <div className="inputs-container">
        {Object.keys(formValues).map((formKey, index) => (
          <InputWithTitle
            key={`${formKey}-${index}`}
            title={formLexemes[formKey] || formKey}
            value={formValues[formKey]}
            name={formKey}
            type={formKey.toLowerCase().includes('password') ? 'password' : ''}
            onChange={handleInputChange}
          />
        ))}
      </div>
      <Button
        onClick={handleRegistration}
      >
        Зарегистрироваться
      </Button>
    </div>
  );
};

export default RegistrationForm;