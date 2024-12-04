import backIcon from '@/assets/back-svgrepo-com.svg';
import Image from 'next/image';
import Link from 'next/link';


const NewProject = () => {
    return (
        <> 
        <div className="px-4 mt-4">
            <Link href="/dashboard">
            <Image src={backIcon} alt="back" width={20} height={20} />
            </Link>
            <p className="text-[1.2em] font-semibold m-0 mt-2">New Project</p>
            <div>
                
            </div>
        </div>
        </>
    )
}

export default NewProject;