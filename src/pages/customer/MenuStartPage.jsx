import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CategoryList from '../../components/customer/start/CategoryList';
import RequestWaiter from '../../components/customer/RequestWaiter';
import AllergiesButton from '../../components/customer/AllergiesButton';
import { GetTableByGuid } from '../../services/TableService';

const MenuStartPage = () => {
    const [tableName, setTableName] = useState(null);
    const { tableGuid } = useParams();

    useEffect(() => {
        if (tableGuid) {
            GetTableByGuid(tableGuid)
                .then((table) => {
                    console.log("Tafel opgehaald:", table);

                    localStorage.setItem('tableId', table.tableId); // <-- ✅ FIX
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
            setTableName(storedTableName || 'Geen tafel gevonden');
        }
    }, [tableGuid]);


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
};

export default MenuStartPage;
