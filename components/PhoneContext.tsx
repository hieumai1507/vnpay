import React, { createContext, ReactNode, useContext, useState } from "react";

interface PhoneContextType {
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
}
// Tạo context
const PhoneContext = createContext<PhoneContextType | undefined>(undefined);

// Tạo Provider
export const PhoneProvider = ({ children }: { children: ReactNode }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <PhoneContext.Provider value={{ phoneNumber, setPhoneNumber }}>
      {children}
    </PhoneContext.Provider>
  );
};

// Custom hook để sử dụng context
export const usePhone = (): PhoneContextType => {
  const context = useContext(PhoneContext);
  if (!context) {
    throw new Error("usePhone must be used within a PhoneProvider");
  }
  return context;
};
