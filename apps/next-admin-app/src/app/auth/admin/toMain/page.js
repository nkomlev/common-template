import {redirect} from "next/navigation";

// Для редиректа на главную страницу из next-admin
// Возможно есть какой-то другой вариант, но я пока что его не нашел (Сторонние ссылки всегда открываются в новой вкладке, что не подходит)
const ToMain = () => {
  redirect('/');
  return (
    <></>
  )
}

export default ToMain;