import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="flex justify-center items-center w-full mt-10 p-10 border-t border-gray-400">
      <div className="space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <FaXTwitter />
          <FaInstagram />
          <FaFacebook />
        </div>
        <div className="text-[12px] sm:text-sm">
          © 2024 Playmaker – Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
};
