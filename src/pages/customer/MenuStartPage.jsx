import React from 'react';
import { useEffect } from 'react';
import CategoryList from '../../components/customer/start/CategoryList';
import RequestWaiter from '../../components/customer/RequestWaiter';
import AllergiesButton from '../../components/customer/AllergiesButton';
import { getTableByGuid } from '../../services/TableService';

const MenuStartPage = () => {
    const [tableName, setTableName] = React.useState(null);

    useEffect(() => {
        const param = new URLSearchParams(window.location.search);
        const tableGuid = param.get('table');

        if (tableGuid) {
            getTableByGuid(tableGuid)
                .then((table) => {
                    localStorage.setItem('tableId', table.id);
                    localStorage.setItem('tableName', table.name);
                    localStorage.setItem('tableUniqueCode', table.uniqueCode);

                    setTableName(table.name);
                })
                .catch((error) => {
                    console.error('Error fetching table:', error);
                    setTableName('Onbekende tafel');
                });
        } else {
            const storedTableName = localStorage.getItem('tableName');
            if (storedTableName) {
                setTableName(storedTableName);
            } else {
                setTableName('Geen tafel gevonden');
            }

        }
    }, []);
    
    return (
        <div>
            <div>
                <p className='absolute underline right-4 top-3 font-semibold text-white'>
                    {tableName ? tableName : 'Tafel wordt geladen...'}
                </p>
            </div>
            <div className='min-h-screen flex flex-col justify-items-start gap-[10vh] bg-pastelred-700 p-6 pt-10'>
                <div className='flex flex-wrap gap-4 w-full'>
                    <RequestWaiter className="flex-1 min-w-[150px]" />
                    <AllergiesButton className="flex-1 min-w-[100px]" />
                </div>
                
                <CategoryList />
            </div>
        </div>
    );
}

export default MenuStartPage;