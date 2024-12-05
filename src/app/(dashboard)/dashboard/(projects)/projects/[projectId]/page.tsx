const ProjectId = async ({params}: {params: Promise<{projectId: string}>}) => {
    const projectId = (await params).projectId
    return(
        <>
            <h1>{projectId}</h1>
        </>
    )
}

export default ProjectId;