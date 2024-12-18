import Link from "next/link";

const Header = () => {
    return (
        <>
            <div className="flex justify-center">
                <Link href={"/dashboard"} className="p-1 no-underline text-black">
                    <p className="text-[1.3em] m-0"><span className="font-black">Punctual</span>.live</p>
                </Link>
            </div>
        </>
    )
}

export default Header;