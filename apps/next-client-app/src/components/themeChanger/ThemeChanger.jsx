'use client';
import React, { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

const ThemeChanger = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    setTheme(document.getElementsByTagName('html')[0].className.includes('dark') ? 'dark' : 'light');
  }, []);

  const handleChangeTheme = () => {
    const mainElem = document.getElementsByTagName('html')[0];
    if (mainElem.className.includes('dark')) {
      setTheme('light');
      mainElem.classList.remove('dark');
    } else {
      setTheme('dark');
      mainElem.classList.add('dark');
    }
  }

  if (theme === 'dark') {
    return <MoonIcon
      className="cursor-pointer"
      onClick={handleChangeTheme}
    />;
  }

  return <SunIcon
    className="cursor-pointer"
    onClick={handleChangeTheme}
  />;
};

export default ThemeChanger;