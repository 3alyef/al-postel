"use client";
import { useEffect, useState } from "react";
import ContactsContainer from "../contactsContainer/contactsContainer";
import MsgsContainer from "../msgsContainer/msgsContainer";
import { ConnectM2 } from "@/services/connectToM2.service";
interface propsAlpostelMain {
    _isSemitic: boolean;
}

export function AlpostelMain({_isSemitic}:propsAlpostelMain) {
    const [serverIo, setServerIo] = useState<ConnectM2 | null>(null);

    useEffect(() => {
        const tokenToM2 = localStorage.getItem("tokenToM2");
        const m2URL = localStorage.getItem("linkM2");

        if (tokenToM2 && m2URL) {
            const server = new ConnectM2(m2URL, tokenToM2);
            server.initialize();
            setServerIo(server);
        }
    }, []); // O array vazio garante que este efeito só será executado uma vez, semelhante ao componentDidMount


    return(
        <>
            {
                serverIo && (
                    <>

                        <section className="sectionContact" style={{borderRadius: _isSemitic ? "0px 5px 5px 0px": "5px 0px 0px 5px"}}>
                            <ContactsContainer _isSemitic={_isSemitic} serverIo={serverIo}/>
                        </section>
                        <section className="sectionMsg" style={{borderRadius: _isSemitic ? "5px 0px 0px 5px": "0px 5px 5px 0px"}}>
                            <MsgsContainer/>
                        </section>
                    </>
                )
            }
        </>
    )
}