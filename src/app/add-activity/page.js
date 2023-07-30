'use client';
import { addActivity } from '../database';
import { useState, useEffect } from 'react';
import { getFromLocalStorage } from '../utils/localStorageUtils';
import Link from 'next/link';
import SuccessToast from '../components/successToast'
import ErrorToast from '../components/errorToast'

export default function Login() {
    const [mobile, setMobile] = useState('');
    const [type, setType] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [isSuccessToastVisible, setSuccessToastVisible] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [successTitle, setSuccessTitle] = useState('')
    const [isErrorToastVisible, setErrorToastVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [errorTitle, setErrorTitle] = useState('')

    useEffect(() => {
        if (localStorage) {
            setMobile(getFromLocalStorage('mobile'));
        }
    }, [])

    const resetFields = () => {
        setType('Project');
        setDescription('');
        setLink('');
    }

    const addNewActivity = async (e) => {
        e.preventDefault();
        const activityObj = {
            id: Math.random(),
            mobile,
            type,
            description,
            link,
            timestamp: new Date()
        }
        try {
            await addActivity(activityObj);
            setSuccessMessage('Added activity successfully!')
            setSuccessTitle('Activity added')
            setSuccessToastVisible(true)
            setTimeout(() => {
                setSuccessToastVisible(false)
                resetFields();
            }, 1000)
        } catch (error) {
            setErrorMessage(`Please try again, ${error}`);
            setErrorTitle('Add activity failed')
            setErrorToastVisible(true)
            setTimeout(() => {
                setErrorToastVisible(false)
            }, 5000)
        }
    }

    return (
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div
                className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                aria-hidden="true"
            >
                <div
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
            <Link href='/dashboard' className="font-semibold text-indigo-600"><span className="mr-2" aria-hidden="true">&larr;</span>Go Back to Dashboard</Link>
            <div className="mx-auto max-w-2xl text-center mt-6">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Add new activity</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    Consistency is the key
                </p>
            </div>
            <form className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label htmlFor="submission-type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">What activity for this week?</label>
                        <select name="submission-type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setType(e.target.value)}
                            defaultValue="Project"
                        >
                            <option value="Project">Project</option>
                            <option value="Practise problem">Practise problem</option>
                            <option value="Article">Article</option>
                            <option value="Project Idea Submission">Project Idea Submission</option>
                            <option value="Automation">Automation</option>
                            <option value="Unit test submission">Unit test submission</option>
                        </select>
                    </div>
                    <div className="col-span-full">
                        <label htmlFor="link" className="block text-sm font-medium leading-6 text-gray-900">
                            Link
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="link"
                                onChange={(e) => setLink(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="col-span-full">
                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                            Description
                        </label>
                        <div className="mt-2">
                            <textarea
                                name="description"
                                rows={3}
                                onChange={(e) => setDescription(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                            />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about your submission.</p>
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        onClick={addNewActivity}
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add Now
                    </button>
                </div>
            </form>
            <SuccessToast isSuccessToastVisible={isSuccessToastVisible} setSuccessToastVisible={setSuccessToastVisible} successMessage={successMessage} successTitle={successTitle} />
            <ErrorToast isErrorToastVisible={isErrorToastVisible} setErrorToastVisible={setErrorToastVisible} errorMessage={errorMessage} errorTitle={errorTitle} />
        </div>
    )
}
