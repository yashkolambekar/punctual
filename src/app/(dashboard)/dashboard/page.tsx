"use client";

import NumericRecords from "./(numeric)/NumericsRecords";
import Projects from "./(projects)/Projects";
import TimeRecords from "./(time)/TimeRecords";

const Dashboard = () => {
    return (
        <>
            <TimeRecords />
            <NumericRecords />
            <Projects />
        </>
    )
}

export default Dashboard;