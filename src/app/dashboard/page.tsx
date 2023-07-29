"use client";
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();
    return (
        <div>
            <button onClick={() => router.push('/add-activity')}
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Add an activity</button>
        </div>
    )
}