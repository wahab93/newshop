export const apiHelper = {
    post,
    get,
    put,
}

// get Requests
async function get(url) {
    // debugger
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    return handleResponse(response);
}

// Post Request
async function post(url, body) {
    // debugger
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    return handleResponse(response);
}

// PUT Request
async function put(url, body) {
    // debugger
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    return handleResponse(response);
}


// Handling Response
async function handleResponse(response) {
    // debugger
    try {
        const data = await response.json();
        if (response.status !== 200) {
            const error = (data);
            throw error;
        }
        return data;
    } catch (error) {
        console.error('Error in handleResponse:', error);
        throw error;
    }
}