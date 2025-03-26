'use client';
import './style.css';
import { useState } from "react";
import { useMessage } from "@/components/ui/hooks/use-toast-message";
import { InputWithTitle } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createAdminAction } from "@/server/actions/createAdmin";
import { redirect } from "next/navigation";
import { useDictionary } from "@/components/dictionaryProvider/DictionaryProvider";

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
  const dictionary = useDictionary();

  const formLexemes = {
    login: dictionary.LEX_3, // Логин
    firstName: dictionary.LEX_9, // Имя
    lastName: dictionary.LEX_10, // Фамилия
    password: dictionary.LEX_4, // Пароль
    confirmPassword: dictionary.LEX_11 // Подтверждение пароля
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
      showError({ title: dictionary.LEX_8 }); // Заполните все поля
      return;
    }
    if (password !== confirmPassword) {
      showError({ title: dictionary.LEX_12 }); // Пароли не совпадают
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

    showApprove({ title: dictionary.LEX_13 }); // Пользователь успешно создан!
    redirect('/authorization');
  }

  return (
    <div className="registration-form">
      <h1 className="title-xl">
        {dictionary.LEX_14}
        {/* Регистрация администратора */}
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
        {dictionary.LEX_15}
        {/* Зарегистрироваться */}
      </Button>
    </div>
  );
};

export default RegistrationForm;