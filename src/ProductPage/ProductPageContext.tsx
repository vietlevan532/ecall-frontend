import { createContext, ReactNode, useState } from "react";

interface IProps {
  children: ReactNode;
}

interface Category {
  category_id: number;
  name: string;
}

interface iContext {
  category: Category | undefined;
  setCategory: (category: Category) => void;
}
//Hook hold real actions.
const useProvideContext = () => {
  const [category, setCategory] = useState<Category>();

  return {
    category,
    setCategory,
  };
};

const productContext = createContext<iContext>({
  category: undefined,
  setCategory: (category: Category) => {},
});

function ProvideProductContext({ children }: IProps) {
  const context = useProvideContext();
  return (
    <productContext.Provider value={context}>
      {children}
    </productContext.Provider>
  );
}

export { ProvideProductContext, productContext };
