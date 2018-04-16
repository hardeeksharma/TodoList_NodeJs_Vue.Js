async function getTodos() {
    try {
        const response = await axios.get('/todos');
        //console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}