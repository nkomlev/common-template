import Header from "@/components/header/Header";

const MainTemplate = ({ children }) => {
  return (
    <>
      <Header />
      <div className="pt-[80px] w-full h-full ">
        {children}
      </div>
    </>
  );
};

export default MainTemplate;