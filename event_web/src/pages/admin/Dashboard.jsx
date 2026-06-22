import React, { useState } from 'react';
import EventList from '../../components/admin/EventList';
import CreateEvent from '../../components/admin/CreateEvent';
import Header from '../../components/layout/Header';

function Dashboard() {
    const [refreshList,setRefreshList] = useState(0)

    function triggerRefresh(){
        setRefreshList((prev)=>prev+1)
    }


    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 antialiased">
      
        <Header/>
            {/* Main Dashboard Layout Container */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                <CreateEvent onRefresh={triggerRefresh}/>
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <EventList refreshList={refreshList} />
                    </div>
                </div>

            </main>
        </div>
    );
}

export default Dashboard;
