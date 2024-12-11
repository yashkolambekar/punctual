
const StayAwakeVideo = () => {
    return (
        <>
            <video autoPlay loop className="w-[10px] h-[10px] absolute left-[-100px]">
                <source src="/videos/blank.mp4" />
            </video>
        </>
    )
};

export default StayAwakeVideo;