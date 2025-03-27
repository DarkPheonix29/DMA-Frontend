import React from 'react';
import CategoryList from '../../components/customer/start/CategoryList';
import RequestWaiter from '../../components/customer/RequestWaiter';

const MenuStartPage = () => {
    return (
        <div>
            <div><p className='absolute underline right-4 top-3 font-semibold text-white'>Table 11</p></div> {/* To be changed with qr function */}
            <div className='min-h-screen flex flex-col justify-items-start gap-[10vh] bg-pastelred-700 p-6'>
                <RequestWaiter />
                <CategoryList />
            </div>
        </div>
        
    );
}

export default MenuStartPage;