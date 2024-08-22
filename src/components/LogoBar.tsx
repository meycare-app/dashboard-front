import Image from "next/image";
import Logo from "../assets/logo.png";

export default function LogoBar() {
  return (
    <aside className="flex h-screen basis-1/3 items-center justify-center bg-gradient-to-r from-[#B6821C] to-[#FFCF72]">
      <div className="max-w-full">
        <Image
          src={Logo}
          width={350}
          height={350}
          alt="Logo da Meycare"
        ></Image>
      </div>
    </aside>
  );
}
