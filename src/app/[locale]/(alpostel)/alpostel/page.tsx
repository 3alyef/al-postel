import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/get-dictionary";
import DataUserFormEmail from "@/app/components/dataUserFormEmail/dataUserFormEmail";
import ContactsContainer from "@/app/components/contactsContainer/contactsContainer";
import MsgsContainer from "@/app/components/msgsContainer/msgsContainer";
export default async function Alpostel({
  params: { locale }
}: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(locale);
  const _isSemitic: boolean = locale === "he";

  return (
      <> 
        <section className="sectionContact" style={{borderRadius: _isSemitic ? "0px 5px 5px 0px": "5px 0px 0px 5px"}}>
          <ContactsContainer _isSemitic={_isSemitic}/>
        </section>
        <section className="sectionMsg" style={{borderRadius: _isSemitic ? "5px 0px 0px 5px": "0px 5px 5px 0px"}}>
          <MsgsContainer/>
        </section>
      </>       
  );
}
