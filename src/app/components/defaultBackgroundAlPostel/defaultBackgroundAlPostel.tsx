"use client"

export default function DefaultBackgroundAlPostel({
    children, _isSemitic
  }: Readonly<{
    children: React.ReactNode, _isSemitic: boolean
  }>){
    return (
        <div className={"main_Login"}>
            <div className="barLogin">
                <div className={`${_isSemitic ? "semitic" : ""}`}>
                    <div>{children}</div>
                </div>
            </div>
        
        </div>
    )
}