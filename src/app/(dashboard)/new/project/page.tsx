"use client";

import backIcon from '@/assets/back-svgrepo-com.svg';
import api from '@/lib/api';
import { Button, Form, Input, Select } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


const NewProject = () => {

    const router = useRouter();

    const projectRecordTypes = [
        {
            label: "Time",
            value: "time"
        },
        {
            label: "Numeric",
            value: "numeric"
        }
    ];

    return (
        <> 
        <div className="px-4 mt-4">
            <Link href="/dashboard">
            <Image src={backIcon} alt="back" width={20} height={20} />
            </Link>
            <p className="text-[1.2em] font-semibold m-0 mt-2">New Project</p>
            <div className='mt-6 max-w-[20em]'>
                <Form layout='vertical' onFinish={(values) => {
                    if (!values.recordType){
                        toast.error("Please select a record type");
                        return;
                    }

                    api.post("/projects", values).then((res) => {
                        toast.success("Project created successfully");
                        router.push("/dashboard");
                    }).catch((e) => {
                        toast.error(e.response.data.message);
                    });

                }} >
                    <Form.Item label="Project Name" name={"name"}>
                        <Input placeholder="Enter project name" required />
                    </Form.Item>
                    <Form.Item label="Project Description" name={"description"}>
                        <Input.TextArea placeholder="Enter project description" required />
                    </Form.Item>
                    <Form.Item label="Record Type" name={"recordType"}>
                        <Select options={projectRecordTypes} />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type='primary'>Create Project</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
        </>
    )
}

export default NewProject;