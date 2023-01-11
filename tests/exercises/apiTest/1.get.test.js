import { test, expect } from "@playwright/test"

test("Get user by id", async ({request}) => {
    const baseUrl = 'https://reqres.in';

    // use pw request to get single user'/api/users/2'
    const response = await request.get(baseUrl + '/api/users/2');
    // verify that response status is 200
    expect(response.status()).toBe(200);

    // extract json body from reponse then make sure the user returned with id '2' and email value
    const responseBody = await response.json();
    expect(responseBody.data.id).toBe(2);
    expect(responseBody.data.email).toBeTruthy();

    // print the response body
    console.log(responseBody);
});

test("Get users with page number", async ({request}) => {
    const baseUrl = 'https://reqres.in';

    // use pw request to get users with param 'page=2'
    const response = await request.get(baseUrl + '/api/users', {
        params: {
            page: 2
        }
    });
    // verify that response status is 200, then print the response url
    expect(response.status()).toBe(200);

    // extract json body from reponse 
    const responseBody = await response.json();
    // verify that page number value is 2 
    expect(responseBody.page).toBe(2);
    // verify that users per page value is 6
    expect(responseBody.per_page).toBe(6);
    // verify that total users value is 12
    expect(responseBody.total).toBe(12);
    // verify that first user id returned value is 7
    expect(responseBody.data[0].id).toBe(7);

    // print the response body
    console.log(responseBody);
});

test("Get users with delay response", async ({request}) => {
    const baseUrl = 'https://reqres.in';

    // use pw request to get users with param 'page=2'
    const response = await request.get(baseUrl + '/api/users?delay=3');
    // verify that response status is 200, then print the response url
    expect(response.status()).toBe(200);

    // extract json body from reponse 
    const responseBody = await response.json();
    // verify that total users value is 12
    expect(responseBody.total).toBe(12);

    // print the response body
    console.log(responseBody);
});