const API_URL = 'https://localhost:7263/api/tables';

const Tables = [
    {
        id: 1,
        name: 'Table 1',
        uniqueCode: 'b9f8be07-38f1-4fed-a589-b656d8e9030a',
    },
    {
        id: 2,
        name: 'Table 2',
        uniqueCode: '40259a4d-07d4-4756-ae1c-05d2dfaafba0',
    },
    {
        id: 3,
        name: 'Table 3',
        uniqueCode: '79bde160-d089-4538-8cda-15b4ed4f7278',
    }
];

export const getTableByGuid = async (uniqueCode) => {
    // Tijdelijk mocked data gebruiken
    const table = Tables.find(table => table.uniqueCode === uniqueCode);
    if (!table) {
        console.error('Table not found:', uniqueCode);
        throw new Error('Table not found');
    }

    return table;
    // Uncomment the following code to fetch data from the API when it's available

    // try {
    //     const response = await fetch(`${API_URL}/${uniqueCode}`);
    //     if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //     }
    //     const data = await response.json();
    //     return data;
    // } catch (error) {
    //     console.error('Error fetching table:', error);
    //     throw error;
    // }
}