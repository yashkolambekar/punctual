const AuthLayout = ({children} : {children: React.ReactNode}) => {
    return (
        <>
            <div className="w-full min-h-[100dvh] flex flex-col items-center justify-center">
                {children}
            </div>
        </>
    )
}

export default AuthLayout;