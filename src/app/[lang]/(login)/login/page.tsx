import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/get-dictionary";

export default async function Login({
  params: { lang }
}: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return (
    <main>
      <h1>Login {lang}</h1>
    </main>
  );
}
