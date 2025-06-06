const API_URL = 'https://localhost:7117/api/tables';

export const GetTableByGuid = async (uniqueCode) => {
    try {
        const response = await fetch(`${API_URL}/${uniqueCode}`);
        if (!response.ok) {
            throw new Error(`Tafel niet gevonden (${response.status})`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching table:', error);
        throw error;
    }
};
