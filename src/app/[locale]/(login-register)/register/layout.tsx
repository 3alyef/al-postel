import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/get-dictionary";

export default async function RootLayout({
  children,
    params: { locale }
  }: Readonly<{children: React.ReactNode; params: { locale: Locale }}>) {
  const dictionary = await getDictionary(locale);
  return (
    <>
        <section className="commomSectionMenu">
          <div className=" inline-flex items-center text-white min-h-[5em] px-[1.2em] gap-2 font-semibold ">
            <div className="titlePadronMdQueryRegister relative w-[90%] aspect-[1/1] pt-[.2em] flex items-center">
              <h2 className={`text-[1.75em] font-[500]`}>{dictionary.Register.Create_a_Al_Postel_Account}</h2>
            </div>
          </div>
        </section>
        <section className="commomSectionMenu dataUser">
          <div className="dataUser_Container">
            {children}
          </div>
        </section>
    </>
  );
}
