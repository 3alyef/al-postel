export default function DefaultBackground({children, _isSemitic}: {children: React.ReactNode, _isSemitic: boolean}){
    return (
        <div className="main_Login">
            <div className="barLogin">
                <div className={`container ${_isSemitic ? "semitic" : ""}`}>
                    <div className={`to2Container `}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}